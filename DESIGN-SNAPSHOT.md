# Design Snapshot — 2026-09-03 (pre-colorway-change baseline)

Captured before making colorway/visual changes, so this state can be restored
or diffed against later. Reflects `simple-styles.css` and the local `<style>`
block in `Camera Flight Check.html` as of this date. Source of truth is
always the CSS files — treat this as a reference snapshot, not a spec to
hand-maintain going forward.

## App identity

- Title: **"Pre-Flight Ops Check"** (corner brand mark, orange rounded-square
  camera icon, gradient `#ea580c → #f97316`)
- Steps: Welcome → Set Checklist → Camera → Test photo → Done

## Color palette (`simple-styles.css :root`)

### Backgrounds
| Token | Value | Used for |
|---|---|---|
| `--bg` | `#171b24` | Outermost app shell (mostly covered by the three regions below) |
| `--bg-chrome` | `#242a38` | Header (`.s-top`) and footer (`.s-foot`) |
| `--bg-body` | `#454b60` | Main scrollable content area (`.s-body`) — the lightest of the three, intentionally softer/greyer than chrome |
| `--bg-soft` | `#1d222d` | Overlay preview boxes, greycard demo stage |
| `--card` | `#272e40` | Default card/button/input surface |
| `--card-2` | `#2f3749` | Hover state for cards/buttons |
| `--card-soft` | `#222836` | Recessed panels (placeholders, needs-box, checklist groups) |
| `--line` | `#3a4359` | Default borders |
| `--line-soft` | `#2f3749` | Subtler dividers |

### Text
| Token | Value |
|---|---|
| `--text` | `#f0f2f7` (primary) |
| `--text-2` | `#c2c9d6` (secondary/body) |
| `--muted` | `#8d97aa` (labels, captions) |
| `--dim` | `#5d6679` (least prominent — dots, disabled-ish) |

### Brand accent (orange — icons, focus rings, badges, non-button highlights)
| Token | Value |
|---|---|
| `--accent` | `#ea580c` |
| `--accent-2` | `#f97316` (hover/lighter variant) |
| `--accent-soft` | `rgba(234, 88, 12, 0.16)` |

### Primary button (green — scoped to `.s-btn--primary` only, independent of the orange brand accent)
| Token | Value |
|---|---|
| `--btn-primary` | `#15803d` |
| `--btn-primary-hover` | `#16a34a` |

### Status colors
| Token | Value |
|---|---|
| `--pass` / `--pass-soft` / `--pass-line` | `#22c55e` / `rgba(34,197,94,0.16)` / `rgba(34,197,94,0.4)` |
| `--warn` / `--warn-soft` | `#eab308` / `rgba(234,179,8,0.14)` |
| `--fail` / `--fail-soft` | `#dc2626` / `rgba(220,38,38,0.14)` |

### Typography
- Font stack: `"Geist", "Söhne", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif` (Geist vendored locally, offline-safe)
- Base body: 18px / 1.45 line-height / -0.005em letter-spacing
- Headings: `.s-h1` 44px/600, `.s-h1--small` 36px, `.s-h1--xs` 28px
- Lede paragraphs: `.s-lede` 18px, `--text-2`, max-width 56ch

## Layout shell

- `.s-top` (header) / `.s-foot` (footer): fixed 72px / 110px, `--bg-chrome`, 1px `--line-soft` border facing the body
- `.s-body`: flex column, `align-items:center; justify-content:center` (content vertically centered), `--bg-body`, 28px padding
- `.s-screen`: max-width 880px (`--wide` variant 1080px), 22px gap between children
- Window chrome: frameless, 9px corner radius on the outer shell, draggable header region

## Buttons

| Class | Height | Notes |
|---|---|---|
| `.s-btn` (base) | 64px | `--card` bg, `--line` border, 8px radius |
| `.s-btn--primary` | 64px | Green (`--btn-primary`), white text, soft green drop shadow |
| `.s-btn--xl` | 76px | Used for the main per-screen CTA (Start, Take Photo, Continue) |
| `.s-btn--ghost` | 64px | Transparent bg, `--line` border, `--text-2` |
| `.s-btn--back` | 52px | Transparent, no border, `--muted` |
| `.s-btn--skip` | 52px | Deliberately the quietest control on screen — transparent, `--dim` |
| `.s-btn--sm` | 34px | Compact variant (Need Help contact editor rows) |

Border-radius scale in general use: 4 / 6 / 7 / 8 / 9 / 10 / 12 / 13px depending on element size (buttons 6-9px, cards 8-10px, modals 12-13px). No sharp corners anywhere; `50%` circles and `999px` pills used for badges/dots/avatars.

