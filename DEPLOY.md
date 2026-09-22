# DEPLOY.md — Field Installation Guide

Two ways to put Camera Flight Check on a station PC. Both are built with `npm run package`
and land in `dist\`.

## Option A — Installer (recommended for field systems)

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

**This is the deployment path used for the Kaseya rollout** — pushed to each
station and unzipped by the Kaseya procedure.

1. Unzip anywhere (e.g. `C:\CameraFlightCheck\`).
2. **Unblock the extracted files before first launch** — a zip downloaded
   over the network carries Windows' "Mark of the Web," which is what
   triggers the SmartScreen prompt below. Clearing it here avoids the
   prompt entirely instead of relying on someone clicking through it at
   the station. Add this as a step in the Kaseya procedure right after the
   files land, before the app is ever run:
   ```powershell
   Get-ChildItem -Path "C:\CameraFlightCheck" -Recurse | Unblock-File
   ```
   (adjust the path to wherever that Kaseya step actually extracts to). No
   admin rights needed. This has to run again for every new version pushed
   — the mark is per-file, not per-folder-location.
3. Run `Camera Flight Check.exe` from the unzipped folder.
4. Delete the folder to remove it completely.

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
  a network rather than local media) triggers this. The Kaseya procedure should already
  run `Unblock-File` on the extracted folder before first launch (see Option B) — if it's
  still prompting, that step didn't run or ran against the wrong path. One-off fix on a
  single machine: More info → Run anyway, or `Unblock-File` by hand on that install.
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
