// Camera Flight Check — Electron main process.
// Opens the check UI as a frameless-feeling kiosk-style desktop window.

const { app, BrowserWindow, globalShortcut, screen, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { createCamera } = require("./camera-bridge");

// ---------------------------------------------------------------- settings
// Admin-configurable app settings, persisted to settings.json in userData.
// Loaded once at startup; `settings` is updated in place on every save so
// other handlers (e.g. runs:save below) always see the current value.
let settings = null;

function defaultSettings() {
  return {
    location: { label: "", station: "Camera 1" },
    dataDir: path.join(app.getPath("documents"), "Camera Flight Check Logs"),
    skipReasonPrompt: true,
    cameraLimits: { allowedWb: null, isoMin: null, isoMax: null, apertureMin: null, apertureMax: null },
    overlay: { offsetXPct: 0, offsetYPct: 0, scalePct: 100, customImagePath: null },
  };
}

// Nested settings objects merge key-by-key so a settings.json saved before a
// new sub-key existed still picks up that key's default instead of losing it.
function mergeSettings(saved) {
  const defaults = defaultSettings();
  const merged = { ...defaults, ...saved };
  for (const key of ["location", "cameraLimits", "overlay"]) {
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
  return mergeSettings(saved);
}

function saveSettings(partial) {
  settings = mergeSettings({ ...settings, ...partial });
  fs.writeFileSync(settingsFile(), JSON.stringify(settings, null, 2));
  return settings;
}

function setupSettings() {
  settings = loadSettings();

  ipcMain.handle("settings:load", () => settings);
  ipcMain.handle("settings:save", (_e, partial) => saveSettings(partial || {}));
  ipcMain.handle("settings:hostname", () => os.hostname());
  ipcMain.handle("settings:pickFolder", async () => {
    const r = await dialog.showOpenDialog({ properties: ["openDirectory", "createDirectory"] });
    return r.canceled || !r.filePaths[0] ? null : r.filePaths[0];
  });
  ipcMain.handle("settings:pickImage", async () => {
    const r = await dialog.showOpenDialog({
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
  camera = createCamera({
    forceSimulator,
    appDir: __dirname,
    resourcesDir: process.resourcesPath,
    isPackaged: app.isPackaged,
    logFile: path.join(app.getPath("userData"), "camera-host.log"),
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
        const sessDir = path.join(settings.dataDir, "sessions");
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

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
  if (camera) camera.quit(); // release the USB session so RPS can attach
});
app.on("window-all-closed", () => app.quit());
