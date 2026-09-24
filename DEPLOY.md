# DEPLOY.md — Field Installation Guide

Two ways to put Camera Flight Check on a station PC. Both are built with `npm run package`
and land in `dist\`.

**For the fleet rollout, use Option B (portable + Kaseya)** — that's the validated
path and the one the deployment procedure is written against. Option A is for
one-off or manual installs.

## Option A — Installer (one-off / manual installs)

**File:** `dist\installer\Camera Flight Check Setup.exe`

1. Copy `Camera Flight Check Setup.exe` to the station PC (USB stick is fine).
2. Double-click it. There are no prompts — it installs per-user in a few seconds and
   creates a **Start menu and desktop shortcut** ("Camera Flight Check").
3. Windows SmartScreen will likely warn because the exe is unsigned:
   click **More info → Run anyway**. (Code signing is a future item.)

- Installs to `%LocalAppData%\CameraFlightCheck\` — **no admin rights needed**.
- To uninstall: Settings → Apps → Camera Flight Check.

## Option B — Portable (no install at all)

**File:** `dist\CameraFlightCheck-<version>-portable.zip`

**This is the deployment path used for the Kaseya rollout.** The five steps
below are the whole procedure — an untouched machine taken through them
launches clean, with no SmartScreen or Defender prompt. Validated end to end on
a field machine 2026-09-24.

### Kaseya deployment procedure

| # | Step | Detail |
|---|---|---|
| 1 | Create the install folder | `C:\preflight-ops-check` |
| 2 | Download the portable zip | from the FTP server, `0bk.net/chp/installers` |
| 3 | Extract into the folder | contents go directly in `C:\preflight-ops-check` — the exe sits at the root, not in a subfolder |
| 4 | Create a desktop shortcut | target `C:\preflight-ops-check\Camera Flight Check.exe`, named **`Pre-Flight Ops Check`** |
| 5 | Clear Mark of the Web | `Get-ChildItem "C:\preflight-ops-check" -Recurse -File \| Unblock-File` |

Notes that matter for the procedure:

- **Step 5 must run before the app is ever launched.** A zip that arrived over a
  network carries Windows' "Mark of the Web", and Windows propagates it to every
  extracted file — that tag, not the app, is what triggers SmartScreen. Clearing
  it avoids the prompt outright rather than relying on someone at the station
  clicking through it. No admin rights needed, and it prints nothing on success.
- **It has to run again for every version pushed.** The mark is per file, not
  per folder, so a new zip arrives tagged again. Unblocking the *zip* before
  extracting works too and is one call instead of ~180 —
  `Unblock-File "<path>\CameraFlightCheck-<version>-portable.zip"` — since the
  tag propagates from the archive to whatever comes out of it.
- **Verify step 5 worked** by re-running the check; empty output means clean:
  ```powershell
  Get-ChildItem "C:\preflight-ops-check" -Recurse -File |
    Where-Object { Get-Item $_.FullName -Stream Zone.Identifier -ErrorAction SilentlyContinue } |
    Select-Object -ExpandProperty FullName
  ```
- **No Defender exclusion is needed.** A clean machine taken through these steps
  launches without one. If a prompt still appears, read it before excluding
  anything — "Windows protected your PC" means step 5 didn't run or ran against
  the wrong path, whereas an actual Defender threat notice is a different problem
  and worth investigating rather than excluding away.
- **Name the shortcut `Pre-Flight Ops Check`, not the exe's own name.** Windows
  would default it to "Camera Flight Check" after the exe, but what operators see
  in the app's top bar is **Pre-Flight Ops Check** — the shortcut should match the
  app, not the filename. (If that title is ever changed, it lives in `strings.js`
  under `app.title`, and this step should change with it.)
- **The shortcut needs no icon file.** A Windows shortcut takes its icon from the
  target exe, which carries the app icon, so step 4 is just target + name.
- **The folder must stay writable.** The app writes `location-directory.json`
  (~145KB of mall names and manager contacts) next to the exe, and by default
  also creates `Logs\`, `Photos\` and `Diagnostics\` under the same root.
- **To confirm which build is running** without launching it: right-click
  `Camera Flight Check.exe` → Properties → Details → ProductVersion.
- **To remove it completely**, delete the folder and the shortcut.

## Station PC requirements

| Requirement | Notes |
|---|---|
| Windows 10/11 64-bit | tested on Windows 10 Pro 19045 |
| .NET Framework 4.8 | preinstalled on Windows 10 1903+ — only very old images need it ([download](https://dotnet.microsoft.com/download/dotnet-framework/net48)) |
| USB port + camera cable | camera must be ON and the mode dial on **M** for setting corrections |
| No vendor software needed | Canon EDSDK / Nikon PTP drivers are bundled; EOS Utility etc. does NOT need to be installed (and must not be running — it would hold the camera) |

## Field-test checklist

1. Close anything that may own the camera (RPS, EOS Utility, webcam apps).
2. Plug in the camera, power ON, mode dial on **M**.
3. Launch Camera Flight Check → Welcome → Set Checklist → Camera (grey-card
   calibration) → Test photo → **Finish and Launch RPS** (or **Finish and
   Close** if no exit app is configured — this releases the camera either way).
4. Data lands in `%APPDATA%\Camera Flight Check\check-runs.jsonl`, plus a
   per-run session log under whatever folder Settings → General → File
   Output Paths → Completion Logs points to (one JSON record per run
   start/completion — this is what will POST to the API later).

## Per-station admin setup (gear icon, top-right)

The Settings screen is **password-protected by default** (`help123`) so
seasonal staff don't wander into camera limits or the RPS path — change it
(or turn the lock off) under General → Settings password. Per-station items
worth setting on first install: location number/station name, the exit app
to launch on Finish (or turn it off if the station doesn't use one), the
three File Output Paths if they shouldn't point at the default
`C:\preflight-ops-check\...` folders, and Help Config's contacts/docs list.

## Troubleshooting

- **"We can't find the camera"** — check cable/power, make sure no other app has the
  camera open, then Try again. Webcams are ignored by design.
- **Yellow "camera is in Auto mode" warning** — turn the mode dial to M and press Re-check.
- **App opens as "Simulator"** (badge in the top bar) — the camera helper is missing
  from the package; rebuild with `npm run package`. Forcing simulator on purpose:
  run with `--simulate`.
- **SmartScreen blocks the app** ("Windows protected your PC") — the build is unsigned,
  so any copy that still carries Windows' "Mark of the Web" (anything that arrived over
  a network rather than local media) triggers this. Step 5 of the Kaseya procedure
  (see Option B) clears it before first launch — if it's still prompting, that step
  didn't run or ran against the wrong path. Confirm with the Zone.Identifier check in
  Option B, which lists exactly which files are still tagged. One-off fix on a single
  machine: `Get-ChildItem "C:\preflight-ops-check" -Recurse -File | Unblock-File`, or
  More info → Run anyway to get past it once without fixing the cause.
- **Grey-card correction looks wrong** (bad white balance, unexpected result, or the box
  keeps getting rejected as "doesn't look like a grey card") — every attempt is saved
  under Settings → General → File Output Paths → Diagnostics →
  `calibrations\<runId>-<timestamp>\`: the exact photo analyzed (`capture.jpg`, only for
  attempts that got far enough to be analyzed) plus the full record (`analysis.json`),
  including ones the app rejected (`"outcome": "rejected"`) or reverted
  (`"outcome": "reverted"`). Grab that folder before troubleshooting further — it's the
  fastest way to tell whether the sampled box was actually on the card. If a station's
  lighting makes every box placement fail (badly over/underexposed, glare, a shadow the
  strobe can't reach), the rejection message points at a "Revert to default settings"
  button next to Retake photo — it sets the camera to this station's configured defaults
  (Settings → Camera → Default Camera Settings — ISO/shutter/f-stop/white balance,
  shipped as ISO 400, 1/125, f/7, Auto) instead of leaving it at whatever it was
  mid-adjustment, shows a popup confirming what it's now set to, and takes a fresh photo
  on "Retake photo" so the operator lands right back on box-selection to try the grey
  card again. Turn diagnostics off under the General Settings tab ("Save a copy of each
  grey-card photo and reading") if a station shouldn't collect it; the newest 30 attempts
  stay in `calibrations\`, and older ones move to `calibrations\.trash\` rather than being
  deleted outright — recoverable there for a while (60 more generations) if something
  needed gets pruned before you grab it.

## Rebuilding the artifacts

```
npm run package
```
Builds the .NET camera helper, packages the Electron app, and produces both the
portable zip and the Squirrel installer. Bump `version` in `package.json` for each
field drop so installs and logs are traceable.
