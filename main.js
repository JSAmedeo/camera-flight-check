// Camera Flight Check — Electron main process.
// Opens the check UI as a frameless-feeling kiosk-style desktop window.

const { app, BrowserWindow, globalShortcut, screen, ipcMain, dialog, shell, net } = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");
const { spawn } = require("child_process");
const { createCamera } = require("./camera-bridge");
const helpFeed = require("./help-feed");

const VIDEO_EXTS = [".mp4", ".mov", ".avi", ".wmv", ".mkv", ".m4v", ".webm"];

// How many grey-card calibration attempts' worth of evidence (CFC-06) to
// keep live on disk before pruning the oldest. A single station running one
// check per shift stays well under this for weeks; it exists so a season of
// daily runs doesn't accumulate unbounded JPEGs.
const CALIBRATION_RETENTION = 30;
// Pruned folders aren't deleted outright -- they move to calibrations/.trash
// and linger there for this many more generations before permanent removal.
// A recovery window against a bad retention value, a future bug in this
// function, or an operator/admin deleting the wrong thing by hand (see
// CLAUDE.md gotcha #22 -- an over-broad cleanup command once wiped this
// entire folder in one shot; nothing here should ever be a single rm again).
const CALIBRATION_TRASH_RETENTION = 60;

// Moves the oldest calibration-evidence directories beyond the retention cap
// into a .trash subfolder (never deletes them directly), then permanently
// removes whatever in .trash has itself aged past CALIBRATION_TRASH_RETENTION.
// Called once at startup (not per-save) per REMEDIATION-PLAN.md CFC-06.
function pruneCalibrationDiagnostics() {
  try {
    const base = path.join(settings.paths.diagnostics, "calibrations");
    if (!fs.existsSync(base)) return;
    const trash = path.join(base, ".trash");
    const listByAge = (dir) => fs.readdirSync(dir)
      .filter((name) => name !== ".trash")
      .map((name) => {
        const full = path.join(dir, name);
        return { name, full, mtime: fs.statSync(full).mtimeMs };
      })
      .sort((a, b) => b.mtime - a.mtime);

    const live = listByAge(base);
    const overflow = live.slice(CALIBRATION_RETENTION);
    if (overflow.length) {
      fs.mkdirSync(trash, { recursive: true });
      for (const d of overflow) {
        try { fs.renameSync(d.full, path.join(trash, d.name)); } catch {}
      }
    }
    if (fs.existsSync(trash)) {
      for (const d of listByAge(trash).slice(CALIBRATION_TRASH_RETENTION)) {
        fs.rmSync(d.full, { recursive: true, force: true });
      }
    }
  } catch (e) {
    console.log("[main] calibration diagnostics prune failed:", e.message);
  }
}

// ---------------------------------------------------------------- settings
// Admin-configurable app settings, persisted to settings.json in userData.
// Loaded once at startup; `settings` is updated in place on every save so
// other handlers (e.g. runs:save below) always see the current value.
let settings = null;

// Camera computers are named MALL####-Camera. Only the number comes from the
// hostname -- the friendly mall name is resolved from the location directory
// (help-feed.js), which replaced the hand-maintained assets/malls.csv.
function parseLocationFromHostname(hostname) {
  const m = /^MALL(\d+)-Camera$/i.exec(hostname || "");
  return m ? m[1] : null;
}

// Where location-directory.json lives, most-preferred first.
//
// Field stations run the portable build, so the directory sits in the same
// folder as the exe: it travels with the deploy, survives a Windows profile
// being rebuilt, and can be pre-seeded by dropping a copy into the folder
// before handing the station over -- which is how a site with no connectivity
// on setup day gets its managers and mall name.
//
// userData stays as a fallback for when that folder isn't writable (Program
// Files, a locked share, a UNC path) and as the only location in dev, where
// the "exe" is electron.exe inside node_modules and must never be written to.
function locationDirectoryDirs() {
  const userData = app.getPath("userData");
  if (!app.isPackaged) return [userData];
  return [path.dirname(app.getPath("exe")), userData];
}

