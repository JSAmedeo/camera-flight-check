# REMEDIATION-PLAN.md — Camera Flight Check

**Source:** external code review of `JSAmedeo/camera-flight-check` @ `dc47b99` (v1.0.1)
**Audience:** coding agent working in the repo (read `CLAUDE.md` and `CONTEXT.md` first)
**Status:** CFC-01 closed (repo private, internal-only deployment confirmed).
CFC-02 deferred. CFC-05 withdrawn — station/location identity is handled outside
this code path; the ID is retired, not reusable. Nothing else started.

---

## How to use this document

Work the tranches in order. T0 and T1 are the ones that should land before the
real-person grey-card test; T2 unblocks the WB anomaly hunt; T3 and T4 are quality
work that can follow.

Each item has a stable ID (`CFC-nn`). Check items off in place and leave the
notes — this file is the running record until the work is done.

**Conventions that still apply** (from `CLAUDE.md` — do not violate them while
doing this work):

- All operator-facing copy goes in `strings.js` as `S.*` keys. Never hardcode UI
  text in JSX. New strings need new keys.
- `camera-host/` must stay **.NET 4.8 x86** — the EDSDK natives are 32-bit.
- Electron is scaffolding. Don't deepen Electron-specific investment. The
  keepers are `CameraHost.exe` and the grey-card math; prefer changes that keep
  those shell-agnostic.
- Bump `version` in `package.json` for every field drop so installs and logs
  stay traceable.
- Verify visually with real screenshots of the running app, not just green
  builds (`--verify --simulate --screenshot=<path>`; delete `__verify.html`
  after; watch for orphaned `CameraHost.exe`).

**Line numbers** are from `dc47b99` and will drift as you edit. Search for the
quoted code instead of trusting the number.

---

## Tranche 0 — Licensing (no code, low urgency now)

### CFC-01 — Canon EDSDK binaries in the repo ✅ RESOLVED

**Status:** repo made private, 2026-09-19. No further action on the repo itself.

Recorded for context, because the underlying obligation hasn't disappeared — it
has just moved from the repo to the deployment path:

The vendored EDSDK binaries (`camera-host/lib/EDSDK.dll`, `EdsImage.dll`,
`Canon.Eos.Framework.dll`) arrived via the digiCamControl 2.1.7 installer rather
than through a Canon developer agreement of your own. Canon's developer terms do
permit distributing the SDK DLLs as part of your own Developer Software, but
that path assumes you accepted Canon's agreement, sublicense end users under an
EULA carrying the same restrictions, and reproduce Canon's notices and
RESTRICTED RIGHTS text.

A private repo removes the "published to the world" problem entirely. What
remains is a question about **where the installer goes** — and that question is
now answered:

> **Decision (John, 2026-09-19):** the software is company-owned and deployment
> is limited to internal Cherry Hill systems for the foreseeable future. Stations
> are company-operated, so this is internal use, not distribution. **No action
> required.** If the product is ever monetized or shipped outside the company, a
> Canon developer agreement gets pursued at that time — this item reopens then,
> together with CFC-02.

For whoever reopens it: the trigger is an installer reaching a party that isn't
Cherry Hill — franchise operators, host venues, or an external customer. Company
staff installing it on company stations is not that trigger, however many
venues are involved. Applying for a Canon developer agreement is free, and would
also help with the EDSDK version treadmill (you're pinned to 13.18.40 because
2016-era builds predate the T7 — gotcha 4).

**Note for whoever builds the packager next:** `camera-host/lib/` stays vendored
on purpose (the `.gitignore` comment block is correct as written). Don't "fix" it
by fetching from SourceForge at build time; a private repo makes that
unnecessary complexity.

---

### CFC-02 — No LICENSE and no third-party notices ✅ DONE (README/LICENSE/notices), licensing obligation still deferred

