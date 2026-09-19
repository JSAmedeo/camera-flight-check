# Design Snapshot — 2026-09-19

Captured after the colorway/radius-token refinement passes and the full
Help Config / Settings-password / App Defaults / Skip Reasons admin
overhaul (see CLAUDE.md § Current Focus and CONTEXT.md's matching
2026-09-14–19 phase-history entry for the narrative). Reflects
`simple-styles.css`, the local `<style>` block in `Camera Flight Check.html`,
and `main.js` → `defaultSettings()` as of this date. As with the prior
snapshot: source of truth is always the CSS/JS files — treat this as a
reference/diff point, not a spec to hand-maintain forward. The previous
snapshot is archived at `DESIGN-SNAPSHOT-2026-09-03.md` (marked stale).

**Everything below this line describes the working tree — none of it is
committed yet** (sitting on top of `9f7037b`, branch `ui-revamp`), and none
of it has been validated against real camera hardware.

## App identity

- Title: **"Pre-Flight Ops Check"** (corner brand mark, orange rounded-square
  camera icon, gradient `--accent → --accent-2`)
- Steps: Welcome → Set Checklist → Camera → Test photo → Done — on the Done
  screen itself, all five step-dots render as green checkmarks (no lingering
  orange "current step" 5)

## Color palette (`simple-styles.css :root`)

Values changed across the colorway pass; recorded here as-is, not diffed
line-by-line against the 2026-09-03 snapshot.

### Backgrounds
| Token | Value | Used for |
|---|---|---|
| `--bg` | `#202634` | Outermost app shell |
| `--bg-chrome` | `#202634` | Header (`.s-top`) and footer (`.s-foot`) — now the same value as `--bg`, not a lighter chrome tone |
| `--bg-body` | `#343945` | Main scrollable content area (`.s-body`) |
| `--bg-soft` | `#202634` | Overlay preview boxes, greycard demo stage |
| `--card` | `#252c3b` | Default card/button/input surface |
| `--card-2` | `#293140` | Hover state for cards/buttons |
| `--card-soft` | `#202634` | Recessed panels, needs-box, checklist groups, Help Config entry boxes |
| `--line` | `#3b4557` | Default borders |
| `--line-soft` | `#343d4d` | Subtler dividers |

### Text
| Token | Value |
|---|---|
| `--text` | `#f3f5f8` (primary) |
| `--text-2` | `#b3bac7` (secondary/body) |
| `--muted` | `#858fa0` (labels, captions) |
| `--dim` | `#646d7c` (least prominent) |

### Brand accent (orange — "current task", section headers, icons, focus rings)
| Token | Value |
|---|---|
| `--accent` | `#f36b21` |
| `--accent-2` | `#ff7a2f` |
| `--accent-rgb` / `--accent-2-rgb` | `243, 107, 33` / `255, 122, 47` |
| `--accent-soft` | `rgba(var(--accent-rgb), 0.12)` |

`--accent-2` is now also the color of every admin Settings section `<h3>`
(`.s-settings-section h3`) — a late addition so subsections read more
prominently than the earlier plain muted-gray headers.

### Primary button (green — forward/success actions)
| Token | Value |
|---|---|
| `--btn-primary` | `#18a957` |
| `--btn-primary-hover` | `#1db963` |
| `--btn-primary-pressed` | `#128044` (new — active/pressed state added this round) |
| `--btn-primary-rgb` | `24, 169, 87` |