// The location directory, read once at startup and replaced in place when a
// background refresh succeeds. null means this station has never completed a
// fetch -- everything downstream degrades to "no mall name, no auto contacts"
// rather than failing.
let locationDirectory = null;
// Derived, never persisted: what the last refresh attempt did. Surfaced in the
// Settings screen so IT can tell "never fetched" from "fetched, but this
// location isn't in the feed".
let helpAutoStatus = { lastAttemptAt: null, lastError: null };

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
    // The grey-card escape hatch (REMEDIATION-PLAN.md CFC-04) reverts to
    // these instead of leaving the camera at whatever it happened to be set
    // to when a reading can't be trusted -- a known-good starting point for
    // this station's lighting rather than an arbitrary in-progress value.
    // Matched to the nearest value the camera actually reports at apply time
    // (see nearestValue/nearestShutter/nearestWb in simple-app-bundled.jsx),
    // so these don't need to be exact camera-vocabulary strings.
    cameraDefaults: { iso: "400", shutter: "1/125", aperture: "7", wb: "Auto" },
    // Camera Setting Bypass presets -- independent of cameraDefaults above
    // (seeded from it once here, but not kept in sync; editing one doesn't
    // change the other). A plain array like skipReasons/helpContacts, so it
    // rides the existing settings:save/load path with no new IPC.
    cameraPresets: [
      { id: "baseline", name: "Baseline Default Settings", iso: "400", shutter: "1/125", aperture: "7", wb: "Auto" },
    ],
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
    // Seeded so Need Help never renders empty out of the box. The District
    // Manager that used to sit here as a hand-typed placeholder is gone --
    // both managers are auto-filled from the location directory now (see
    // helpAuto below). Anything in this list is a manual entry, always.
    helpContacts: [
      { title: "Technical Support", description: "", phone: "(855) 925-4546", email: "" },
    ],
    // Regional/district manager contacts pulled from the company location
    // feed and matched to this station's location number. They're derived at
    // load time, never stored in helpContacts, so a manager change at source
    // reaches the venue with nobody touching anything -- IT is the admin here
    // and isn't on site. The two switches only control whether each contact is
    // shown; turning one off doesn't delete anything, and IT can still add a
    // manual contact labeled "District Manager" if they want one.
    helpAuto: {
      // {season} is substituted at fetch time -- the feed is published per
      // season (S2026 = Santa 2026, B2027 = Bunny 2027), so the URL changes
      // twice a year on its own. See currentSeasonCode() in help-feed.js.
      feedUrl: "https://db0.cherryhillprograms.com:8090/atlaslist2?season={season}",
      // Blank = work the season out from today's date. Set this only to force
      // a specific one (a season running long, a one-off backfill).
      seasonOverride: "",
      fetchRegional: true,
      fetchDistrict: true,
      // One-time cleanup of the old hand-typed placeholder on stations that
      // already have it saved -- changing the default above does nothing for
      // them. See setupSettings().
      placeholderRemoved: false,
    },
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
    // Persists the calibration photo + full analysis/plan/applied record for
    // every grey-card attempt under paths.diagnostics/calibrations/ -- see
    // REMEDIATION-PLAN.md CFC-06. On by default during field validation so a
    // bad WB reading leaves evidence instead of being un-diagnosable after
    // the fact; retention is capped (see CALIBRATION_RETENTION below).
    calibrationDiagnosticsEnabled: true,
  };
}

