# Camera Flight Check

A Windows desktop utility that seasonal photo-set operators run before each
shift at Cherry Hill Programs venues (Santa/Bunny sets). It walks the
operator through a short readiness check — set checklist, camera detection,
grey-card white-balance/exposure calibration, a guided test-photo review —
and then hands off to RPS, the photo sales app, releasing the camera's USB
session so RPS can use it. Real runs at three venues on 2026-09-24 took
30–87 seconds.

It also keeps itself current without anyone visiting the station: one
background request per launch fetches the company location directory, which
supplies the venue's mall name and its Regional/District Manager contacts.
That data is cached on disk and never expires, so a site whose cellular
router is down keeps working on the last good copy.

Internal Cherry Hill Programs software — see `LICENSE` and
`THIRD-PARTY-NOTICES.md`.

## Requirements

- Windows 10/11 (the camera helper and its vendored SDKs are Windows-only)
- [Node.js](https://nodejs.org/) 18+ and npm
- .NET Framework 4.8 Developer Pack, if you're building `camera-host/`
  (the pre-built helper is not committed — see below)
- A tethered Canon or Nikon camera, if you want to exercise real hardware
  instead of the simulator

## Quick start

```
npm install
npm run sim        # runs the app against a built-in camera simulator — no
                    # hardware needed, this is the fastest way to see the UI
```

To use a real camera instead of the simulator, build the camera helper first:

```
npm run build:host   # dotnet build camera-host -c Release (needs .NET 4.8)
npm start             # runs against real hardware if the helper built successfully,
                       # falls back to the simulator automatically if it didn't
```

There is no build step for the UI itself — it's plain React 18 (UMD) + Babel
Standalone, loaded directly by `Camera Flight Check.html` at runtime. Edit
`simple-app-bundled.jsx`/`simple-styles.css`/`strings.js` and reload; nothing
needs compiling.

## Project layout

```
Camera Flight Check.html      entry point — loads React/Babel + the app scripts
simple-app-bundled.jsx        the whole 5-step app: UI, camera flow, grey-card math
simple-styles.css             base stylesheet
strings.js                    ALL operator-facing copy (edit training text here)
main.js / preload.js          Electron main process, window + IPC surface
camera-bridge.js              spawns the camera helper or the built-in simulator
camera-host/                  .NET 4.8 x86 console exe that talks to the camera
                               (Canon EDSDK + Nikon PTP via digiCamControl)
assets/                       bundled images (framing guide, tutorial photos,
                               icon.ico + app-mark.png — the app icon, one
                               source for the exe, installer and top bar)
help-feed.js                  location directory: fetches mall names + manager
                               contacts, caches them for offline use
vendor/                       vendored React/Babel/Geist — fully offline app,
                               no CDN dependencies
scripts/                      build (dist.js) and packaging (package.js) pipeline
```

## Building and packaging

```
npm run build:host   # builds the .NET camera helper
npm run dist          # scripts/dist.js — builds the helper + packages the
                       # Electron app with it embedded
npm run package       # scripts/package.js — dist, then produces both a
                       # portable zip and a Squirrel installer under dist/
```

```
npm run verify:runlog # drives a real check run in a throwaway profile and
                       # asserts the run-log record it WROTE is well-formed
```

That last one exists because the run log has no UI, so the usual
screenshot-based verification can't see it — a field that silently stopped
being populated went unnoticed until logs came back from three venues. Run it
after changing anything that feeds `check-runs.jsonl`.

What ships to a station is decided by the ignore list in `scripts/dist.js`,
**not** by `.gitignore` — the app packages unpacked, so anything left in the
project root ends up readable on the station PC. If you add a file that holds
real data, add it there too, and check `dist\Camera Flight Check-win32-x64\
resources\app` to see what the field actually gets.

Bump `version` in `package.json` before each field drop — it's what makes a
given install traceable in the run logs and in field bug reports. It also
lands in the exe's ProductVersion, so the running build can be confirmed from
file properties without launching anything. Always check that before chasing a
"still broken" report: a stale same-named folder has masked a day of fixes
before.

See `DEPLOY.md` for how to actually install a build on a station PC — it
carries the Kaseya deployment procedure used for the fleet rollout, field
troubleshooting, and station-PC requirements.

## Where to look for more

This repo carries more documentation than most internal tools its size,
because a lot of it was written for an AI coding agent working the project
across sessions — it's just as useful for a human picking it up:

- **`CLAUDE.md`** — the tech stack, every hard-won gotcha (camera SDK quirks,
  Electron pitfalls, headless-verification recipes), and the current state of
  in-progress work. Read this before touching camera code or Electron
  internals.
- **`CONTEXT.md`** — the product narrative: what each screen does, why past
  decisions were made, the Nikon fleet inventory, open items, and a phase-by-
  phase build history.
- **`DESIGN-SNAPSHOT.md`** — a point-in-time reference for the current visual
  design (colors, spacing, component inventory) if you're changing the UI.
  Older snapshots are kept alongside it, dated, once superseded.
- **`DEPLOY.md`** — field installation and troubleshooting for a station PC.
- **`REMEDIATION-PLAN.md`** — an external code-review-derived list of known
  issues and suggested fixes, tracked with stable IDs (`CFC-nn`).
