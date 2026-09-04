# CONTEXT.md — Camera Flight Check Project Context

## Product Summary

**Camera Flight Check** is a pre-shift readiness gate for camera stations at high-volume souvenir photo sets (Santa/Bunny venues). Before RPS (the photo capture/sales app) opens, a seasonal operator runs a ~4-minute guided check:

1. **Welcome** — a getting-started splash (no sign-in): shows the station's mall location (parsed from the computer's hostname, `MALL####-Camera`, looked up against `assets/malls.csv`) and a "what you'll need" list (grey card, character in the chair, camera connected/powered, flash on); live date/time shown; a `check_started` record (with location + station, no operator name) is written locally for future API posting
2. **Set Checklist** — 6 real tap-off physical checks (set is clean, router online incl. POS/camera/reprint computers connected, Stura webcam ready, camera connected, camera framed correctly, flash connected/tested), each with bullet points inline on the card and a "More info" detail modal built from those same bullets
3. **Camera** — detects the tethered camera, shows a full **camera stats panel** (model, mode, f-stop, shutter, ISO, WB, image quality), operator photographs the character holding an 18% grey card, drags a box over the card, and the app **corrects white balance + exposure in-camera**, then reports results as matched **"What we found" / "What we fixed"** cards — including explicit "not fixed, here's why" rows when a correction hits a hardware limit
4. **Test photo** — real capture reviewed through a **guided 3-card QA sequence**: centered? (dotted placement overlay until answered) → crisp? (No → autofocus help) → colors right? (multi-select; problem answers auto-adjust the camera and loop back to retake). Completed cards can be reopened via "Change". "Looks good" is gated on all three passing
5. **Done** — shows real measured duration, writes `check_completed`, releases the camera USB session, and closes so RPS can attach

Target hardware: Canon EOS Rebel T5–T7 (T6 and T7 validated on real hardware 2026-07-17; T5 expected to work, same support generation), plus the Nikon D fleet below. Cameras are on constant power (no battery gating — removed by user request).

**Nikon fleet inventory (from the user, 2026-08-17 — 2,669 cameras across all venues):**

| Model | Count | digiCamControl coverage |
|---|---|---|
| D-3000 | 1,586 | generic (`NikonBase` PTP) |
| D-3400 | 638 | generic |
| D-5200 | 83 | dedicated (`NikonD5200`) |
| D-90 | 58 | dedicated (`NikonD90`) |
| D-5500 | 52 | generic |
| D-5100 | 51 | dedicated (`NikonD5100`) |
| D-5300 | 49 | generic |
| D-3500 | 27 | generic |
| D-5000 | 24 | generic |
| D40 | 23 | dedicated (`NikonD40`) |
| D-3100 | 18 | generic |
| D70 | 18 | generic |
| D-3200 | 16 | dedicated (`NikonD3200`) |
| D-5600 | 8 | generic |
| D-3300 | 9 | generic |
| D-60 | 4 | dedicated (`NikonD60`) |
| D70S | 3 | generic |
| D-50 | 2 | generic |

Only ~8.8% of the fleet (D40/D60/D90/D3200/D5100/D5200) gets one of the DLL's 24+ per-model classes — the other ~91%, including the two largest buckets (D-3000, D-3400), falls to the generic `NikonBase` PTP fallback. **That fallback path is the one that matters most** — it's what nearly all stations are actually running. D70/D70S are 2004–2005-era bodies; low count (21 units) but the oldest PTP implementation in the fleet, worth a quick sanity check even though it's not worth deep investment. Recommend requesting a D-3000 or D-3400 first for hardware testing, since validating those covers the bulk of real deployments.

## Origin and Design Source

The UI was designed in Claude Design (claude.ai/design), project id `af76a28a-f036-4a45-b738-a5e2c2458ab3` ("Camera Flight Check.html", Simple Mode). Real sources there are the `.jsx`/`.css` files — the `.html` files are compiled bundles. Local `simple-failures.jsx` + `Camera Flight Check - Failure Screens.html` hold designed failure screens **not yet wired into the app flow**. The design's AI-photo assets exceed the design API's 256KB export cap; local `assets/*.png` are stand-ins rendered from the prototype's `SantaScene` SVG.

## Phase History

| Phase | Goal | Status |
|-------|------|--------|
| 1 | Import Simple Mode design, run as local HTML | **COMPLETE** (2026-07-13) |
| 2 | Standalone Windows desktop app (Electron, offline, frameless floating window) | **COMPLETE** (2026-07-13) |
| 3 | Real camera functionality (detect / capture / grey-card correction), simulator-verified | **COMPLETE** (2026-07-14) |
| 4 | Hardware + field validation (Canon + Nikon), operator UX build-out, deployable packaging | **IN PROGRESS** — T6 + T7 fully working incl. field grey-card runs; real-person test next. D3400 full app-driven grey-card calibration run also passed (2026-08-18): detected, communicated cleanly, computed and applied new settings on the camera. Other Nikon bodies still unvalidated |
| 5 | (Candidate) PhotoFlow Desktop convergence, failure screens, QC upload, RPS launch, API posting | TBD |