// Nested settings objects merge key-by-key so a settings.json saved before a
// new sub-key existed still picks up that key's default instead of losing it.
function mergeSettings(saved, defaults) {
  defaults = defaults || defaultSettings();
  const merged = { ...defaults, ...saved };
  for (const key of ["location", "cameraLimits", "cameraDefaults", "overlay", "paths", "helpAuto"]) {
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
  // Auto-fill the location NUMBER from the hostname only when nothing has been
  // saved yet -- once an admin has saved one (even one that happens to match
  // what auto-detect would produce), it's never silently overwritten again.
  // The name isn't part of this test any more: it's normally left blank and
  // resolved from the location directory on every load (resolveLocationName),
  // so treating a blank name as "nothing saved" would re-detect forever.
  if (!(saved.location && saved.location.number)) {
    defaults.location = { ...defaults.location, number: parseLocationFromHostname(os.hostname()) || "" };
  }
  return mergeSettings(saved, defaults);
}

function saveSettings(partial) {
  settings = mergeSettings({ ...settings, ...partial });
  fs.writeFileSync(settingsFile(), JSON.stringify(settings, null, 2));
  return settings;
}

// Everything settings:load attaches on top of the persisted settings. All of
// it is derived fresh per call and none of it is ever written back -- see the
// strip in settings:save, which has to list every key added here.
function settingsPayload() {
  return {
    ...settings,
    hostname: os.hostname(),
    // The raw {mall, rm, dm} record for this station, or null. The renderer
    // turns it into contact cards, because the role titles are operator-facing
    // copy and all of that lives in strings.js (which main can't require).
    helpAutoRecord: helpFeed.lookupRecord(locationDirectory, settings.location.number),
    locationNameResolved: helpFeed.resolveLocationName(settings, locationDirectory),
    helpAutoStatus: {
      ...helpAutoStatus,
      hasDirectory: !!locationDirectory,
      fetchedAt: locationDirectory ? locationDirectory.fetchedAt : null,
      // Which season the URL template resolved to, and the address that
      // produces -- shown in Settings so IT can see what's being asked for
      // without having to work the date rule out in their head.
      season: helpFeed.currentSeasonCode(),
      resolvedUrl: helpFeed.resolveFeedUrl(settings),
    },
  };
}

function setupSettings() {
  settings = loadSettings();
  const found = helpFeed.readDirectoryFromFirst(locationDirectoryDirs());
  locationDirectory = found.directory;
  if (locationDirectory) console.log("[main] location directory loaded from " + found.dir);

  // One-time cleanup of the hand-typed "District Manager" placeholder this app
  // used to ship, now that the real one is auto-filled. Matched EXACTLY -- a
  // contact IT actually filled in (or renamed) is left alone, because deleting
  // a real support number would be far worse than leaving a duplicate.
  if (!settings.helpAuto.placeholderRemoved) {
    const before = settings.helpContacts.length;
    settings.helpContacts = settings.helpContacts.filter((c) => !(
      c && c.title === "District Manager" && c.phone === "(xxx) xxx-xxxx" && !c.description && !c.email
    ));
    settings.helpAuto.placeholderRemoved = true;
    // Only persist when something was actually removed. On a fresh install
    // there's no settings.json yet, and writing one here would freeze the
    // hostname-detected location number that loadSettings re-derives each
    // launch until an admin saves for the first time.
    if (settings.helpContacts.length !== before) {
      try {
        fs.writeFileSync(settingsFile(), JSON.stringify(settings, null, 2));
        console.log("[main] removed the shipped District Manager placeholder contact");
      } catch (e) {
        console.log("[main] could not persist placeholder cleanup:", e.message);
      }
    }
  }

  ipcMain.handle("settings:load", () => settingsPayload());
  ipcMain.handle("settings:save", (_e, partial) => {
    // These are attached by settings:load for display only -- the renderer's
    // draft state carries them along, but none may ever be persisted (each is
    // re-derived on every load, so a stored copy would silently go stale).
    const { hostname, helpAutoRecord, locationNameResolved, helpAutoStatus: _s, ...toSave } = partial || {};
    saveSettings(toSave);
    // Return the full payload, not the bare persisted object -- the renderer
    // assigns this straight into its settings state, so handing back a copy
    // without the derived fields would blank the mall name and the auto
    // contacts until the next launch.
    return settingsPayload();
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

  // Persists one grey-card calibration attempt's evidence (the captured
  // photo + the full analysis/plan/applied record) so a bad WB reading in
  // the field can actually be diagnosed instead of just re-guessed at.
  // See REMEDIATION-PLAN.md CFC-06. Fire-and-forget from the renderer --
  // never blocks the operator's flow, and a write failure here shouldn't
  // surface as a camera error.
  ipcMain.handle("calibration:save", async (_e, payload) => {
    if (!settings.calibrationDiagnosticsEnabled) return { ok: false, skipped: true };
    try {
      const dirName = `${(payload && payload.runId) || "no-run"}-${Date.now()}`;
      const dir = path.join(settings.paths.diagnostics, "calibrations", dirName);
      fs.mkdirSync(dir, { recursive: true });
      if (payload && payload.photoFile && fs.existsSync(payload.photoFile)) {
        // Preserve the real extension -- the simulator's stand-in captures
        // are PNGs, real hardware captures are JPEGs; hardcoding .jpg would
        // mislabel the former.
        const ext = path.extname(payload.photoFile) || ".jpg";
        try { fs.copyFileSync(payload.photoFile, path.join(dir, "capture" + ext)); } catch {}
      }
      fs.writeFileSync(path.join(dir, "analysis.json"), JSON.stringify((payload && payload.analysisRecord) || {}, null, 2));
      return { ok: true, dir };
    } catch (e) {
      return { ok: false, error: e.message };
    }
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
  // Synchronous by design -- preload reads this once at load time to decide
  // whether the global keyboard-navigation shortcuts should exist at all
  // (see REMEDIATION-PLAN.md CFC-03: they bypass every step gate, so they
  // must not exist in packaged/field builds). `electron .` (dev, headless
  // verification) is always unpackaged, so this stays permissive there.
  ipcMain.on("app:isPackagedSync", (e) => { e.returnValue = app.isPackaged; });
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

// Background refresh of the location directory. Deliberately fire-and-forget
// and deliberately last: nothing on the operator's path waits for the network,
// and a station whose router is down just keeps using the directory it already
// has. Deferred past first paint so parsing a couple of MB of JSON on the main
// process can't stutter the Welcome screen.
function startDirectoryRefresh(win) {
  const url = helpFeed.resolveFeedUrl(settings);
  if (!url) return; // feature dormant until an admin sets the feed URL
  const begin = () => helpFeed.startRefresh({
    net,
    url,
    dirs: locationDirectoryDirs(),
    hasDirectory: !!locationDirectory,
    log: (msg) => console.log("[main] " + msg),
    onStatus: (status) => { helpAutoStatus = status; },
    onUpdated: (directory) => {
      locationDirectory = directory;
      // Push the refreshed values at the renderer: it loads settings once on
      // mount and never again, so without this a station's first successful
      // fetch wouldn't show its mall name or managers until the next launch.
      if (win && !win.isDestroyed()) win.webContents.send("settings:changed", settingsPayload());
    },
  });
  win.webContents.once("did-finish-load", () => setTimeout(begin, 1500));
}

app.whenReady().then(() => {
  setupSettings();
  pruneCalibrationDiagnostics();
  setupCamera();
  const win = createWindow();
  startDirectoryRefresh(win);
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
