// CameraHost — stdio JSON bridge between the Electron UI and real cameras.
//
// Speaks newline-delimited JSON on stdin/stdout:
//   request:  {"id":1,"cmd":"detect"}
//   response: {"id":1,"ok":true,"data":{...}}
//
// Commands:
//   detect                       -> { connected, model, serial }
//   settings                     -> { model, battery, iso, shutter, aperture, wb, quality,
//                                     isoValues, shutterValues, apertureValues, wbValues }
//   capture  {savePath}          -> { file }
//   set      {iso?, shutter?, aperture?, wb?} -> { applied: {..}, rejected: {..} }
//   release                      -> {}    (closes the USB session so RPS can attach)
//   quit                         -> {}    (release + exit)
//
// Built against digiCamControl's CameraControl.Devices (Canon EDSDK + Nikon PTP/WPD).

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Windows.Forms;
using CameraControl.Devices;
using CameraControl.Devices.Classes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CameraHost
{
    internal static class Program
    {
        private static CameraDeviceManager _manager;
        private static ICameraDevice _connectedDevice; // set by the CameraConnected event
        private static readonly object _captureLock = new object();
        private static ManualResetEvent _photoReady;
        private static PhotoCapturedEventArgs _lastPhoto;
        private static Control _pump; // marshals camera calls onto the message-pumped STA thread
        private static ApplicationContext _appContext;

        [STAThread]
        private static void Main()
        {
            Log("CameraHost starting");

            // EDSDK requires a Windows message pump on the thread that initializes it —
            // without one, session-open callbacks never fire and the camera never
            // finishes connecting. Camera work runs on this pumped STA thread; the
            // stdio protocol runs on a background thread and marshals in via _pump.
            _pump = new Control();
            var _ = _pump.Handle; // force handle creation on this thread

            _manager = new CameraDeviceManager();
            // Without this, vendor SDK drivers (Canon EDSDK / Nikon) may not be used and
            // cameras fall back to the generic MTP driver, which cannot capture.
            _manager.UseExperimentalDrivers = true;
            _manager.PhotoCaptured += OnPhotoCaptured;
            _manager.CameraConnected += d =>
            {
                Log($"Camera connected: {d.DeviceName} via {d.GetType().Name} (IsConnected={d.IsConnected})");
                // Keep the best real camera: vendor-driver devices beat generic ones,
                // webcams (WebCameraDevice) are never eligible.
                if (IsRealCamera(d) && (_connectedDevice == null || Priority(d) > Priority(_connectedDevice)))
                    _connectedDevice = d;
                d.CameraInitDone += dev => Log($"Camera init done: {dev.DeviceName} (IsConnected={dev.IsConnected})");
            };
            _manager.CameraDisconnected += d =>
            {
                if (ReferenceEquals(_connectedDevice, d)) _connectedDevice = null;
                Log("Camera disconnected: " + d.DeviceName);
            };

            var stdio = new Thread(StdioLoop) { IsBackground = true, Name = "stdio" };
            stdio.Start();

            _appContext = new ApplicationContext();
            Application.Run(_appContext); // pumps messages until quit
            Log("CameraHost exiting");
        }

        private static void StdioLoop()
        {
            string line;
            while ((line = Console.In.ReadLine()) != null)
            {
                if (string.IsNullOrWhiteSpace(line)) continue;
                long id = 0;
                try
                {
                    var req = JObject.Parse(line);
                    id = req.Value<long>("id");
                    var cmd = req.Value<string>("cmd") ?? "";
                    var args = req["args"] as JObject ?? new JObject();
                    var data = Dispatch(cmd, args);
                    Reply(id, true, data, null);
                    if (cmd == "quit") break;
                }
                catch (Exception ex)
                {
                    Log("ERROR " + ex);
                    Reply(id, false, null, ex.Message);
                }
            }
            _pump.BeginInvoke((Action)(() => _appContext.ExitThread()));
        }

        // Run a camera call on the pumped STA thread and return its result.
        private static T OnPump<T>(Func<T> fn)
        {
            if (!_pump.InvokeRequired) return fn();
            T result = default;
            Exception error = null;
            _pump.Invoke((Action)(() =>
            {
                try { result = fn(); } catch (Exception ex) { error = ex; }
            }));
            if (error != null) throw error;
            return result;
        }

        private static object Dispatch(string cmd, JObject args)
        {
            switch (cmd)
            {
                case "detect": return Detect();
                case "settings": return Settings();
                case "capture": return Capture(args.Value<string>("savePath"));
                case "set": return SetProps(args);
                case "release": Release(); return new { };
                case "quit": Release(); return new { };
                case "ping": return new { pong = true };
                default: throw new Exception("Unknown command: " + cmd);
            }
        }

        // ---------------- commands ----------------

        private static object Detect()
        {
            OnPump<bool>(() => _manager.ConnectToCamera());
            // Device enumeration is asynchronous for some transports — give it a moment
            for (int i = 0; i < 20 && GetDevice() == null; i++) Thread.Sleep(250);
            foreach (var d in _manager.ConnectedDevices)
                Log($"  candidate: {d.DeviceName} [{d.GetType().Name}] IsConnected={d.IsConnected} real={IsRealCamera(d)} prio={Priority(d)}");
            Log($"  _connectedDevice: {(_connectedDevice == null ? "null" : _connectedDevice.GetType().Name)}");
            var dev = GetDevice();
            if (dev == null) return new { connected = false };
            Log("Device claimed by driver: " + dev.GetType().FullName);
            return new
            {
                connected = true,
                model = dev.DeviceName,
                serial = dev.SerialNumber,
                driver = dev.GetType().Name,
            };
        }

        private static object Settings()
        {
            var dev = RequireDevice();
            WaitForInit(dev);
            // Property values fill in asynchronously after init (Canon fires an event
            // per property) — IsConnected alone isn't enough. A populated ISO table is
            // the reliable "settings are loaded" signal (present even in Auto mode), but
            // on a Nikon D3400 (NikonD600Base driver) ISO's table arrives ~6s before
            // WB/battery/mode/quality do — gating on ISO alone read WB as null while the
            // camera was actually in a valid mode (A), which the UI mistakes for a
            // genuine Auto-dial warning. Wait for both; a true Auto-dial body still
            // exits via the same 12s cap since its WB table never arrives either.
            for (int waited = 0; waited < 12000; waited += 250)
            {
                var loaded = OnPump<bool>(() =>
                    dev.IsoNumber != null && dev.IsoNumber.Values != null && dev.IsoNumber.Values.Count > 0 &&
                    dev.WhiteBalance != null && dev.WhiteBalance.Values != null && dev.WhiteBalance.Values.Count > 0 &&
                    dev.CompressionSetting != null && dev.CompressionSetting.Values != null && dev.CompressionSetting.Values.Count > 0);
                if (loaded) break;
                Thread.Sleep(250);
            }
            return OnPump<object>(() => new
            {
                model = dev.DeviceName,
                battery = dev.Battery,
                mode = Val(dev.Mode),
                iso = Val(dev.IsoNumber),
                shutter = Val(dev.ShutterSpeed),
                aperture = Val(dev.FNumber),
                wb = Val(dev.WhiteBalance),
                quality = Val(dev.CompressionSetting),
                exposureComp = Val(dev.ExposureCompensation),
                isoValues = Vals(dev.IsoNumber),
                shutterValues = Vals(dev.ShutterSpeed),
                apertureValues = Vals(dev.FNumber),
                wbValues = Vals(dev.WhiteBalance),
            });
        }

        private static object Capture(string savePath)
        {
            var dev = RequireDevice();
            WaitForInit(dev);
            if (string.IsNullOrEmpty(savePath))
                savePath = Path.Combine(Path.GetTempPath(), "cfc-capture-" + DateTime.Now.Ticks + ".jpg");
            Directory.CreateDirectory(Path.GetDirectoryName(savePath));

            lock (_captureLock)
            {
                _photoReady = new ManualResetEvent(false);
                _lastPhoto = null;
            }

            OnPump<object>(() =>
            {
                dev.IsBusy = true;
                try
                {
                    dev.CapturePhotoNoAf();
                }
                catch
                {
                    // some bodies only expose AF capture
                    dev.CapturePhoto();
                }
                return null;
            });

            // wait on the stdio thread — the pump must stay free to deliver the photo event
            if (!_photoReady.WaitOne(TimeSpan.FromSeconds(20)))
            {
                dev.IsBusy = false;
                throw new Exception("Timed out waiting for the camera to return the photo");
            }

            var photo = _lastPhoto;
            OnPump<object>(() =>
            {
                photo.CameraDevice.TransferFile(photo.Handle, savePath);
                photo.CameraDevice.IsBusy = false;
                return null;
            });
            return new { file = savePath };
        }

        private static object SetProps(JObject args)
        {
            var dev = RequireDevice();
            var applied = new Dictionary<string, string>();
            var rejected = new Dictionary<string, string>();

            void Apply<T>(string key, PropertyValue<T> prop)
            {
                var wanted = args.Value<string>(key);
                if (wanted == null) return;
                if (prop == null || !prop.IsEnabled || prop.Values == null || !prop.Values.Contains(wanted))
                {
                    rejected[key] = wanted ?? "";
                    return;
                }
                prop.SetValue(wanted, true);
                applied[key] = wanted;
            }

            OnPump<object>(() =>
            {
                Apply("iso", dev.IsoNumber);
                Apply("shutter", dev.ShutterSpeed);
                Apply("aperture", dev.FNumber);
                Apply("wb", dev.WhiteBalance);
                return null;
            });
            return new { applied, rejected };
        }

        private static void Release()
        {
            try
            {
                OnPump<object>(() => { _manager.CloseAll(); return null; });
                Log("Camera sessions released");
            }
            catch (Exception ex) { Log("release: " + ex.Message); }
        }

        // ---------------- plumbing ----------------

        private static void OnPhotoCaptured(object sender, PhotoCapturedEventArgs e)
        {
            lock (_captureLock)
            {
                _lastPhoto = e;
                _photoReady?.Set();
            }
        }

        // Webcams and virtual cameras are enumerated too — never treat them as the set camera.
        private static bool IsRealCamera(ICameraDevice d)
        {
            if (d == null) return false;
            var name = d.GetType().Name;
            return !name.Contains("WebCamera") && !name.Contains("Fake") && !name.Contains("NotConnected");
        }

        // Vendor SDK drivers (Canon/Nikon/Sony namespaces) outrank generic MTP/WPD ones.
        private static int Priority(ICameraDevice d)
        {
            var ns = d.GetType().FullName ?? "";
            if (ns.Contains(".Canon.") || ns.Contains(".Nikon.") || ns.Contains(".Sony.")) return 2;
            return 1;
        }

        private static ICameraDevice GetDevice()
        {
            // Prefer the device the CameraConnected event handed us — vendor drivers
            // can report IsConnected=false while still initializing.
            if (_connectedDevice != null) return _connectedDevice;
            var candidates = _manager.ConnectedDevices.Where(d => d.IsConnected && IsRealCamera(d)).ToList();
            var sel = _manager.SelectedCameraDevice;
            if (sel != null && sel.IsConnected && IsRealCamera(sel)) candidates.Add(sel);
            return candidates.OrderByDescending(Priority).FirstOrDefault();
        }

        private static ICameraDevice RequireDevice()
        {
            var dev = GetDevice();
            if (dev == null) throw new Exception("No camera connected");
            return dev;
        }

        // Vendor drivers finish initializing (and populate properties) asynchronously
        // after CameraConnected fires; IsConnected flips true when init completes.
        private static void WaitForInit(ICameraDevice dev, int timeoutMs = 15000)
        {
            for (int waited = 0; !dev.IsConnected && waited < timeoutMs; waited += 250)
                Thread.Sleep(250);
            if (!dev.IsConnected) Log("WaitForInit: timed out; proceeding anyway");
        }

        private static string Val<T>(PropertyValue<T> p) => p == null ? null : p.Value;
        private static List<string> Vals<T>(PropertyValue<T> p) =>
            p?.Values != null ? p.Values.ToList() : new List<string>();

        private static void Reply(long id, bool ok, object data, string error)
        {
            var payload = JsonConvert.SerializeObject(new { id, ok, data, error });
            Console.Out.WriteLine(payload);
            Console.Out.Flush();
        }

        private static void Log(string msg) => Console.Error.WriteLine("[camera-host] " + msg);
    }
}