### Status colors
| Token | Value |
|---|---|
| `--pass` | `#18a957` — same value as `--btn-primary` today, kept as a separate token on purpose (status semantics vs. button semantics shouldn't be coupled even when they coincide) |
| `--warn` / `--warn-hover` / `--warn-pressed` | `#dfaf18` / `#f0c239` / `#b8890f` — hover/pressed are new; `--warn` now also backs the entire `.s-btn--warn` family (retake-style buttons) and Help Config's Documentation color-coding |
| `--warn-rgb` | `223, 175, 24` |
| `--fail` / `--fail-rgb` | `#df4e4e` / `223, 78, 78` |

### Shape — centralized radius tokens (new since 2026-09-03)
| Token | Value |
|---|---|
| `--radius-sm` | `8px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `12px` |
| `--radius-xl` | `14px` |
| `--radius-pill` | `999px` |

Replaces the old ad-hoc 4/6/7/8/9/10/12/13px scale — every border-radius in
the app now references one of these five tokens.

### Typography
- Font stack unchanged: `"Geist", "Söhne", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`
- `.s-h1` 44px/600, `.s-h1--small` 36px, `.s-h1--xs` 28px
- `.s-lede` 18px, `--text-2`, max-width 56ch

## Layout shell

- `.s-top` 72px / `.s-foot` **110px** (grew from a 2-slot flex row to a true
  3-column CSS grid — `grid-template-columns: minmax(0,1fr) auto minmax(0,1fr)`
  — so the center primary-action slot stays visually centered regardless of
  what's in the side slots, e.g. Welcome's location/clock text on the left
  with nothing on the right)
- `.s-body`: flex column, centered, `--bg-body`, 28px padding
- `.s-screen`: max-width 880px (`--wide` variant 1080px)
- Window chrome unchanged: frameless, 9px corner radius, draggable header

## Buttons

| Class | Height | Notes |
|---|---|---|
| `.s-btn` (base) | 64px | `--card` bg, `--line` border, `--radius-md` |
| `.s-btn--primary` | 64px | Green, white text, pressed state added |
| `.s-btn--warn` | 64px | **New family** — amber/black, used for every retake-style action (grey-card redo, "Retake photo", per-item Set Checklist skip context) |
| `.s-btn--xl` | 76px | **Fixed width 260px** (was auto-width + padding) — every hero CTA (Start, Take Photo, Continue, paired retake/primary buttons) is now the same size everywhere; longer labels (e.g. "Redo grey card calibration") wrap to a second line within that width instead of stretching the button |
| `.s-btn--ghost` | 64px | Transparent, `--line` border, `--text-2` |
| `.s-btn--back` | 52px | Transparent, no border, `--muted` |
| `.s-btn--skip` | 52px | Quietest control on screen |
| `.s-btn--sm` | 24px | **Shrunk from 34px** — Help Config rows, General-tab compact fields |
| `.s-qa-skip-continue` | 42px | **New** — dashed border, muted text; the Test Photo QA "Skip and continue" escape hatch, styled to read as an alternate path rather than a Yes/No peer |

## Key components

- **Settings modal** (`.s-settings-card`): still 16:10 / `width:min(1040px,92%)` / `max-height:800px` for most groups, but **`.s-settings-card--wide`** (`width:min(1320px,94%)`, `aspect-ratio:auto`, `height:min(640px,88vh)`) kicks in specifically for the Help Config group, which now needs room for two side-by-side columns. Nav is down to **4 groups**: General, Camera limits, Test-photo overlay, Help Config (RPS launch was absorbed into General as its own subsection, see below).
- **General tab subsections** (each with an `--accent-2`-colored header, all condensed to ~28px input rows instead of the 56px hero-input default): Location & Station → **File Output Paths** (three folders — Completion Logs, Test Photos, Diagnostics — each with a left-side Browse/Change-folder button) → **Skip Reasons** (prompt toggle + full add/remove/edit reason list) → **App Defaults** (exit-app toggle with an executable path + nameable app-name field, plus the default video player setting as its second item) → **Settings password** (enable toggle + password field, reveal-toggle only while no password yet exists).
- **Settings password gate**: renders *inside* `.s-settings-content-wrap` as `.s-gate-inline` (`position:absolute; inset:0` relative to that wrapper, semi-transparent dark fill, no `backdrop-filter`) — not a full-viewport overlay. This is deliberate: a full-viewport gate's own `backdrop-filter` blur would blur the "Application Settings" title too, regardless of z-index (see CLAUDE.md gotcha #20). The gate's own card is `.s-gate-card` (`width:min(400px,100%)`, plain bordered card, no flex/min-height baggage inherited from `.s-help-card`).
- **Help Config** (admin editor, `.s-help-config-cols`, 2-column grid): Documentation (left) and Contacts (right), each entry a full bordered box (`.s-help-edit-row` — border + `--card-soft` background + radius, not just a bottom divider like before) with ▲/▼ reorder buttons, a "Change Order" hint label, and a red-tinted (`.s-btn--danger`) Remove pinned to the row's right edge via `margin-left:auto`. New items prepend to the top of their list.
- **Need Help popup** (operator-facing, `.s-help-cols`): mirrors the admin layout — Documentation (amber `.s-help-col-title--doc`) and Contacts (green, via `.s-help-contact-title`) as two columns. The card (`.s-help-card`) has `min-height:460px; max-height:780px` and grows with content up to that cap before `.s-help-col-list` takes over per-column scrolling. Header bullets are a real `<ul>` (`.s-help-list`, dot-bullet style) instead of `<br>`-separated text, with a `.s-help-hr` divider between the header and the columns.
- **Set Checklist cards** (`.s-card--checklist`): unchanged 3-column grid, but each card now has a second bottom-corner control — `.s-card-skip` ("Skip this step", bottom-right, mirroring "More info" bottom-left). A skipped card gets `.s-card--skipped` (amber tint, matching `.s-card--on`'s green-tint pattern) and the check-badge shows the skip icon instead of a checkmark. Continue gates on every card being checked *or* skipped.
- **Grey-card region select** (`.s-selbox` + new `.s-selbox-btn`): the drawn/tapped box no longer auto-submits. It persists with two 28px circular badges centered on its left edge — `.s-selbox-btn--confirm` (green, top) and `.s-selbox-btn--discard` (red, bottom) — since `.s-selbox` itself is `pointer-events:none` (a pure visual outline), the badges need their own `pointer-events:auto`. A 4th instructional bullet ("Happy with the box?") was added to the select screen, second-to-last, explaining the two badges.
- **Test Photo QA cards** (`.s-qa-card`): unchanged pending/active/done progression, but the colors card's "Yes" chip (`.s-qa-chip--yes`) is now green-tinted *by default*, not only when selected, with a `.s-qa-divider` (1px vertical line) separating it from the fix chips. Any question that fails once and is retaken grows a `.s-qa-skip-continue` button on its next showing.
- **Skip-reason modal** (`.s-skip-card` modifier on the shared `.s-info-card`): reasons are now a vertical list of full-width radio-style rows (`.s-skip-reason` + `.s-skip-reason-dot`) instead of a wrapping row of chips — scales to an admin-editable, potentially-longer list. The "Other" free-text field is a `<textarea>` (`.s-skip-other`, 2 lines tall, full width) instead of a single-line `<input>`. Title and row text are smaller (19px / 14px) than the shared-class defaults.
- **Welcome "what you'll need" list** (`.s-needs-box`): the "Character in the chair" item now has a `.s-need-sublist` (two dot-bulleted lines) instead of one run-on sentence; the "Can't find your grey card?" trigger moved from a barely-visible `.s-refresh-btn` ghost link to a warm bordered `.s-tip-btn` pill.
- **Framing/center guide overlay**: unchanged from 2026-09-03 (same baseline transform, same fallback SVG).
- **Found/Fixed summary** (`.s-summary-grid`): unchanged layout; copy changed — "not fixed" rows now read "not changed" and no longer suggest flagging the issue to a lead (see strings.js `castNotFixed`/`brightnessNotFixed`).

## Icon set (`SI` object in `simple-app-bundled.jsx`)

Added since 2026-09-03: `file`, `link`, `chevronUp`, `chevronDown`, `lock`.
Full current set: `check`, `arrow`, `back`, `help`, `skip`, `pin`, `gear`,
`camera`, `cap`, `pole`, `plug`, `bolt`, `chair`, `broom`, `router`,
`webcam`, `framing`, `backdrop`, `trophy`, `warn`, `shutter`, `retake`,
`info`, `close`, `phone`, `mail`, `file`, `link`, `chevronUp`,
`chevronDown`, `lock`.

## Header/footer control order

Unchanged: simulator badge (if applicable) → **Get help** → **Settings
(gear)** → minimize → close.

## Screens (in flow order)

1. **Welcome** — unchanged structurally; "what you'll need" sub-bullet and tip-button restyle noted above.
2. **Set Checklist** — 6-card grid, now with per-card skip (see above).
3. **Camera** — sub-stages `auto` → `shoot` → `select` → `applied`; `select` stage's box now needs explicit confirm (see above).
4. **Test photo** — sub-stages `aim` → `review`; `review` stage's three QA cards can each grow a skip-and-continue escape hatch.
5. **Done** — button reads `"Finish and Launch {rpsAppName}"` or `"Finish and Close"` depending on whether an exit app is configured; all step-dots green on arrival.

## Settings defaults (`main.js` → `defaultSettings()`)

```js
{
  location: { number: "", name: "", station: "Camera" },
  paths: {
    completionLogs: "C:\\preflight-ops-check\\Logs",
    testPhotos: "C:\\preflight-ops-check\\Photos",   // config-only, nothing writes here yet
    diagnostics: "C:\\preflight-ops-check\\Diagnostics",
  },
  skipReasonPrompt: true,
  skipReasons: ["Running late", "Equipment issue", "Other"],
  cameraLimits: { allowedWb: null, isoMin: null, isoMax: null, apertureMin: null, apertureMax: null },
  overlay: { offsetXPct: 0, offsetYPct: 9, scalePct: 87, customImagePath: null },
  rpsLaunchEnabled: true,
  rpsPath: "C:\\CentricsRPSClient\\bin\\CentricsRPSClient.exe",
  rpsAppName: "RPS",
  helpContacts: [
    { title: "District Manager", description: "", phone: "(xxx) xxx-xxxx", email: "" },
    { title: "Technical Support", description: "", phone: "(855) 925-4546", email: "" },
  ],
  helpDocs: [
    { name: "Printer Loading Video", localFile: "C:\\Options\\DNP-DS620A_Media_Loading.mp4", externalUrl: "" },
    { name: "System Setup & RPS Help / Training", localFile: "C:\\Options\\RPS Help and Training.html", externalUrl: "" },
  ],
  videoPlayerPath: "",
  settingsPasswordEnabled: true,
  settingsPassword: "help123",
}
```

`dataDir` (single folder, 2026-09-03 shape) no longer exists — replaced by
the three-way `paths` object above. Any code or docs still referencing
`settings.dataDir` is stale.