### Phase 2 details
- Vendored React 18 UMD, Babel standalone, Geist font → fully offline (`vendor/`)
- Frameless transparent window, CSS-rounded 14px corners, app's own top bar is the draggable title bar with integrated minimize/close
- Window aspect-locked 16:10 to the app's internal 1440×900 stage; launch size adaptive (85% of work area; 97% on sub-900px displays like the 1024×768 field PC)
- UI scales via **real Chromium zoom** (`setZoomFactor` in `main.js`), not CSS transforms — transforms caused blurry text (fractional bitmap scaling); the app's internal transform-scale self-corrects to ~1. Transparent frameless windows can't use ClearType (grayscale AA is inherent)
- Prototype dev HUD: compact pill top-right in the step-dots band (moved from bottom-center where it collided with footer buttons); bypasses step gates deliberately during dev

### Phase 3 details
- **Stack decision (user-confirmed):** start open-source (digiCamControl), migrate to vendor SDKs later if needed; corrections = **WB + exposure**; flight check runs **before RPS and releases the camera**; both camera brands available for dev testing
- `camera-host/` .NET 4.8 x86 exe, JSON-over-stdio protocol: `detect`, `settings`, `capture {savePath}`, `set {iso|shutter|aperture|wb}` → `{applied, rejected}`, `release`, `quit`
- `camera-bridge.js`: spawns helper (dev: `camera-host/bin/Release/`, packaged: `resources/camera-host/`) or built-in **simulator** (`--simulate`, auto-fallback when exe missing). Simulator emulates a T7 with wrong settings (WB Shade, ISO 800) returning a warm capture until corrected, then a neutral one; env overrides `CFC_SIM_BATTERY`, `CFC_SIM_WB` for testing edge paths
- Renderer API: `window.cfc.camera.{mode,detect,settings,capture,set,release}`; captures return as base64 data URLs so canvas pixel-reads aren't tainted
- Grey-card math (`simple-app-bundled.jsx`): region average → linearize (γ2.2) → EV error = log2(0.18 / Y); warmth = R/B linear ratio → estimated Kelvin (empirical exponent **0.6 — calibrate on real captures**) → nearest available WB preset via `WB_KELVIN`. Strobe-lit sets: exposure via **ISO first, then aperture stop-down, never shutter**
- Region selection: drag-rectangle (single tap = small square), coordinates corrected for stage scale, mapped through objectFit-cover to natural pixels

### Phase 4 details (in progress)
First real-hardware session (T7 on the dev machine, 2026-07-15) fixed three stacked issues: **wrong driver** (generic MTP claimed the camera → `UseExperimentalDrivers = true`), **EDSDK too old** (GitHub 2.0.0 ships EDSDK 3.2/2016, predates the T7 → upgraded to **digiCamControl 2.1.7** from SourceForge with **EDSDK 13.18.40** + VC++140 runtimes; installer unpacks as nested CABs → MSI), and **no message pump** (EDSDK callbacks need one; CameraHost now runs `Application.Run()` with `OnPump()` marshalling). Plus: 2.1.7 enumerates webcams as cameras → filtered (`IsRealCamera`/`Priority`).

Field testing on the in-house station PC (portable build, PGI remote session) then drove a hardening round:
- **Settings-read race**: camera in M showed as "Auto" with all-dash stats — property values load asynchronously after init; helper now polls until the ISO table is populated before answering `settings` (bonus: live per-body value tables replace the static ones with phantom ISO 6/12). UI distinguishes `readFail` (Re-check / replug) from `modeWarn` (genuinely Auto)
- **ISO 6400 stress test** hung the post-correction re-read → storage reads cached per session and skipped while busy; correction planner clamps ISO to 100–25600 and aperture to stop-down-only; a failed post-`set` refresh falls back to showing applied values; `errText()` strips IPC noise from operator-facing errors
- **Stale `CameraHost.exe` processes** found holding the camera after force-closed sessions — check for orphans when the camera "doesn't respond"

