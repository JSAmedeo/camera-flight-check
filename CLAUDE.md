# CLAUDE.md — Camera Flight Check Coding Agent Instructions

## Project Identity

**Camera Flight Check** (folder: `Camera Pre Flight Utility`) is a standalone Windows desktop utility that seasonal photo-set operators run before each shift at Cherry Hill Programs venues (Santa/Bunny sets). It walks the operator through a ~4-minute readiness check: getting-started splash (location + what you'll need) → set checklist → camera detection → grey-card calibration (auto-corrects the camera's white balance + exposure in-camera) → guided test-photo QA → hand off to RPS (the photo sales app).

The audience is non-technical seasonal staff. The UI is deliberately one-task-per-screen, plain English, big buttons. Preserve that tone in all UI copy — no jargon, no camera-speak beyond what the design already uses. A core UX principle established by the user: **never leave a detected problem unexplained** — if the app finds an issue it can't fix, it must say so and say why (see the "What we found / What we fixed" cards).

## Agent Autonomy and Permission Rules

**Bias strongly toward acting without asking.** The user has explicitly asked for fewer permission prompts. A broad tool allowlist lives in `.claude/settings.json` — keep it updated when a new command class becomes routine, rather than accumulating one-off approvals in `settings.local.json`.

Proceed without prompting for:
- Reading files, searching the codebase, inspecting assets
- Editing or creating source files (components, styles, helper code, config)
- Running `npm install` / `npm run *` / `npx electron*`, `dotnet build`, `python`, headless Chrome/Electron screenshot verification runs
- Building and packaging (`npm run dist`, `npm run package`)
- Launching the app and killing this project's own processes (`electron.exe`, `CameraHost.exe`, stray `python` servers) when needed to free the camera or iterate
- Probing the tethered camera with non-destructive helper commands (detect/settings/capture/release)
- Downloading well-known artifacts (npm registry, GitHub releases, SourceForge digiCamControl, Google Fonts) and extracting them in the scratchpad
- Creating folders, writing documentation, updating CLAUDE.md/CONTEXT.md/memory