**Severity:** low — the distribution-triggered obligation is still **deferred**
under the CFC-01 decision; recorded here anyway per the item's own reasoning
("much easier to assemble now... than the day someone asks whether this can
ship")
**Files:** `LICENSE`, `THIRD-PARTY-NOTICES.md`, `README.md` — all added 2026-09-19

**Status:** all three files exist now.

- `LICENSE` — "Copyright (c) 2026 Cherry Hill Programs. All rights reserved,"
  matching the internal-only decision from CFC-01.
- `THIRD-PARTY-NOTICES.md` — full inventory of every file in `camera-host/lib/`
  and `vendor/`. A few corrections/additions versus this plan's original known-so-far
  list, found while actually reading the `lib/` folder rather than working from
  memory:
  - `PortableDeviceLib.dll` — treated as part of the same digiCamControl/MIT
    distribution as `CameraControl.Devices.dll` (ships from the same 2.1.7
    installer), not independently verified against a separate upstream repo.
  - `Interop.PortableDeviceApiLib.dll` / `Interop.PortableDeviceTypesLib.dll` —
    these weren't in the plan's list at all. They're auto-generated COM interop
    stubs over Windows' own `PortableDeviceApiLib`/`PortableDeviceTypesLib`,
    not third-party application code — noted as Microsoft Windows SDK terms,
    not MIT/LGPL.
  - `log4net.dll` — Apache License 2.0 (the plan left this as "inventory and
    confirm"; now confirmed).
  - VC++140 runtime DLLs — noted explicitly as Microsoft's own Redistributable
    EULA, a separate license family from the MIT/LGPL/Apache entries, not
    lumped in with them.
  - Geist font — SIL OFL 1.1 as the plan guessed, but flagged **unverified**:
    no license file is vendored alongside the `.woff2` files in this repo, so
    this is believed correct, not confirmed from a source in-repo.
- `README.md` — written for the "colleague you grant repo access to next
  season" audience the plan describes: what it is, requirements, quick start
  (`npm install` → `npm run sim`), project layout, build/package commands, and
  a guide to which of the other docs (`CLAUDE.md`/`CONTEXT.md`/
  `DESIGN-SNAPSHOT.md`/`DEPLOY.md`/this file) to read for what.

**Still open, deferred under CFC-01 as before:** reproducing the actual MIT/
Apache/LGPL license *text* verbatim (a bundled `NOTICE` file or per-entry
text blocks) rather than just naming the license — that's the part that
actually matters on distribution, and per the plan's own framing there's no
urgency to do it while nothing ships outside the company. Re-verify the Geist
font license and the exact Accord.NET/log4net versions in use if this reopens.

**Verify:** every binary in `camera-host/lib/` and `vendor/` appears in
`THIRD-PARTY-NOTICES.md` with a named license. ✅ confirmed — cross-checked
the file's tables against a fresh `ls`/`find` of both directories.

---

## Tranche 1 — Operator-safety blockers (before the real-person test)

### CFC-03 — Global keyboard handler bypasses every step gate

**Severity:** high
**File:** `simple-app-bundled.jsx`, `SimpleApp` keyboard effect (~line 1877)

```js
if (e.key === "ArrowRight" || e.key === "Enter") {e.preventDefault();next();} else
if (e.key === "ArrowLeft") {e.preventDefault();back();} else
if (e.key === "Escape") restart();
```

This is registered unconditionally — not behind a dev flag — and calls `next()`
directly, skipping every gate the screens enforce. An operator who presses Enter
out of habit advances past the walk-around or the camera check. Escape silently
discards the in-progress run (`restart()` clears `run` and `walkChecked`) with no
confirmation and no `check_abandoned` record.

This is the same class of problem as the dev HUD (open item #5 in `CONTEXT.md`)
but more likely to fire in the field, because it requires no deliberate action.

**Do:**

- Introduce one dev-mode flag and gate both this handler and `PrototypeHUD` on
  it. Suggested: `const DEV_MODE = new URLSearchParams(location.search).has("dev")
  || process.env.NODE_ENV !== "production"` — pick whichever mechanism you prefer,
  but it must be **off by default in packaged builds**.
- When `DEV_MODE` is off, remove `Enter`, `ArrowRight`, `ArrowLeft` and `Escape`
  from the global handler entirely. Do not merely re-gate them on step state;
  operators have no reason to drive this app from a keyboard.
- **Do not touch** the `WalkInfoModal` keyboard handler (~line 611). That one is
  legitimate tutorial navigation, correctly scoped, and already shields the
  global handler via capture-phase `stopPropagation`. Verify it still works once
  the global handler is gated.

**Verify:** packaged build — press Enter, arrows and Escape on the walk-around
screen with checks incomplete; the app must not advance or reset. Dev build with
the flag on — HUD and keyboard nav both still work.

---

### CFC-04 — Grey-card region selection writes to the camera with no confirmation

**Severity:** high
**File:** `simple-app-bundled.jsx`, `RegionSelect.up()` (~line 1144) and
`ScreenCamera.onRegion` (~line 718)

`up()` calls `onDone(b, imgRef.current)` immediately on mouse-up. A single tap
becomes an 8%-of-frame square wherever the finger landed, and `onRegion` runs
`analyzeGreyCard` → `planCorrections` → `cam.set(plan)` — physically changing
ISO, aperture and WB on the body — before the operator ever sees what was
sampled. There is no undo.

This is also the leading suspect for the WB anomaly (see CFC-06): a tap that
catches backdrop or shadow beside the card produces a genuinely blue average,
and nothing in the current flow would reveal it.

**Do:**

1. **Split selection from commit.** `up()` sets the box and moves to a confirm
   sub-stage. Show the operator:
   - the cropped sampled patch, magnified
   - the measured values in plain English (existing "What we found" vocabulary —
     brightness in stops, colour cast, and a "too bright to judge" state)
   - two buttons: "Yes, fix my camera" / "Pick again"
   - copy in `strings.js` under a new `camera.select.confirm.*` group
2. **Add a sanity gate** before offering to commit. Refuse the sample and ask
   the operator to pick again when the patch can't plausibly be a grey card:
   - mean luma outside roughly 40–220 (8-bit)
   - `clipped >= CLIP_LIMIT` (already computed — currently only suppresses WB;
     here it should block the whole commit path with an explanation)
   - extreme channel spread, e.g. `max(R,G,B) / max(min(R,G,B), 1) > 2.5` — a
     real grey card can't be that saturated under any preset
   Each rejection needs its own reason string. Per the project's core UX
   principle, never leave a detected problem unexplained.
3. Keep `analyzeGreyCard` pure. The gate belongs in the calling screen, not in
   the math, so the math stays portable to PhotoFlow.

**Verify:** simulator run — tap on the dark background rather than the card; the
app must refuse with a reason and must not call `cam.set`. Tap correctly; the
confirm panel shows the patch and measurements before anything is written.

---

## Tranche 2 — Diagnostics (unblocks the WB anomaly)

### CFC-06 — "Strongly cool on WB Shade": the current hypothesis is wrong

**Severity:** medium — open item #2 in `CONTEXT.md`, and the shipped mitigation
does not address it
**Files:** `simple-app-bundled.jsx` (`analyzeGreyCard`, `ScreenCamera.onRegion`),
`main.js` (new IPC), `preload.js`

Clipping compresses the **highest** channel first. On a warm-rendered card that
is red, so as the region approaches clipping, mean R stops growing while mean B
keeps rising, and measured `R/B` falls **toward 1**. Fully blown, every channel
pins at 255 and the ratio is exactly 1. Clipping can therefore attenuate a warm
reading toward neutral — **it cannot mathematically push `R/B` below 1.** A
"strongly cool" reading (`R/B < 0.66`) has a different cause.

The `CLIP_LIMIT = 0.2` guard added on 2026-07-15 is still worth keeping (a
near-clipped card genuinely can't be trusted for colour) but it will not stop a
cool misreading, and treating the anomaly as solved would be a mistake.

**Remaining candidates, in order:**

1. **The sampled region was not the card.** Addressed by CFC-04.
2. **`settings.wb` was stale or wrong** when `planCorrections` read it. The whole
   "Shade should skew warm" premise depends on that value being live. The
   Refresh-settings button exists precisely because dial state drifts.

**Do — persist the evidence.** This is the highest-value change here; the
anomaly cannot be diagnosed from tolerance constants alone.

- Add a `calibration:save` IPC handler in `main.js` writing to
  `%APPDATA%\Camera Flight Check\calibrations\<runId>-<timestamp>/`:
  - the calibration JPEG as captured (the file path already comes back from
    `capture`, so copy it rather than re-encoding the data URL)
  - `analysis.json` — the selection box in both display and natural coordinates,
    raw `{r, g, b, clipped}` means, `evDelta`, `warmth`, the full `settings`
    object read immediately before analysis, the computed `plan`, and the
    `applied` / `rejected` result
- Gate it behind a config flag (default **on** during field validation, off
  later) and cap retention — keep the newest N runs, delete older directories on
  startup.
- Note in `DEPLOY.md` where the field tech can find these when reporting an
  incident.

**Verify:** one simulator run leaves a directory containing the JPEG and a
complete `analysis.json`. Confirm the retention cap actually deletes.

---

## Tranche 3 — Correction math

These are pure functions with no I/O. Do CFC-10 (tests) **first** so the
behaviour changes below are pinned, or at minimum alongside. This is the code
`CONTEXT.md` names as the long-term keeper through the PhotoFlow migration, so
it is the code most worth a safety net before it moves.

### CFC-07 — Estimate white balance in mired space, not as a Kelvin power law

**Severity:** medium
**File:** `simple-app-bundled.jsx`, `planCorrections` (~line 214)

```js
const estimatedK = currentK / Math.pow(analysis.warmth, 0.6);
```

This is multiplicative in Kelvin, but white-balance error is additive in
**mireds** (10⁶/K) — the reason WB filters are rated in mired shifts rather than
Kelvin. A 500K error at 7000K and a 500K error at 3200K are very different
corrections, so an exponent calibrated on Shade will misbehave on Tungsten.

Worked case: Shade (7000K, 143 mired) reading `warmth = 1.3` under flash. The
current formula returns ~5990K and picks Cloudy. The mired form with `k ≈ 100`
returns ~5500K and picks Flash.

**Do:**

```js
// WB error is additive in mireds (10^6/K), not multiplicative in Kelvin.
// k = mireds of apparent shift per stop of measured R/B imbalance.
// Calibrate from field captures (see CFC-06); k ≈ 100 is the starting estimate.
const MIRED_PER_STOP = 100;

const currentMired = 1e6 / (WB_KELVIN[settings.wb] || 5500);
const estimatedMired = currentMired + MIRED_PER_STOP * Math.log2(analysis.warmth);
```

Then pick the nearest preset **by mired distance**, not Kelvin distance:

```js
for (const wb of settings.wbValues || []) {
  const k = WB_KELVIN[wb];
  if (!k) continue;
  const d = Math.abs(1e6 / k - estimatedMired);
  if (d < bestDiff) { bestDiff = d; bestWb = wb; }
}
```

- Clamp `estimatedMired` to a sane range (roughly 100–350 mired, i.e.
  10000K–2850K) so a bad sample can't select an absurd preset.
- Keep `MIRED_PER_STOP` as a named constant beside `EV_TOLERANCE` et al., with
  the same "field-tuned" comment style, and add it to the gotcha-7 constants
  list in `CLAUDE.md`.
- This still needs exactly one field data point to calibrate, same as the 0.6
  exponent did — but it extrapolates correctly away from that point instead of
  only working near it.

**Verify:** unit cases in CFC-10, including the Shade/flash case above.

---

### CFC-08 — `nearestValue` measures distance linearly on logarithmic scales

**Severity:** low–medium
**File:** `simple-app-bundled.jsx`, `nearestValue` (~line 201)

ISO values and f-numbers are geometric scales, but the function compares
`Math.abs(n - target)`, which systematically mis-picks near midpoints and biases
the choice. Callers: the ISO pick and the aperture stop-down pick in
`planCorrections`.

**Do:** compare in log space.

```js
// ISO and f-numbers are geometric; compare in stops, not absolute units.
function nearestValue(list, target) {
  let best = null, bestDiff = Infinity;
  for (const v of list || []) {
    const n = parseFloat(v);
    if (isNaN(n) || n <= 0) continue;
    const d = Math.abs(Math.log2(n / target));
    if (d < bestDiff) { bestDiff = d; best = v; }
  }
  return best;
}
```

The `<= 0` guard also protects against `Math.log2(0)`. For aperture the same
function works — stops are `2 * log2(N)`, and the constant factor doesn't change
which candidate wins.

**Verify:** unit cases in CFC-10 for both ISO and aperture ladders, including a
geometric-midpoint target.

---

### CFC-09 — Average in linear space; document the tone-curve assumption

**Severity:** low
**File:** `simple-app-bundled.jsx`, `averageRegion` (~line 166),
`analyzeGreyCard` (~line 185)

`averageRegion` sums gamma-encoded bytes and `analyzeGreyCard` linearizes the
mean afterwards. For a flat card the error is negligible; for a region with any
specular highlight it biases both Y and the channel ratios in the direction that
matters for CFC-06.

**Do:**

- Linearize per pixel inside the accumulation loop (`Math.pow(v/255, 2.2)`), and
  return linear means. Use a 256-entry lookup table — the loop runs over every
  pixel of a large natural-resolution crop and `Math.pow` per channel per pixel
  is the hot path.
- Keep returning the 8-bit means too; the sanity gate in CFC-04 and the
  diagnostics in CFC-06 both want the encoded values.
- Update `analyzeGreyCard` to consume linear means directly and drop the
  now-redundant `srgbToLinear` calls there.
- Add a comment recording the known limitation: `evDelta` assumes the JPEG tone
  response is a pure 2.2 gamma, but Canon Picture Styles apply an S-curve, so
  there is a systematic offset. `EV_TOLERANCE = 1.0` currently swallows it. Do
  not attempt to model the S-curve — just make sure the next person knows the
  constant is approximate.
- Also fix the clamp bug in `mapRegionToNatural`: `w: Math.min(nw, box.w / scale)`
  clamps the width against the full image width rather than clamping `x + w` to
  the image bounds. Same for `h`.

**Verify:** CFC-10 cases with a synthetic flat patch (result unchanged within
tolerance) and a patch containing a blown highlight (result shifts, and in the
direction predicted).

---

### CFC-10 — Test the grey-card math

**Severity:** medium
**Files:** new `test/` directory, `package.json`

There are currently no tests and no CI. The functions in question are pure and
trivially testable, and they are the artifacts that survive the PhotoFlow
migration.

**Do:**

- Extract `srgbToLinear`, `averageRegion`, `analyzeGreyCard`, `nearestValue`,
  `planCorrections`, `WB_KELVIN` and the tolerance constants into a
  `grey-card.js` that works both as a browser global (for the Babel/UMD app) and
  under Node. Keep it **free of DOM and Electron dependencies** except the
  canvas read, which should be injected: have `analyzeGreyCard` take a
  `{ width, height, data }` pixel buffer rather than an `<img>` element, and move
  the canvas extraction into the screen component. This is the single biggest
  step toward the math being shell-agnostic for the Tauri port.
- Use `node --test` (built in — no new dependency, consistent with the
  no-build-step philosophy). Add `"test": "node --test test/"` to scripts.
- Fixture cases to cover:
  - neutral card, correct exposure → empty plan
  - warm card on Shade under flash → picks Flash, not Cloudy (CFC-07)
  - underexposed by 2 stops → ISO raised, aperture untouched
  - overexposed by 2 stops → ISO lowered, then aperture stopped down for the
    remainder; **never** opened up
  - ISO table containing the phantom T7 values (6/12/25/50) → clamped to 100+
  - `clipped >= CLIP_LIMIT` → WB untouched
  - cast below `CAST_TOLERANCE` → WB untouched
  - WB already at the extreme preset → plan omits `wb` so the UI emits a
    "found but not fixed" warning row (guards the core UX principle)
  - geometric-midpoint ISO and aperture targets (CFC-08)
- Add a minimal GitHub Actions workflow running `npm test` on push. Do not
  attempt to build `camera-host` in CI — it needs Windows and the 32-bit natives.

**Verify:** `npm test` passes; each of CFC-07/08/09 has at least one case that
fails against the old implementation.

---

## Tranche 4 — Performance and hygiene

### CFC-11 — Dead prototype code on the startup critical path

**Severity:** medium (cheap win on a known pain point)
**Files:** `Camera Flight Check.html`, `shared.jsx`, `screens/05-liveview.jsx`,
`simple-app-bundled.jsx`

`Camera Flight Check.html` loads `shared.jsx` (268 lines) and
`screens/05-liveview.jsx` (355 lines) as `type="text/babel"`, so both are
compiled in-browser at every launch. Nothing in the live app references
`SantaScene` or `LiveViewScreen`. `GreyCardDemo` in `simple-app-bundled.jsx` is
also unrendered, and `window.__resources.greyCard` exists only to feed it.

`CLAUDE.md` gotcha 16 notes that Babel compile competes with EDSDK startup on
real hardware. This is ~620 lines of that compile doing nothing.

**Do:**

- Remove both `<script type="text/babel">` tags for `shared.jsx` and
  `screens/05-liveview.jsx` and delete the "Reuse the existing SantaScene"
  comment above them.
- Delete `GreyCardDemo` and the `greyCard` entry in `window.__resources`.
- Keep the files on disk if you want design parity (`CONTEXT.md` lists them as
  kept deliberately) but stop loading them — and say so in `CONTEXT.md` § Key
  Files so the next reader doesn't think they're live.
- Also add `simple-failures.jsx` and `Camera Flight Check - Failure Screens.html`
  to the packager ignore list in `scripts/dist.js`; they ship today and aren't
  wired into anything (open item #6).

**Verify:** app renders identically; measure cold-start time before and after on
the field PC — this is the number worth writing down.

---

### CFC-12 — Precompile JSX at package time

**Severity:** medium
**Files:** `scripts/dist.js`, `Camera Flight Check.html`, `package.json`

Follow-on from CFC-11. `simple-app-bundled.jsx` is 1975 lines compiled by Babel
standalone on every launch, in front of the operator, competing with EDSDK init.

**Do:**

- Add a transform step to `scripts/dist.js`: run `@babel/core` over the JSX into
  a plain `.js` next to it, and have the packaged HTML load the compiled file
  with a normal `<script>` tag instead of `type="text/babel"`.
- Keep `npm start` on the Babel-standalone path so the no-build-step dev loop
  survives — that's an explicit stack decision in `CLAUDE.md`, and this change
  must not break it. Simplest approach: build the HTML variant in `dist.js`
  rather than maintaining two checked-in HTML files.
- `vendor/babel.min.js` can then be excluded from packaged builds.

**Verify:** packaged app has no `text/babel` scripts and no Babel in resources;
`npm start` and `npm run sim` still work unchanged from a clean checkout.

---

### CFC-13 — Capture payload and temp-file accumulation

**Severity:** medium
**Files:** `camera-bridge.js` (`fileToDataUrl`, ~line 168), `main.js` (~line 45),
`simple-app-bundled.jsx` (photo state)

A T7 fine JPEG is roughly 6–8 MB. `fileToDataUrl` does a synchronous
`readFileSync` plus base64 encode **on Electron's main process** — the same
thread servicing the window — then ships an ~10 MB string across IPC, which the
renderer holds in React state across retakes. Some of the "app feels frozen
during capture" surface area likely lives here.

Separately, `os.tmpdir()/camera-flight-check` is created but never cleaned. A
station running daily through a season accumulates every capture it ever took.

**Do:**

- Make `fileToDataUrl` async (`fs.promises.readFile`) so the main process isn't
  blocked during the encode.
- Better: register a custom protocol (`cfc-capture://`) or use a `file://` URL
  for the capture instead of a data URL, and drop the base64 round-trip
  entirely. **Check first** that the canvas pixel read in `averageRegion` isn't
  tainted — avoiding taint is the stated reason data URLs were chosen
  (`CONTEXT.md` § Phase 3), so this must be verified with an actual
  `getImageData` call before committing to it. If taint is a problem, keep data
  URLs and settle for the async read.
- Clear stale captures: on startup, delete files in the capture dir older than
  N days; on run completion, delete that run's captures unless CFC-06
  diagnostics are enabled for it.
- Make sure the renderer drops the previous photo's reference on retake so
  repeated retakes don't accumulate multi-megabyte strings.

**Verify:** simulator run with an artificially large capture file; window stays
responsive during capture. Temp dir does not grow across repeated runs.

---

### CFC-14 — Flat IPC timeout is too close to the worst-case command

**Severity:** low–medium
**Files:** `camera-bridge.js` (~line 11), `camera-host/Program.cs`

`REQUEST_TIMEOUT_MS = 40000` applies to every command, but `Settings()` on the
C# side can legitimately take `WaitForInit` (up to 15s) + the ISO-table poll (up
to 12s) + a storage read. Worst case brushes the ceiling. When it does, the
renderer gives up while the helper keeps working; the late reply is dropped
silently (`_onData` finds no pending entry) and any retry stacks a second command
behind the first in a sequential stdio loop.

**Do:**

- Per-command timeouts: `detect` short, `settings` medium, `capture` long
  (should exceed the helper's own 20s photo wait), `set` medium, `release`/`quit`
  short.
- Log dropped late replies in `_onData` rather than `continue`-ing silently —
  they're the signature of a timeout mismatch and belong in `camera-host.log`.
- Consider refusing to enqueue a duplicate in-flight command (a second
  `settings` while one is pending resolves to the same promise). This directly
  covers rapid Refresh-settings clicks.

**Verify:** force a slow `settings` in the simulator (add a delay env override);
the UI waits appropriately and the log shows no dropped replies.

---

### CFC-15 — Smaller items

| # | Item | File | Action |
|---|---|---|---|
| a | `taskkill /F /IM CameraHost.exe` kills every instance machine-wide | `camera-bridge.js` | Fine today. Revisit if PhotoFlow ever runs its own helper concurrently — a named mutex (open item #12) is the better long-term answer. |
| b | `restart()` doesn't reset `operator` | `simple-app-bundled.jsx` | Decide deliberately: keeping the name across restarts may be correct for back-to-back checks by one operator. Document whichever you pick. |
| c | No `check_abandoned` event | `simple-app-bundled.jsx`, `main.js` | Open item #8. Emit on `restart()` and on window close with a run in progress. |
| c2 | Run-log records carry no `appVersion` | `simple-app-bundled.jsx`, `main.js` | Add `appVersion` from `package.json` to `check_started` and `check_completed`. Addresses gotcha 16a — the stale-build day would have been visible in the log. Keep the schema additive. |
| d | `check-runs.jsonl` never rotates | `main.js` | Small file, but add the same 2MB rotation `camera-bridge.js` already uses for `camera-host.log`. |
| e | Operator names are PII | run log / future API | Before the API phase, decide retention and whether full names are needed or an employee ID would do. |
| f | No CSP in the HTML | `Camera Flight Check.html` | Low risk (fully local, `contextIsolation` on, `nodeIntegration` off) but a `default-src 'self'` meta tag costs nothing and documents the offline intent. |
| g | Unsigned builds / SmartScreen | packaging | Open item #11. Code signing also unlocks Squirrel auto-update, which would have prevented the stale-1.0.0 incident. |

---

## Suggested sequencing

| Order | Items | Gate |
|---|---|---|
| 1 | CFC-03, CFC-04 | **Before the real-person grey-card test** |
| 2 | CFC-06 | Same drop as (1) if possible — it's what makes the test produce usable evidence |
| 3 | CFC-10, then CFC-07, CFC-08, CFC-09 | After field evidence is in hand, so `MIRED_PER_STOP` gets calibrated rather than guessed |
| 4 | CFC-11, CFC-12, CFC-13, CFC-14 | Any time; CFC-11 is a 20-minute win |
| 5 | CFC-15 | Opportunistic |

CFC-01 is closed; CFC-02's licensing obligation is still deferred, but its
`README.md`/`LICENSE`/`THIRD-PARTY-NOTICES.md` pieces are done — see Tranche 0.

Bump `package.json` version for each field drop. Record what shipped in which
version in `CONTEXT.md` § Phase History so the "which build is the field machine
actually running" question (gotcha 16a) stays answerable.

---

## What this plan deliberately does not do

- **No Electron deepening.** Every item above is either shell-agnostic or a
  deletion. CFC-10's extraction of the math into a DOM-free module actively
  helps the Tauri port.
- **No changes to the design-derived UI structure**, screen flow, or the
  "What we found / What we fixed" card pattern. CFC-04 adds a confirm stage;
  everything else leaves the operator's path alone.
- **No Nikon work.** Open item #3 is a separate effort needing real hardware, and
  none of the above blocks or helps it. Note that CFC-04's sanity gate and
  CFC-07's mired model are both brand-agnostic and will apply unchanged when a
  Nikon body shows up.
