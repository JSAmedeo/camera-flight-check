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

1. Unzip anywhere (e.g. `C:\CameraFlightCheck\`).
2. Run `Camera Flight Check.exe` from the unzipped folder.
3. Delete the folder to remove it completely.

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
3. Launch Camera Flight Check → enter name → walk-around → camera check →
   grey card → test photo → **Close Utility / Open RPS** (this releases the camera).
4. Data lands in `%APPDATA%\Camera Flight Check\check-runs.jsonl` (one JSON record
   per run start/completion — this is what will POST to the API later).

## Troubleshooting

- **"We can't find the camera"** — check cable/power, make sure no other app has the
  camera open, then Try again. Webcams are ignored by design.
- **Yellow "camera is in Auto mode" warning** — turn the mode dial to M and press Re-check.
- **App opens as "Simulator"** (badge in the top bar) — the camera helper is missing
  from the package; rebuild with `npm run package`. Forcing simulator on purpose:
  run with `--simulate`.
- **SmartScreen blocks the app** — More info → Run anyway (unsigned build).

## Rebuilding the artifacts

```
npm run package
```
Builds the .NET camera helper, packages the Electron app, and produces both the
portable zip and the Squirrel installer. Bump `version` in `package.json` for each
field drop so installs and logs are traceable.
