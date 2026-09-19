// Camera Flight Check — Electron main process.
// Opens the check UI as a frameless-feeling kiosk-style desktop window.

const { app, BrowserWindow, globalShortcut, screen, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { spawn } = require("child_process");
const { createCamera } = require("./camera-bridge");

const VIDEO_EXTS = [".mp4", ".mov", ".avi", ".wmv", ".mkv", ".m4v", ".webm"];

// ---------------------------------------------------------------- settings
// Admin-configurable app settings, persisted to settings.json in userData.
// Loaded once at startup; `settings` is updated in place on every save so
// other handlers (e.g. runs:save below) always see the current value.
let settings = null;

// Camera computers are named MALL####-Camera. The #### is looked up against
// assets/malls.csv (number,name) to show a friendly location name. No match
// on either the hostname pattern or the CSV -> caller falls back to raw text.
function loadMallMap() {
  const map = {};
  try {
    const text = fs.readFileSync(path.join(__dirname, "assets", "malls.csv"), "utf8");
    text.split(/\r?\n/).forEach((line, i) => {
      if (i === 0 || !line.trim()) return; // skip header + blank lines
      const idx = line.indexOf(",");
      if (idx < 0) return;
      const number = line.slice(0, idx).trim();
      const name = line.slice(idx + 1).trim();
      if (number && name) map[number] = name;
    });
  } catch {}
  return map;
}

function parseLocationFromHostname(hostname, mallMap) {
  const m = /^MALL(\d+)-Camera$/i.exec(hostname || "");
  if (!m) return { number: null, name: null };
  const number = m[1];
  return { number, name: mallMap[number] || null };
}

function defaultSettings() {
  return {
    location: { number: "", name: "", station: "Camera" },
    // Three separate on-disk destinations an admin can point wherever the
    // station's file-server mapping expects: completion/session logs
    // (already wired into runs:save below), test photos (folder is
    // configurable now; the capture flow doesn't write files there yet --
    // that's a separate follow-up), and camera-host diagnostics (wired into
    // setupCamera's logFile below).
    paths: {
      completionLogs: path.join("C:\\preflight-ops-check", "Logs"),
      testPhotos: path.join("C:\\preflight-ops-check", "Photos"),
      diagnostics: path.join("C:\\preflight-ops-check", "Diagnostics"),
    },
    skipReasonPrompt: true,
    // Admin-editable so a district can use its own skip vocabulary instead
    // of the shipped defaults. "Other" (however it's currently labeled)
    // triggers the free-text box in SkipReasonModal by text match, not
    // position, so reordering/renaming/removing it is safe.
    skipReasons: ["Running late", "Equipment issue", "Other"],
    cameraLimits: { allowedWb: null, isoMin: null, isoMax: null, apertureMin: null, apertureMax: null },
    // Field-tuned so the bundled guide matches a well-framed reference photo
    // (head ~2/5 down the frame, feet in the lower portion just above the
    // bottom) rather than the guide's native full-bleed proportions (scale
    // 100 / offset 0). This is the sliders' "zero" resting position — see
    // DEFAULT_OVERLAY in simple-app-bundled.jsx, which the Reset button and
    // initial placeholder state must stay in sync with.
    overlay: { offsetXPct: 0, offsetYPct: 9, scalePct: 87, customImagePath: null },
    // RPS launch is now one selectable exit command rather than an assumed
    // step -- stations that don't run RPS can turn it off; ScreenDone reads
    // this to skip the launch call and swap its button label.
    rpsLaunchEnabled: true,
    rpsPath: "C:\\CentricsRPSClient\\bin\\CentricsRPSClient.exe",
    rpsAppName: "RPS",
    // Seeded with the same contacts the app shipped with before this was
    // admin-editable, so Need Help never renders empty out of the box.
    helpContacts: [
      { title: "District Manager", description: "", phone: "(xxx) xxx-xxxx", email: "" },
      { title: "Technical Support", description: "", phone: "(855) 925-4546", email: "" },
    ],
    // Seeded so the two docs every station needs (printer media loading,
    // RPS setup/training) are available out of the box, same as the
    // contacts above -- admins can rename, replace, or remove them.
    helpDocs: [
      { name: "Printer Loading Video", localFile: "C:\\Options\\DNP-DS620A_Media_Loading.mp4", externalUrl: "" },
      { name: "System Setup & RPS Help / Training", localFile: "C:\\Options\\RPS Help and Training.html", externalUrl: "" },
    ],
    // Blank by default -- video docs open via the OS's own default handler
    // (shell.openPath), which can prompt for an app to use if Windows has no
    // association for the extension. Pointing this at a specific player exe
    // (VLC, etc.) skips that resolution/prompt entirely; see VIDEO_EXTS below.
    videoPlayerPath: "",
    // Gates the admin Settings screen behind a password so seasonal staff
    // don't wander into camera limits or the RPS path. On by default so a
    // fresh install is locked out of the box; the default password is meant
    // to be handed out with training materials, same as any other doc here.
    settingsPasswordEnabled: true,
    settingsPassword: "help123",
  };
}

// Nested settings objects merge key-by-key so a settings.json saved before a
// new sub-key existed still picks up that key's default instead of losing it.
function mergeSettings(saved, defaults) {
  defaults = defaults || defaultSettings();
  const merged = { ...defaults, ...saved };
  for (const key of ["location", "cameraLimits", "overlay", "paths"]) {
    merged[key] = { ...defaults[key], ...(saved[key] || {}) };
  }
  return merged;
}

function settingsFile() {
  return path.join(app.getPath("userData"), "settings.json");
}

function loadSettings() {
  let saved = {};
  try { saved = JSON.parse(fs.readFileSync(settingsFile(), "utf8")); } catch {}
  const defaults = defaultSettings();
  // Auto-fill location from the hostname + mall CSV only when nothing has
  // been saved yet -- once an admin has saved a location (even one that
  // happens to match what auto-detect would produce), it's never silently
  // overwritten again on a later launch.
  const hasSavedLocation = saved.location && (saved.location.number || saved.location.name);
  if (!hasSavedLocation) {
    const detected = parseLocationFromHostname(os.hostname(), loadMallMap());
    defaults.location = { ...defaults.location, number: detected.number || "", name: detected.name || "" };
  }
  return mergeSettings(saved, defaults);
}

function saveSettings(partial) {
  settings = mergeSettings({ ...settings, ...partial });
  fs.writeFileSync(settingsFile(), JSON.stringify(settings, null, 2));
  return settings;
}

function setupSettings() {
  settings = loadSettings();

  // hostname is attached fresh each load (not persisted) so the Welcome
  // screen can fall back to something readable if hostname parsing or the
  // mall CSV lookup ever comes up empty.
  ipcMain.handle("settings:load", () => ({ ...settings, hostname: os.hostname() }));
  ipcMain.handle("settings:save", (_e, partial) => {
    // `hostname` is attached by settings:load for display only -- the
    // renderer's draft state carries it along, but it must never be
    // persisted (it's re-attached fresh from os.hostname() on every load).
    const { hostname, ...toSave } = partial || {};
    return saveSettings(toSave);
  });
  ipcMain.handle("settings:hostname", () => os.hostname());
  // Pass the owning BrowserWindow so the native dialog is properly modal to
  // it — without a parent, an unowned dialog can end up behind or detached
  // from the app window, which reads as the whole app being frozen.
  ipcMain.handle("settings:pickFolder", async (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    const r = await dialog.showOpenDialog(win, { properties: ["openDirectory", "createDirectory"] });
    return r.canceled || !r.filePaths[0] ? null : r.filePaths[0];
  });
  ipcMain.handle("settings:pickImage", async (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    const r = await dialog.showOpenDialog(win, {
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg", "svg"] }],
    });
    if (r.canceled || !r.filePaths[0]) return null;
    const destDir = path.join(app.getPath("userData"), "overlays");
    fs.mkdirSync(destDir, { recursive: true });
    const dest = path.join(destDir, "custom-guide" + path.extname(r.filePaths[0]).toLowerCase());
    fs.copyFileSync(r.filePaths[0], dest);
    return dest;
  });
  // Documentation files stay wherever the admin points (a shared drive, a
  // local docs folder) rather than being copied into userData -- unlike the
  // overlay image above, these are meant to keep referencing their real
  // on-machine location, not become a private app-owned copy.
  ipcMain.handle("settings:pickDocFile", async (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    const r = await dialog.showOpenDialog(win, { properties: ["openFile"] });
    return r.canceled || !r.filePaths[0] ? null : r.filePaths[0];
  });

  // Opens a Help Config documentation entry -- a local file via the OS's
  // default handler, or an external URL via the default browser.
  ipcMain.handle("help:openDoc", async (_e, doc) => {
    if (doc && doc.localFile) {
      const ext = path.extname(doc.localFile).toLowerCase();
      // Route videos through the admin-configured player (if any) so it opens
      // deterministically -- shell.openPath() defers to Windows' own file
      // association, which prompts for an app to use when the extension has
      // none set, exactly what a kiosk operator shouldn't have to deal with.
      if (VIDEO_EXTS.includes(ext) && settings.videoPlayerPath && fs.existsSync(settings.videoPlayerPath)) {
        try {
          const child = spawn(settings.videoPlayerPath, [doc.localFile], { detached: true, stdio: "ignore" });
          child.unref();
          return { ok: true };
        } catch (e) {
          return { ok: false, error: e.message };
        }
      }
      const err = await shell.openPath(doc.localFile);
      return { ok: !err, error: err || null };
    }
    if (doc && doc.externalUrl) {
      await shell.openExternal(doc.externalUrl);
      return { ok: true };
    }
    return { ok: false, error: "no-target" };
  });

  // Launches RPS (the photo sales app) at the admin-configured path. Checked
  // with fs.existsSync first rather than relying on spawn's error event --
  // more reliable to detect "not found" upfront than racing a child process.
  ipcMain.handle("app:launchRps", () => {
    const rpsPath = settings.rpsPath;
    if (!rpsPath || !fs.existsSync(rpsPath)) {
      return { ok: false, error: "not-found" };
    }
    try {
      const child = spawn(rpsPath, [], { cwd: path.dirname(rpsPath), detached: true, stdio: "ignore" });
      child.unref();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  });
}

// Squirrel installer events (create/remove shortcuts, updates) — exit early when
// the exe is invoked by the installer rather than a user.
try {
  if (require("electron-squirrel-startup")) app.quit();
} catch {} // module is absent in some dev setups; ignore

// Only one copy may run — a second instance would fight over the camera USB
// session, which presents as "can't read settings." (Automated verification
// runs skip the lock so they can run beside a dev instance.)
if (!process.argv.some((a) => a.startsWith("--screenshot"))) {
  if (!app.requestSingleInstanceLock()) {
    app.quit();
  } else {
    app.on("second-instance", () => {
      const [win] = BrowserWindow.getAllWindows();
      if (win) { if (win.isMinimized()) win.restore(); win.show(); win.focus(); }
    });
  }
}

// --screenshot=<path> renders the app, saves a capture, and exits (used for automated verification)
const screenshotArg = process.argv.find((a) => a.startsWith("--screenshot="));
// --simulate forces the built-in camera simulator even if the hardware helper is present
const forceSimulator = process.argv.includes("--simulate");

let camera = null;

function setupCamera() {
  // Admin-configurable via Settings > File Output Paths > Diagnostics; falls
  // back to userData if that folder can't be created. Bound once at helper
  // spawn time -- changing it mid-session takes effect on the next launch,
  // same as before this was configurable.
  let diagDir = settings.paths.diagnostics;
  try { fs.mkdirSync(diagDir, { recursive: true }); } catch { diagDir = app.getPath("userData"); }
  camera = createCamera({
    forceSimulator,
    appDir: __dirname,
    resourcesDir: process.resourcesPath,
    isPackaged: app.isPackaged,
    logFile: path.join(diagDir, "camera-host.log"),
  });
  const captureDir = path.join(os.tmpdir(), "camera-flight-check");
  fs.mkdirSync(captureDir, { recursive: true });

  // Check-run event log — one JSON object per line, shaped for future POST to the API.
  // Lives in the per-user app data folder (e.g. %APPDATA%\camera-flight-check\check-runs.jsonl).
  const runsFile = path.join(app.getPath("userData"), "check-runs.jsonl");
  ipcMain.handle("runs:save", (_e, event) => {
    const record = { ...event, savedAt: new Date().toISOString() };
    fs.appendFileSync(runsFile, JSON.stringify(record) + "\n");
    // Also fan out to a per-run session file in the admin-configured data
    // folder — the one a field manager can actually browse to, and the one
    // that will grow to include the test photo in a later phase.
    if (event.runId) {
      try {
        const sessDir = path.join(settings.paths.completionLogs, "sessions");
        fs.mkdirSync(sessDir, { recursive: true });
        fs.appendFileSync(path.join(sessDir, `${event.runId}.jsonl`), JSON.stringify(record) + "\n");
      } catch (e) {
        console.log("[main] session log write failed:", e.message);
      }
    }
    return { file: runsFile };
  });

  ipcMain.handle("camera:mode", () => camera.mode);
  ipcMain.handle("camera:detect", () => camera.detect());
  ipcMain.handle("camera:settings", () => camera.settings());
  ipcMain.handle("camera:capture", () => camera.capture(captureDir));
  ipcMain.handle("camera:set", (_e, props) => camera.set(props));
  ipcMain.handle("camera:release", () => camera.release());
  ipcMain.handle("camera:releaseForHandoff", () => camera.releaseForHandoff());
}

function createWindow() {
  // Floating window centered on the work area, locked to the UI's 16:10 stage
  // ratio (otherwise the stage letterboxes and leaves dead space at the sides).
  // Size: 85% of the work area on large displays; near-full on small ones
  // (field PCs at 1024×768 — anything less renders text too small to read).
  const STAGE_RATIO = 1440 / 900;
  const { width: screenW, height: screenH } = screen.getPrimaryDisplay().workAreaSize;
  const frac = screenH < 900 ? 0.97 : 0.85;
  let contentH = Math.round(screenH * frac);
  let contentW = Math.round(contentH * STAGE_RATIO);
  if (contentW > Math.round(screenW * frac)) {
    contentW = Math.round(screenW * frac);
    contentH = Math.round(contentW / STAGE_RATIO);
  }
  const win = new BrowserWindow({
    width: contentW,
    height: contentH,
    useContentSize: true,
    center: true,
    show: false,
    // Frameless + transparent: the app's own top bar acts as the title bar,
    // and CSS rounds the corners (Windows 10 can't round frameless windows itself)
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    title: "Camera Flight Check",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
      backgroundThrottling: false,
    },
  });

  win.removeMenu();
  win.setAspectRatio(STAGE_RATIO); // keep 16:10 when the user resizes

  // Scale the UI with real Chromium zoom instead of a CSS transform: zoom
  // re-lays-out at the target size so text rasterizes crisply, whereas the
  // app's transform-scale of its 1440×900 stage produced blurry glyphs.
  // With zoom applied, window.innerWidth ≈ 1440 and the app's own
  // transform-scale computes to ~1 (identity), so the two don't fight.
  const applyZoom = () => {
    const [w, h] = win.getContentSize();
    win.webContents.setZoomFactor(Math.min(w / 1440, h / 900));
  };
  win.on("resize", applyZoom);
  win.webContents.on("did-finish-load", applyZoom);

  ipcMain.on("win:minimize", () => win.minimize());
  ipcMain.on("win:close", () => win.close());
  win.loadFile(path.join(__dirname, process.argv.includes("--verify") ? "__verify.html" : "Camera Flight Check.html"));

  win.once("ready-to-show", () => {
    if (screenshotArg) {
      win.show();
      const delayArg = process.argv.find((a) => a.startsWith("--shot-delay="));
      const delay = delayArg ? parseInt(delayArg.split("=")[1], 10) : 4000;
      setTimeout(async () => {
        // Force the compositor to paint the latest DOM/scroll state before
        // capturing — capturePage() can otherwise return a stale frame for
        // changes (like a programmatic scroll) made shortly beforehand.
        await win.webContents.executeJavaScript(
          "new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))"
        );
        const image = await win.webContents.capturePage();
        fs.writeFileSync(screenshotArg.split("=")[1], image.toPNG());
        app.quit();
      }, delay);
    } else {
      win.show();
    }
  });

  // F11 toggles true fullscreen for kiosk use
  globalShortcut.register("F11", () => {
    win.setFullScreen(!win.isFullScreen());
  });

  return win;
}

app.whenReady().then(() => {
  setupSettings();
  setupCamera();
  createWindow();
});

// Closing via the window's X icon skips ScreenDone's own release-before-RPS
// flow, so this is the only thing standing between "operator just clicked X"
// and the next app (RPS, EOS Utility, the next launch of this app) finding
// the camera still busy. releaseForHandoff() waits for CameraHost.exe to
// actually exit rather than firing a blind quit and racing ahead — same fix
// as the Close Utility / Open RPS button, applied here too. will-quit fires
// once more after the async work finishes; the guard lets that second pass
// through instead of looping.
// Electron silently no-ops a second app.quit() called after a will-quit
// handler has preventDefault()'d the first one — it does NOT re-emit
// will-quit or otherwise resume quitting, so the process just hangs forever.
// app.exit() bypasses the event lifecycle entirely and actually terminates
// the process, which is exactly what's needed once our own cleanup is done.
let quitting = false;
app.on("will-quit", (event) => {
  globalShortcut.unregisterAll();
  if (camera && !quitting) {
    event.preventDefault();
    quitting = true;
    camera.releaseForHandoff().catch(() => {}).finally(() => app.exit(0));
  }
});
app.on("window-all-closed", () => app.quit());