## Key components

- **Settings modal** (`.s-settings-card`): 16:10 aspect-ratio box, `width:min(1040px,92%)`, `max-height:800px`, `overflow:hidden` (so it can never overflow the window — the internal body scrolls instead). Left sidebar nav (`.s-settings-nav`, 176px fixed) with 5 groups: General, Camera limits, Test-photo overlay, RPS launch, Need Help contacts. Active nav item highlighted with `--accent-soft` background + orange left accent.
- **Set Checklist cards** (`.s-card--checklist`): 3-column grid, 6 cards, icon + label + inline bullets + fixed-position "More info" button (bottom-left, same spot regardless of bullet count).
- **Grouped instructional lists** (`.s-checklist--grouped`): single bordered box with thin dividers and a small solid (non-clickable-looking) dot — used on Camera calibration, grey-card select, and Take Test Photo screens so read-only tips never look like tappable checkboxes. Contrast with the real, clickable Set Checklist items which use a bordered circle dot.
- **Welcome "what you'll need" list** (`.s-needs-box`): same grouped-box treatment, single box with row dividers.
- **Framing/center guide overlay**: bundled PNG at `assets/framing-guide-default.png`, rendered via `CenterGuide()` in `simple-app-bundled.jsx`. Falls back to a hand-drawn cyan dashed SVG silhouette if the PNG ever fails to load. Default transform baseline (the sliders' "zero" position): `offsetXPct: 0, offsetYPct: 9, scalePct: 87` — tuned so the guide's head sits ~40% down the frame and feet ~90% down. Settings sliders display this baseline as `(0%)` on all three axes and adjust as a delta from it (±30 for offset, ±50 for scale), not as raw absolute values.
- **Help modal**: contact list is plain text (not `<a href="tel:">`/`mailto:` links) — phone/email are informational only, not clickable.
- **QA review cards** (`.s-qa-card`): pending (45% opacity) → active (orange ring) → done (green border) progression.
- **Found/Fixed summary** (`.s-summary-grid`): two-column card layout on the "camera is ready" screen, headed "What we found" / "What we changed".

## Icon set (`SI` object in `simple-app-bundled.jsx`)

Inline SVG, `stroke="currentColor"`, mostly 1.8-2px stroke width: `check`, `arrow`, `back`, `help`, `skip`, `pin`, `gear` (real multi-tooth cog, not the old spoke/sun design), `camera`, `cap`, `pole`, `plug`, `bolt`, `chair`, `broom`, `router`, `webcam`, `framing`, `backdrop`, `trophy`, `warn`, `shutter`, `retake`, `info`, `close`, `phone`, `mail`.

## Header/footer control order

Top-right, left to right: simulator badge (if applicable) → **Get help** → **Settings (gear)** → minimize → close. (Settings sits to the right of Get Help, not the left.)

## Screens (in flow order)

1. **Welcome** — getting-started splash (no name entry). Location pin + live clock in the footer; "what you'll need" grouped list in the body; "Can't find your grey card?" link on the Grey card row opens the shared grey-card help modal.
2. **Set Checklist** — 6-card grid (Set is clean, Router, Webcam/Stura camera, Camera connected, Framing, Flash).
3. **Camera** — sub-stages `auto` → `shoot` → `select` → `applied`. Calibration instructions box now sits above the camera-settings table (reordered for prominence); grey-card drag screen has settings moved below the image and a grouped instructions box.
4. **Test photo** — sub-stages `aim` → `review`. Same grouped-instructions/settings-below-image treatment as the grey-card screen.
5. **Done** — closes utility, launches RPS (with a "RPS not found" fallback message if the configured executable is missing).

## Settings defaults (`main.js` → `defaultSettings()`)

```js
{
  location: { number: "", name: "", station: "Camera" },
  dataDir: "C:\\preflight-ops-check\\Logs",
  skipReasonPrompt: true,
  cameraLimits: { allowedWb: null, isoMin: null, isoMax: null, apertureMin: null, apertureMax: null },
  overlay: { offsetXPct: 0, offsetYPct: 9, scalePct: 87, customImagePath: null },
  rpsPath: "C:\\CentricsRPSClient\\bin\\CentricsRPSClient.exe",
  helpContacts: [
    { title: "District Manager", description: "", phone: "(xxx) xxx-xxxx", email: "" },
    { title: "Technical Support", description: "", phone: "(855) 925-4546", email: "" },
  ],
}
```
