// Camera bridge: gives the renderer one camera API backed by either
//  - CameraHost.exe (digiCamControl stack — real Canon/Nikon over USB), or
//  - a built-in simulator (no hardware; used for dev and demos).
//
// Both expose: detect(), settings(), capture(), set(props), release(), quit(), mode

const { spawn, spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const REQUEST_TIMEOUT_MS = 40000;

// ---------------------------------------------------------------- helper-backed
class HelperCamera {
  constructor(exePath, logFile) {
    this.mode = "hardware";
    this._nextId = 1;
    this._pending = new Map();
    this._buf = "";
    this._logFile = logFile || null;

    // A CameraHost orphaned by a crashed/force-closed session keeps the camera's
    // USB session open and blocks every new run — reclaim it before spawning.
    try {
      const r = spawnSync("taskkill", ["/F", "/IM", "CameraHost.exe"], { windowsHide: true });
      if (r.status === 0) this._log("[camera-bridge] killed orphaned CameraHost.exe from a previous session");
    } catch {}

    this._log(`[camera-bridge] spawning helper: ${exePath}`);
    this._proc = spawn(exePath, [], { cwd: path.dirname(exePath), windowsHide: true });
    this._proc.stdout.on("data", (chunk) => this._onData(chunk));
    this._proc.stderr.on("data", (chunk) => this._log(String(chunk).trim()));
    this._proc.on("exit", (code) => {
      this._log("[camera-bridge] helper exited " + code);
      for (const [, p] of this._pending) p.reject(new Error("Camera helper exited"));
      this._pending.clear();
      this._proc = null;
    });
  }

  // Console + persistent log so field problems leave evidence we can read later
  _log(line) {
    console.log(line);
    if (!this._logFile) return;
    try {
      if (fs.existsSync(this._logFile) && fs.statSync(this._logFile).size > 2_000_000) {
        fs.writeFileSync(this._logFile, ""); // simple rotation
      }
      fs.appendFileSync(this._logFile, `${new Date().toISOString()} ${line}\n`);
    } catch {}
  }

  _onData(chunk) {
    this._buf += String(chunk);
    let nl;
    while ((nl = this._buf.indexOf("\n")) >= 0) {
      const line = this._buf.slice(0, nl).trim();
      this._buf = this._buf.slice(nl + 1);
      if (!line) continue;
      let msg;
      try { msg = JSON.parse(line); } catch { continue; }
      const pending = this._pending.get(msg.id);
      if (!pending) continue;
      this._pending.delete(msg.id);
      clearTimeout(pending.timer);
      msg.ok ? pending.resolve(msg.data) : pending.reject(new Error(msg.error || "Camera error"));
    }
  }

  _request(cmd, args) {
    if (!this._proc) return Promise.reject(new Error("Camera helper is not running"));
    const id = this._nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this._pending.delete(id);
        reject(new Error(`Camera did not respond (${cmd})`));
      }, REQUEST_TIMEOUT_MS);
      this._pending.set(id, { resolve, reject, timer });
      this._proc.stdin.write(JSON.stringify({ id, cmd, args: args || {} }) + "\n");
    });
  }

  detect() { return this._request("detect"); }
  settings() { return this._request("settings"); }
  set(props) { return this._request("set", props); }
  release() { return this._request("release"); }

  async capture(saveDir) {
    const savePath = path.join(saveDir, `cfc-capture-${Date.now()}.jpg`);
    const { file } = await this._request("capture", { savePath });
    return { file, dataUrl: fileToDataUrl(file) };
  }

  quit() {
    if (!this._proc) return;
    try { this._proc.stdin.write(JSON.stringify({ id: 0, cmd: "quit" }) + "\n"); } catch {}
    const proc = this._proc;
    setTimeout(() => { try { proc.kill(); } catch {} }, 2000);
  }
}

// ---------------------------------------------------------------- simulator
class SimulatorCamera {
  constructor(assetsDir) {
    this.mode = "simulator";
    this._assets = assetsDir;
    this._corrected = false;
    this._state = {
      model: "Canon EOS Rebel T7 (simulated)",
      serial: "SIM-000123",
      battery: Number(process.env.CFC_SIM_BATTERY || 93), // override to test battery warnings
      mode: "M",
      quality: "Fine JPEG",
      iso: "800",
      shutter: "1/160",
      aperture: "5.6",
      wb: process.env.CFC_SIM_WB || "Shade", // wrong on purpose → warm capture until corrected
      isoValues: ["100", "200", "400", "800", "1600", "3200", "6400"],
      shutterValues: ["1/250", "1/200", "1/160", "1/125", "1/100", "1/80", "1/60", "1/30"],
      apertureValues: ["4.0", "4.5", "5.0", "5.6", "6.3", "7.1", "8.0", "9.0", "10", "11"],
      wbValues: ["Auto", "Daylight", "Shade", "Cloudy", "Tungsten", "Fluorescent", "Flash"],
    };
  }

  async detect() {
    await sleep(1200);
    return { connected: true, model: this._state.model, serial: this._state.serial };
  }

  async settings() {
    await sleep(400);
    return { ...this._state, exposureComp: "0" };
  }

  async capture() {
    await sleep(1500);
    const file = path.join(
      this._assets,
      this._corrected ? "sim-capture-neutral.png" : "sim-capture-warm.png"
    );
    return { file, dataUrl: fileToDataUrl(file) };
  }

  async set(props) {
    await sleep(700);
    const applied = {}, rejected = {};
    for (const key of ["iso", "shutter", "aperture", "wb"]) {
      if (props[key] == null) continue;
      const allowed = this._state[key + "Values"];
      if (allowed && allowed.includes(String(props[key]))) {
        this._state[key] = String(props[key]);
        applied[key] = String(props[key]);
      } else {
        rejected[key] = String(props[key]);
      }
    }
    // any accepted correction "fixes" the simulated scene
    if (Object.keys(applied).length) this._corrected = true;
    return { applied, rejected };
  }

  async release() { return {}; }
  quit() {}
}

// ---------------------------------------------------------------- factory
function fileToDataUrl(file) {
  const ext = path.extname(file).toLowerCase();
  const mime = ext === ".png" ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function createCamera({ forceSimulator, appDir, resourcesDir, isPackaged, logFile }) {
  const assetsDir = path.join(appDir, "assets");
  if (!forceSimulator) {
    const helperExe = isPackaged
      ? path.join(resourcesDir, "camera-host", "CameraHost.exe")
      : path.join(appDir, "camera-host", "bin", "Release", "CameraHost.exe");
    if (fs.existsSync(helperExe)) {
      console.log("[camera-bridge] using hardware helper:", helperExe);
      return new HelperCamera(helperExe, logFile);
    }
    console.log("[camera-bridge] helper not found, falling back to simulator");
  }
  console.log("[camera-bridge] simulator mode");
  return new SimulatorCamera(assetsDir);
}

module.exports = { createCamera };