Operator UX built out (all 2026-07-15, v1.0.1):
- **Operator sign-in + run log**: name fields + live clock replace the mock greeting; `check_started`/`check_completed` JSONL events in `%APPDATA%\Camera Flight Check\check-runs.jsonl`, API-shaped; Done screen uses real name + measured duration
- **Detect screen**: honest two-step ("Looking for your camera…" → "Found" + model; "Reading camera settings…" → "loaded, Mode M"); battery card removed (constant power)
- **Camera stats panel** on the calibration screen: model/mode/f-stop/shutter/ISO/WB/quality/SD card, with a subtle right-aligned **"Refresh settings"** button above it (2026-07-16) — re-pulls live settings after last-minute dial changes without leaving the screen; shares the fetch with the warning banners' Re-check so a dial moved to Auto surfaces immediately. Card capacity via raw EDSDK (`EdsGetVolumeInfo` + `PropID_AvailableShots` through `CanonSDKBase.Camera.Handle`); shots-sentinel filtered (≥100k hidden); **Nikon storage returns null pending a PTP path**
- **Found/Fixed summary cards** after grey-card correction: side-by-side equal columns ("What we found" / "What we fixed") on the wide screen — measurements in plain English, fixes as "Was X → changed to Y (reason)", and **warning rows for findings that couldn't be fixed** (e.g. WB already at its warmest/coolest preset) — a found issue is never silently dropped. Result tolerances field-tuned 2026-07-15: below `EV_TOLERANCE` (1 stop) reads "within the good range"; casts below `CAST_TOLERANCE` (0.3) read "colors look good"; ≥`CLIP_LIMIT` (20%) near-clipped card pixels → "too bright to judge color reliably", WB untouched (clipping produces phantom casts)
- **Guided test-photo QA**: 3 sequential cards (centered → crisp → colors) with dotted `CenterGuide` overlay, autofocus help on "not crisp", color multi-select (Too bright/dark/Washed out/Over saturated → EV nudges −1/+1/−⅔/−⅓ summed, clamped ±2, applied via ISO then aperture stop-down, auto-return to retake). Neutral answer buttons (nothing pre-selected), "Change" reopens completed cards, "Looks good" gated on all three. **Retakes remember their origin** (`takePhoto(keep)`: card-2 retake keeps "centered"; card-3 adjust-retake keeps cards 1+2 via `pendingKeep`; card-1 retake and footer "Take it again" reset all; colors always re-ask). The adjust-retake aim screen drops the first-time setup checklist and retitles to "Take another test photo". The `CenterGuide` evolved rectangle → seated silhouette → **3/4 bust** (big head, shoulders running off the bottom edge, lowered 15% per field feedback) — a single SVG path, tuned via marked-up field screenshots. The design's "Aim here" box was removed from the aim stage (no live preview, nothing to aim with)
- **Deployable packaging**: `npm run package` → portable zip + Squirrel per-user installer (no admin, shortcuts, `electron-squirrel-startup` guard). `DEPLOY.md` has field instructions. Unsigned → SmartScreen "Run anyway"; code signing future. The packager deletes older-version zips — a stale 1.0.0 zip once sat beside 1.0.1 and the field machine likely ran the old build for part of a day; **verify the running version before debugging "still broken" reports**
- **Camera self-healing** (2026-07-16, after a second field "can't read settings" incident that camera power-cycling didn't fix): the bridge taskkills orphaned `CameraHost.exe` before every spawn (validated live — it caught a real orphan on its first run), `main.js` holds a single-instance lock (second launch focuses the existing window; skipped in `--screenshot` runs), and all camera-layer output persists to `%APPDATA%\Camera Flight Check\camera-host.log` (timestamped, 2MB rotation) so field incidents leave evidence

### String externalization + tutorial media (2026-07-16)
All operator-facing copy moved to `strings.js` (`window.CFC_STRINGS`) — screens reference `S.*` keys, templates use `{placeholders}` via `fmt()`. Editing training copy is now a text-file change with no code involvement. The walk-around "More info" popups became a click-through micro-tutorial (steps + dots + Back/Next, keyboard nav): step titles/captions come from `strings.js` (`walk.items.<key>.steps`), and each step displays `assets/tutorials/<key>-<n>.png` when the file exists — until then a placeholder names the expected file (hand-built SVG animations were removed as premature; real equipment photos are the plan, `assets/tutorials/README.txt` lists the 18 filenames). Dev-HUD labels and the technical settings-strip abbreviations (f/, ISO, WB, BAT) intentionally stay in code.

## Key Files

- `Camera Flight Check.html` — entry point; ALL locally-added CSS lives in its `<style>` block
- `strings.js` — ALL operator-facing copy (edit training text here; keep keys + {placeholders})
- `assets/tutorials/` — drop-in tutorial photos (`<key>-<n>.png`; README lists expected names)
- `simple-app-bundled.jsx` — the whole 5-step app UI + camera flow + grey-card/QA math (design-derived, heavily locally diverged)
- `simple-styles.css` — design-synced base stylesheet
- `main.js` / `preload.js` / `camera-bridge.js` — Electron shell (window, zoom, run log IPC), API surface, camera bridge + simulator
- `camera-host/` — .NET camera helper (`Program.cs`, `CameraHost.csproj`, `lib/` vendored digiCamControl 2.1.7 DLLs + VC++ runtimes)
- `scripts/dist.js` / `scripts/package.js` — build + packaging pipeline
- `DEPLOY.md` — field installation guide; `.claude/settings.json` — broad permission allowlist
- `shared.jsx`, `screens/05-liveview.jsx` — prototype chrome + `SantaScene` SVG (kept for design parity)
- `assets/` — SVG-rendered stand-in photos + simulator captures (warm/neutral)
- `Camera Flight Check - Failure Screens.html` + `simple-failures.jsx` — designed failure states, not yet integrated

## Repository

Private GitHub repo since 2026-07-17: **https://github.com/JSAmedeo/camera-flight-check**. `main` = field-validated states; feature branches for risky work (`nikon-support` opened for Nikon hardware debugging). Vendored binaries (`camera-host/lib/`, `vendor/`) are committed deliberately — they're not on any package registry. `dist/`, `build/`, `node_modules/`, and `camera-host/bin|obj` are ignored; rebuild artifacts with `npm run package`.

## PhotoFlow Convergence (strategic, decided 2026-07-14 sanity check)

PhotoFlow Desktop (sibling repo) is Tauri v2 + React 18 + TypeScript + Vite and is the user's main operational app; this utility may become a module of it. Assessment: **`CameraHost.exe` and the correction math transfer unchanged** (helper becomes a Tauri sidecar); the Electron shell and Babel-runtime JSX would be discarded/ported (~3–5 days mechanical). Consequence: treat Electron as scaffolding — validate hardware in it, don't polish it further. Open decision (user's): merge into PhotoFlow vs. remain a separate pre-RPS utility. Related synergy: PhotoFlow's Python enhancement worker corrects photos post-capture against a reference profile; a good grey-card capture could seed that profile.

## Open Items

1. **Real-person grey-card test** (T7 on M) — collect: WB preset chosen, over/under-correction of the retake (tunes the 0.6 warmth exponent), WB vocabulary
2. **"Strongly cool on WB Shade" anomaly** from field runs — Shade should skew warm, not cool. 2026-07-15 mitigation: tolerances raised (EV 1.0 stop per user, cast 0.3/0.6) and a clipping guard added (≥20% near-clipped pixels → "too bright to judge color", WB untouched) — near-clipping was the prime suspect for phantom casts (field card read bright even at f/14 ISO 100). If false casts persist below clipping, persist calibration photos next to the run log for debugging
3. **Nikon validation** — first real-hardware sessions 2026-08-17/18, D3400 on the bench. **Full camera-host pipeline confirmed working**: `detect`, `settings`, `capture` (real JPEG transferred, correct EXIF/dimensions), and `set` (wrote WB → Daylight and ISO → 400, both confirmed on re-read, then reverted cleanly) all work against real hardware. Fixed: settings-read race (see Phase 4 details) — `settings` now waits for WB + image-quality, not just ISO, before returning; confirmed correct on real hardware (mode A/M, WB Auto, no false "Auto dial" warning). Also corrected an assumption: the D3400 loads via `NikonD600Base`, not the raw generic `NikonBase` fallback — likely true for other D3xxx/D5xxx bodies too, needs confirming per model. The "Device not ready" capture error from the first session turned out to be a near-dead battery (Nikon bodies block shutter release below some charge threshold) — resolved itself once recharged; not a code issue. **2026-08-18: full app-driven grey-card calibration run passed** — user ran the real Camera step end-to-end on the D3400 (not just protocol probes): camera identified, clean communication throughout, grey-card analysis computed new settings and applied them on the camera successfully. Still open: what WB preset it landed on / whether the correction over- or under-shot (the same follow-up questions as the pending Canon real-person test — see item 1), and validation on any Nikon body besides the D3400.
4. **WB calibration** — tune exponent + `WB_KELVIN` from field captures; consider Kelvin WB (`Color Temperature` mode) where bodies support it; Picture-Style/saturation control would improve the "over saturated" QA fix
5. **Dev HUD** — remove/hide/gate before operator rollout (still bypasses step gates)
6. **Failure screens** — wire `simple-failures.jsx` designs into real failure paths
7. **RPS handoff** — "Close Utility / Open RPS" releases + closes; actually launching RPS needs its exe path
8. **API posting** of `check-runs.jsonl` (schema is ready); consider a `check_abandoned` event for mid-check exits
9. **QC Dashboard upload** of the test photo — future phase
10. **digiCamControl licensing** — review before wide redistribution (shipping its 2.1.7 DLLs + Canon EDSDK 13.x)
11. **Code signing** — kills the SmartScreen warning; Squirrel also enables auto-update later
12. **CameraHost orphan protection** — named mutex + kill-orphans-at-startup if stale processes keep biting
13. Real design-project photo assets — manual browser export if the SVG stand-ins aren't acceptable