Stop and confirm with the user before:
- Deleting files or directories that may contain user work (killing processes is fine; deleting their data is not)
- Architectural changes (switching desktop shell, replacing the camera stack)
- Changing settings **on the physical camera** beyond what the grey-card/QA flows themselves do
- Force-pushing or rewriting history on the remote (repo: https://github.com/JSAmedeo/camera-flight-check, private). Normal commits/pushes on feature branches are fine; commit at meaningful checkpoints with descriptive messages. `main` holds field-validated states; feature work happens on branches (current: `nikon-support`)

## User Working Style

Same user as PhotoFlow Desktop. Processes progress visually — verify changes with real screenshots of the running app, not just green builds. Newer to many development stacks: give a short plain-language primer when introducing a new stack element. Work in small, verifiable stages with a visible running app. The user tests field builds on a real in-house station PC (1024×768 display, accessed over a PGI remote-desktop session whose down-scaling adds blur — remember that before chasing "blurry" reports).

## Actual Tech Stack (do not change without discussion)

- **Desktop shell:** Electron 31 — **interim scaffolding, not the destination.** The module may merge into PhotoFlow Desktop (Tauri v2). Do not deepen Electron-specific investment beyond what field validation needs. See CONTEXT.md § PhotoFlow convergence.
- **UI:** React 18 UMD + Babel standalone, loaded at runtime in `Camera Flight Check.html` — **no build step, no TypeScript, no bundler.** JSX files are plain `<script type="text/babel">` includes sharing global scope.
- **Styling:** plain CSS with custom properties. `simple-styles.css` is the design-synced base; all locally-added styles live in the `<style>` block of `Camera Flight Check.html`.
- **Strings:** ALL operator-facing copy lives in `strings.js` (`window.CFC_STRINGS`, loaded before the JSX) — training materials change, so **never hardcode UI text in JSX**; add a key to strings.js and reference `S.section.key` (templates use `{placeholders}` via the `fmt()` helper). Set Checklist tutorial images auto-load from `assets/tutorials/<key>-<n>.png` (see the README there) with a named placeholder until each file exists; each item's bullets double as its tutorial steps (title = bullet text) so guidance is authored once. Mall number→name lookup for the Welcome screen's location display lives in `assets/malls.csv` (number,name — see its README).
- **Camera layer:** `camera-host/` — .NET Framework 4.8 **x86** console exe wrapping digiCamControl's `CameraControl.Devices.dll` (Canon EDSDK 13.18.40 + Nikon PTP), plus raw EDSDK calls for card capacity. Speaks newline-delimited JSON over stdio (`detect`/`settings`/`capture`/`set`/`release`/`quit`). This and the grey-card math are the long-term keepers; keep them shell-agnostic.
- **Bridge:** `camera-bridge.js` (Electron main) spawns the helper or a built-in simulator; renderer reaches it via `window.cfc.camera` (see `preload.js`). Simulator supports env overrides for testing: `CFC_SIM_BATTERY=15`, `CFC_SIM_WB=Tungsten`.
- **Run log:** check-run events append to `%APPDATA%\Camera Flight Check\check-runs.jsonl` (`runs:save` IPC, `window.cfc.runs.save`), plus a per-run session file in the admin-configured data folder. Records are API-shaped (`check_started`/`check_completed` with runId, locationNumber/locationName/station, ISO timestamps, duration; `screen_skipped` for Skip taps) — a future phase POSTs them to the company API, so keep the schema stable and additive. No operator name is collected (removed 2026-09-02 — Welcome no longer has a sign-in form).
- **Vendored:** React/Babel/Geist font in `vendor/` (fully offline app — never reintroduce CDN links); digiCamControl 2.1.7 DLLs + VC++140 runtimes in `camera-host/lib/`.
- **Versioning:** bump `version` in `package.json` for each field drop (currently 1.0.1) so installs and logs stay traceable.

## Commands

```
npm start            # run the app (hardware mode if helper built, else simulator)
npm run sim          # force the camera simulator
npm run build:host   # dotnet build camera-host -c Release
npm run dist         # scripts/dist.js → builds helper + packages exe with helper embedded
                     #   output: dist\Camera Flight Check-win32-x64\Camera Flight Check.exe
npm run package      # scripts/package.js → dist + portable zip + Squirrel installer
                     #   (see DEPLOY.md for field install instructions)
```

## Critical Gotchas (all hard-won — do not rediscover)

1. **`ELECTRON_RUN_AS_NODE`**: this IDE environment sets it, which makes `require("electron")` return a path string. Always launch via `env -u ELECTRON_RUN_AS_NODE npx electron .` (bash) — `npm run` scripts and `scripts/*.js` already strip it.
2. **camera-host must stay x86** — the vendored digiCamControl native DLLs (EDSDK) are 32-bit.
3. **`CameraControl.Devices` API drifts between versions.** Property types mix `PropertyValue<int>` and `PropertyValue<long>`. Before coding against the DLL, reflect over it with **32-bit** PowerShell (`C:\Windows\SysWOW64\...\powershell.exe`) — x64 processes can't load it. When a build "succeeds" suspiciously fast, check for errors hidden by `tail -1` and for a running `CameraHost.exe` locking `bin\Release` (taskkill it).
4. **DLLs must come from digiCamControl 2.1.7+** (SourceForge — the GitHub 2.0.0 release ships EDSDK 3.2/2016, which predates the Rebel T7 → "Not Supported" on `EdsOpenSession`). EDSDK 13.x natives need the VC++140 runtime DLLs vendored beside them.
5. **EDSDK needs a Windows message pump.** CameraHost runs `Application.Run()` on the main STA thread; camera calls marshal onto it via `OnPump()`; the stdio protocol runs on a background thread. Never block the pump thread waiting for a camera event (deadlock — see `Capture`).
6. **Settings load asynchronously after init.** `IsConnected=true` ≠ properties ready. `Settings()` polls until the ISO table is populated (the reliable signal, present even in Auto mode) — without this, a camera in M reads as all-nulls and the UI misdiagnoses "Auto mode." The UI separates `readFail` (nothing loaded → "Re-check / replug USB") from `modeWarn` (loaded but WB locked → genuinely Auto). Waiting also yields the body's real value tables (8 real ISOs) instead of the driver's static ones.
7. **The driver's value tables lie.** Static tables include phantom values (ISO 6/12 on a T7) and lens-impossible apertures. The correction planner clamps: **ISO 100–25600 only; aperture only ever stops DOWN** (brightening is ISO's job). Field-tuned tolerances live as constants in `simple-app-bundled.jsx`: `EV_TOLERANCE = 1.0` stop (user: under 1 stop is good enough), `CAST_TOLERANCE = 0.3` / `CAST_STRONG = 0.6` (|log2 R/B linear|), `CLIP_LIMIT = 0.2` (≥20% near-clipped pixels → color judgment unreliable, skip WB). Keep all of these in any new setting-writing code.
8. **Card-capacity reads use raw EDSDK and can block while the camera is busy** — `GetStorageInfoCached` reads once per session and never during `IsBusy`. Don't put EDSDK volume calls back in the `settings` hot path. Shots-remaining can be a garbage sentinel (T7: 1.9M) — UI ignores counts ≥ 100k.
9. **2.1.7 enumerates webcams** (incl. OBS Virtual Camera) as camera devices. `IsRealCamera`/`Priority` in `Program.cs` filter them — vendor-SDK devices outrank generic, webcams never eligible.
10. **Stale `CameraHost.exe` processes** survive force-closed sessions, hold the camera session, and block rebuilds — this bit the field machine as "failing to read camera settings" (2026-07-16). Hardened: the bridge taskkills orphans before every spawn, `main.js` holds a single-instance lock (skipped in `--screenshot` runs), and helper stderr persists to `%APPDATA%\Camera Flight Check\camera-host.log` (2MB rotation) for field debugging. Headless verification runs are a common orphan source.
11. **One app owns the camera USB session.** The check must `release()` before RPS opens (Done screen and `will-quit` both do). EOS Utility/webcam apps on the station PC can steal the session too.
12. **Cameras must be in M (or P/Av/Tv) mode** to accept setting changes; on Auto the camera reports WB/Tv/Av as null and refuses writes → UI shows the mode-dial warning.
13. **UI scaling is real Chromium zoom** (`setZoomFactor` from window size in `main.js`), NOT the CSS transform — the transform self-corrects to ~1. Never scale with CSS transforms (fractional bitmap scaling = blurry text). Mouse-coordinate math still divides by the residual scale (see `RegionSelect.rel()`). Launch size is adaptive: 85% of work area, 97% on displays under 900px tall.
14. **Post-`set` re-reads can time out** while the camera digests writes — `onRegion` tolerates a failed refresh and shows applied values instead of erroring. Show operators `errText(e)` (strips Electron IPC noise), never raw errors.
15. **Design origin:** UI sources come from Claude Design project `af76a28a-f036-4a45-b738-a5e2c2458ab3` — pull `.jsx`/`.css` sources, never the compiled `.html` bundles. `get_file` truncates at ~256KB, so the AI-photo assets can't be exported; local PNGs are SVG-rendered stand-ins.
16. **Headless verification pattern:** generate a `__verify.html` copy with an automation `<script>` (keydown/clicks/mouse events; remember the stage may not be mounted before ~3s), run with `--verify --simulate --screenshot=<path> --shot-delay=<ms>`, delete `__verify.html` after. Real-hardware runs need longer delays (EDSDK startup competes with Babel compile). These runs are a known source of orphaned `CameraHost.exe` processes (see #10).
16a. **Field build version:** the packager deletes older-version portable zips, but always confirm which version the field machine is actually running before debugging "still broken" reports — a stale 1.0.0 folder once masked a day of fixes.
16b. **QA retake keep-levels:** `takePhoto(keep)` in `ScreenTestPhoto` — 0 resets all answers, 1 keeps "centered", 2 keeps "centered"+"crisp" (used via `pendingKeep` by the color-fix retake). Never pass the click event as `keep` (always wrap in an arrow). Colors always re-ask after a retake.
17. The **dev HUD** (compact pill top-right in the step-dots band) bypasses all step gates — kept intentionally during dev; removal/gating decision deferred. Don't put floating chrome at bottom-center; it collides with the app's footer buttons.

## Current Focus

**Field validation on the in-house station PC, going well.** Canon T7 verified end-to-end: detect, settings (incl. mode/quality), capture/transfer, grey-card corrections on a real scene (ISO 6400 stress test passed), and the full guided QA loop exercised with real photos of a Santa print. Result tolerances field-tuned (1-stop exposure, visible-cast color, clipping guard). Camera-session reliability hardened after two field incidents (orphan kill + single-instance lock + persistent `camera-host.log`). A **real-person grey-card test is next** — collect: WB preset chosen, over/under-correction of the retake (tunes the warmth→Kelvin exponent `0.6` in `planCorrections`), whether the "strongly cool on WB Shade" anomaly recurs below the clipping guard, and how the 3/4-bust guide fits a real seated Santa. Canon T6 also validated (2026-07-17). SD-card-capacity reporting was dropped app-wide (2026-08-17) — tethered capture never reads from the card, so it had no value and would have needed net-new Nikon PTP work to match. Nikon D: completely untested but the DLL ships dedicated classes for 24+ D/Z models plus a NikonBase PTP fallback — expect one debugging session with the first real body (capture flow, settings timing, Auto-dial heuristic, WB vocabulary). Field fleet inventory received 2026-08-17 (2,669 cameras across venues, see CONTEXT.md § Target hardware) shows real usage skews heavily toward bodies **not** in the dedicated-class list — D-3000 and D-3400 alone are ~83% of the fleet and both land on the generic NikonBase path, so that's the path that determines success for most stations, not the per-model classes. Training-material pipeline is ready and waiting on content: copy edits go in `strings.js`, and the tutorial photos drop into `assets/tutorials/` (named per its README) to replace the placeholders.

**UI/UX round (branch `ui-revamp`, on top of `nikon-support`), most recent work 2026-09-02:** internal feedback drove two changes — Welcome dropped its name-entry form for a getting-started splash (mall location parsed from hostname + `assets/malls.csv`, plus a "what you'll need" list), and Walk-around was renamed **Set Checklist** with its real 6-item checklist (was always placeholders) — bullets now shown inline on each card (3-column grid, 2 rows), doubling as that item's "More info" tutorial steps. The mall CSV currently has one seeded real mapping (`0004,Menlo Park`) and needs the rest filled in. Also done in this branch: real per-screen Skip controls with optional reason-prompt and per-run session logging, an admin Settings screen (location/station, data folder, camera setting limits, test-photo overlay editor), and a softened dark theme. Not yet done: real-hardware pass on any of this (simulator + logic-level verification only), and most tutorial/mount-style photos are still placeholders.
