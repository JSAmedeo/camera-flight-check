// Camera Flight Check — Simple Mode
// One task per screen. Plain English. Big buttons.

const SI = {
  check: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5L20 6" />
    </svg>,

  arrow: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>,

  back: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>,

  help: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 014.8 1c0 1.5-2.3 1.7-2.3 3.5" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" />
    </svg>,

  skip: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 6l7 6-7 6" />
      <path d="M14 6l7 6-7 6" />
    </svg>,

  pin: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-7.58 7-12A7 7 0 0 0 5 9c0 4.42 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>,

  gear: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>,

  camera: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M8 18h9l4-6h22l4 6h9v32H8z" />
      <circle cx="32" cy="34" r="11" />
      <circle cx="32" cy="34" r="5" />
      <rect x="48" y="22" width="6" height="3" rx="1" fill="currentColor" />
    </svg>,

  cap: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="32" cy="32" r="20" strokeDasharray="3 4" />
      <path d="M20 20l24 24" strokeWidth="3" />
      <circle cx="32" cy="32" r="6" strokeDasharray="2 3" />
    </svg>,

  pole: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 8v44" />
      <rect x="22" y="20" width="20" height="14" rx="2" />
      <circle cx="32" cy="27" r="4" />
      <path d="M22 56h20" />
      <path d="M28 52l-2 4M36 52l2 4" />
    </svg>,

  plug: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M22 8v10M42 8v10" />
      <rect x="16" y="18" width="32" height="14" rx="3" />
      <path d="M32 32v8c0 4-4 6-8 6h-6" />
      <circle cx="14" cy="46" r="4" />
    </svg>,

  bolt: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M36 6L16 36h14l-4 22 22-30H34z" />
    </svg>,

  chair: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M18 14h28v22H18z" />
      <path d="M18 36h28M18 36v18M46 36v18" />
      <path d="M14 40h6M44 40h6" />
    </svg>,

  broom: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M40 6L24 22" />
      <path d="M20 18l6 6L18 44l-10-2 6-10z" />
      <path d="M14 38l8 8" />
    </svg>,

  router: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <rect x="10" y="34" width="44" height="16" rx="4" />
      <circle cx="20" cy="42" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="28" cy="42" r="1.6" fill="currentColor" stroke="none" />
      <path d="M32 34V22M32 22c-6 0-10-4-10-4M32 22c6 0 10-4 10-4" />
      <path d="M24 14c4-4 12-4 16 0" />
    </svg>,

  webcam: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="32" cy="26" r="14" />
      <circle cx="32" cy="26" r="5" />
      <path d="M20 44h24M26 44l-3 8M38 44l3 8" />
    </svg>,

  framing: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 20V12a2 2 0 012-2h8M54 20V12a2 2 0 00-2-2h-8M10 44v8a2 2 0 002 2h8M54 44v8a2 2 0 01-2 2h-8" />
      <circle cx="32" cy="32" r="9" />
    </svg>,

  backdrop: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 44} height={p.size || 44} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 10h44v34H10z" />
      <path d="M16 10v34M28 10v34M40 10v34M52 10v34" />
      <path d="M6 54h52" />
    </svg>,

  trophy: (p = {}) =>
  <svg viewBox="0 0 64 64" width={p.size || 70} height={p.size || 70} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M16 8h32v14c0 8-7 14-16 14s-16-6-16-14V8z" />
      <path d="M16 14h-6v6c0 4 3 7 7 8M48 14h6v6c0 4-3 7-7 8" />
      <path d="M26 36h12v8H26zM22 44h20l-1 8H23z" />
    </svg>,

  warn: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v5M12 18v.5" />
    </svg>,

  shutter: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    </svg>,

  retake: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <path d="M21 12a9 9 0 11-3-6.7" />
      <path d="M21 4v5h-5" />
    </svg>,

  info: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.6" r="0.9" fill="currentColor" />
    </svg>,

  close: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>,

  phone: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>,

  mail: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>,

  file: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M14 3v4h4" />
    </svg>,

  link: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1" />
    </svg>,

  chevronUp: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 15l6-6 6 6" />
    </svg>,

  chevronDown: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>,

  lock: (p = {}) =>
  <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>

};

// ============================================================
// Camera access + grey-card analysis
// ============================================================
const cam = (window.cfc && window.cfc.camera) || null;

// True for dev/headless-verification runs (electron . is always unpackaged),
// false in packaged/field builds. Gates the global keyboard-navigation
// shortcuts in SimpleApp — see REMEDIATION-PLAN.md CFC-03: they call next()/
// back()/restart() directly, bypassing every step gate the screens enforce,
// and have no business existing in a touch/mouse kiosk app an operator could
// stumble into via a stray keypress.
const DEV_MODE = !(window.cfc && window.cfc.isPackaged);

// All operator-facing copy lives in strings.js (window.CFC_STRINGS)
const S = window.CFC_STRINGS;
const fmt = (tpl, vars) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => vars[k] != null ? vars[k] : "");

// Field-tuned tolerances (per user: under 1 stop of exposure error is fine)
const EV_TOLERANCE = 1.0;   // stops — only correct/flag beyond this
const CAST_TOLERANCE = 0.3; // |log2(R/B linear)| — clearly visible cast
const CAST_STRONG = 0.6;
const CLIP_LIMIT = 0.2;     // fraction of near-clipped pixels → color unreliable

// Nominal Kelvin for common WB preset names (Canon + Nikon vocabularies)
const WB_KELVIN = {
  "Tungsten": 3200, "Incandescent": 3200, "Fluorescent": 4000, "White Fluorescent": 4000,
  "Daylight": 5200, "Sunny": 5200, "Direct sunlight": 5200, "Flash": 5500,
  "Cloudy": 6000, "Shade": 7000
};

// Map a box drawn in displayed pixels to the image's natural pixels (objectFit: cover)
function mapRegionToNatural(imgEl, box) {
  const cw = imgEl.clientWidth, ch = imgEl.clientHeight;
  const nw = imgEl.naturalWidth, nh = imgEl.naturalHeight;
  const scale = Math.max(cw / nw, ch / nh);
  const offX = (nw * scale - cw) / 2;
  const offY = (nh * scale - ch) / 2;
  return {
    x: Math.max(0, (box.x + offX) / scale),
    y: Math.max(0, (box.y + offY) / scale),
    w: Math.min(nw, box.w / scale),
    h: Math.min(nh, box.h / scale)
  };
}

function averageRegion(imgEl, nat) {
  const w = Math.max(1, Math.round(nat.w));
  const h = Math.max(1, Math.round(nat.h));
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imgEl, Math.round(nat.x), Math.round(nat.y), w, h, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  let r = 0, g = 0, b = 0, clipped = 0;
  const n = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]; g += data[i + 1]; b += data[i + 2];
    // A true blown highlight (specular glare) saturates all three channels
    // together, since the light source is neutral. Flagging on any ONE
    // channel also caught a strong color cast (e.g. a blue-shifted WB
    // pegging just the blue channel) as "too bright to read" -- that's a
    // WB problem, not a clipping problem, and the grey card is exactly
    // what's supposed to fix it. Require all three near-max instead.
    if (Math.min(data[i], data[i + 1], data[i + 2]) >= 250) clipped++;
  }
  return { r: r / n, g: g / n, b: b / n, clipped: clipped / n };
}

const srgbToLinear = (v) => Math.pow(v / 255, 2.2);

function analyzeGreyCard(imgEl, displayBox) {
  const nat = mapRegionToNatural(imgEl, displayBox);
  const avg = averageRegion(imgEl, nat);
  const R = srgbToLinear(avg.r), G = srgbToLinear(avg.g), B = srgbToLinear(avg.b);
  const Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  return {
    avg,
    // stops away from a properly exposed 18% grey card (+ = underexposed, − = overexposed)
    evDelta: Math.log2(0.18 / Math.max(Y, 0.001)),
    // red/blue balance of the card (>1 = image is too warm)
    warmth: R / Math.max(B, 0.0001),
    // near-clipped pixels distort channel ratios → color judgment unreliable
    clipped: avg.clipped || 0
  };
}

function nearestValue(list, target) {
  let best = null, bestDiff = Infinity;
  for (const v of list || []) {
    const n = parseFloat(v);
    if (isNaN(n)) continue;
    const d = Math.abs(n - target);
    if (d < bestDiff) { bestDiff = d; best = v; }
  }
  return best;
}

// Shutter speeds are reported as fractions ("1/125") or plain seconds ("2",
// "0.3") -- parseFloat alone reads "1/125" as 1. "Bulb" has no fixed duration.
function parseShutterSeconds(v) {
  const s = String(v).trim();
  if (!s || s.toLowerCase() === "bulb") return null;
  if (s.includes("/")) {
    const [num, den] = s.split("/").map(Number);
    return den ? num / den : null;
  }
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function nearestShutter(list, target) {
  const targetSecs = parseShutterSeconds(target);
  if (targetSecs == null) return null;
  let best = null, bestDiff = Infinity;
  for (const v of list || []) {
    const secs = parseShutterSeconds(v);
    if (secs == null) continue;
    // stops apart, not raw seconds -- shutter speeds are spaced geometrically
    const d = Math.abs(Math.log2(secs) - Math.log2(targetSecs));
    if (d < bestDiff) { bestDiff = d; best = v; }
  }
  return best;
}

// White balance presets are named, not numeric -- match the admin's default
// by name (case-insensitively) rather than trying to rank them by Kelvin.
function nearestWb(list, target) {
  if (!target) return null;
  const exact = (list || []).find((w) => w === target);
  if (exact) return exact;
  return (list || []).find((w) => String(w).toLowerCase() === String(target).toLowerCase()) || null;
}

// Decide what to change on the camera. Strobe-lit set: exposure moves via
// ISO first, then aperture; shutter stays (it barely affects strobe exposure).
// `limits` (from admin Settings' cameraLimits) only ever narrows the camera's
// own reported value tables — it never widens past what the camera supports.
function planCorrections(settings, analysis, limits) {
  limits = limits || {};
  const plan = {};
  const currentK = WB_KELVIN[settings.wb] || 5500;
  // empirical: pull the WB assumption toward neutral based on measured warmth
  const estimatedK = currentK / Math.pow(analysis.warmth, 0.6);
  if (Math.abs(Math.log2(analysis.warmth)) > CAST_TOLERANCE && analysis.clipped < CLIP_LIMIT) {
    let bestWb = null, bestDiff = Infinity;
    const wbCandidates = (settings.wbValues || []).filter((wb) => !limits.allowedWb || limits.allowedWb.includes(wb));
    for (const wb of wbCandidates) {
      const k = WB_KELVIN[wb];
      if (!k) continue;
      const d = Math.abs(k - estimatedK);
      if (d < bestDiff) { bestDiff = d; bestWb = wb; }
    }
    if (bestWb && bestWb !== settings.wb) plan.wb = bestWb;
  }
  if (Math.abs(analysis.evDelta) >= EV_TOLERANCE) {
    const curIso = parseFloat(settings.iso);
    if (curIso > 0) {
      // The driver's ISO table includes extended values real bodies don't accept
      // (T7 lists 6/12/25/50) — writing one can wedge the camera. Stay in 100+,
      // further narrowed by the admin's ISO limits if set.
      const isoFloor = Math.max(100, limits.isoMin ?? 100);
      const isoCeil = Math.min(25600, limits.isoMax ?? 25600);
      const isoCandidates = (settings.isoValues || []).filter((v) => {
        const n = parseFloat(v);
        return n >= isoFloor && n <= isoCeil;
      });
      const newIso = nearestValue(isoCandidates, curIso * Math.pow(2, analysis.evDelta));
      if (newIso && newIso !== settings.iso) plan.iso = newIso;
      const isoAfter = parseFloat(newIso || settings.iso);
      const remaining = analysis.evDelta - Math.log2(isoAfter / curIso);
      const curN = parseFloat(settings.aperture);
      if (Math.abs(remaining) >= 0.4 && curN > 0) {
        // Only ever stop DOWN (higher f-number). Opening up may exceed what the
        // lens can do at its current zoom (the table is not lens-aware) — leave
        // brightening to ISO. Admin aperture-max further narrows the stop-down ceiling.
        const target = curN * Math.pow(2, -remaining / 2);
        if (target > curN) {
          const apertureCeil = limits.apertureMax ?? Infinity;
          const apertureFloor = Math.max(curN, limits.apertureMin ?? -Infinity);
          const stopDownValues = (settings.apertureValues || []).filter((v) => {
            const n = parseFloat(v);
            return n >= apertureFloor && n <= apertureCeil;
          });
          const newN = nearestValue(stopDownValues, target);
          if (newN && newN !== settings.aperture) plan.aperture = newN;
        }
      }
    }
  }
  return plan;
}

// Electron IPC wraps thrown errors in noise — show operators just the message
const errText = (e) =>
String(e && e.message || e).replace(/Error invoking remote method '[^']+':\s*(Error:\s*)?/g, "");

// Full camera stats panel shown on the calibration screen
function CameraStats({ s }) {
  if (!s) return null;
  const rows = [
  [S.camera.stats.model, s.model],
  [S.camera.stats.mode, s.mode],
  [S.camera.stats.fstop, s.aperture ? "f/" + s.aperture : null],
  [S.camera.stats.shutter, s.shutter],
  [S.camera.stats.iso, s.iso],
  [S.camera.stats.wb, s.wb],
  [S.camera.stats.quality, s.quality]];

  return (
    <div className="s-stats">
      {rows.map(([k, v]) =>
      <div key={k} className="s-stat">
          <span className="s-stat-k">{k}</span>
          <span className="s-stat-v" style={v ? null : { color: "var(--dim)" }}>{v || "—"}</span>
        </div>
      )}
    </div>);

}

// Compact readout of the camera's current exposure settings
function SettingsStrip({ s }) {
  if (!s) return null;
  return (
    <div className="s-settings-strip">
      <span>f/<b>{s.aperture || "—"}</b></span>
      <span><b>{s.shutter || "—"}</b></span>
      <span>ISO <b>{s.iso || "—"}</b></span>
      <span>WB <b>{s.wb || "—"}</b></span>
    </div>);

}

// ============================================================
// Top bar
// ============================================================
function SimpleTop({ openHelp, openSettings, step }) {
  const [simulated, setSimulated] = React.useState(false);
  React.useEffect(() => {
    if (cam) cam.mode().then((m) => setSimulated(m === "simulator")).catch(() => {});
  }, []);
  return (
    <div className="s-top">
      <div className="s-top-brand">
        <div className="s-top-mark">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <path d="M3 7h3.5l1.5-2h8l1.5 2H21v12H3z" />
            <circle cx="12" cy="13" r="4.5" />
          </svg>
        </div>
        <div>
          <div className="s-top-title">{S.app.title}</div>
        </div>
      </div>
      <SimpleSteps step={step} />
      <div className="s-top-actions">
        {simulated && <span className="s-sim-badge">{S.app.simulatorBadge}</span>}
        <button className="s-help-btn" onClick={openHelp}>
          <SI.help size={16} /> {S.app.getHelp}
        </button>
        <button className="s-win-btn" onClick={openSettings} aria-label={S.app.settings} title={S.app.settings}>
          <SI.gear size={17} />
        </button>
        {window.cfc && <>
          <span className="s-win-sep" />
          <button className="s-win-btn" onClick={() => window.cfc.minimize()} aria-label="Minimize" title="Minimize">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 12h14" />
            </svg>
          </button>
          <button className="s-win-btn s-win-btn--close" onClick={() => window.cfc.close()} aria-label="Close" title="Close">
            <SI.close size={16} />
          </button>
        </>}
      </div>
    </div>);

}

// ============================================================
// Step dots
// ============================================================
const STEP_LABELS = S.steps;

function SimpleSteps({ step }) {
  // On the Done screen itself there's nothing left "in progress" -- every
  // step, including the last, reads as complete rather than showing the
  // final dot as the current/active step.
  const allDone = step >= STEP_LABELS.length;
  return (
    <div className="s-steps">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const isActive = !allDone && n === step;
        const isDone = allDone || n < step;
        const showLabel = isActive;
        return (
          <React.Fragment key={label}>
            <div className={`s-dot ${isActive ? "s-dot--active" : ""} ${isDone ? "s-dot--done" : ""}`}>
              <div className={`s-dot-mark ${isActive ? "s-dot-mark--active" : ""} ${isDone ? "s-dot-mark--done" : ""}`}>
                {isDone ? <SI.check size={16} /> : n}
              </div>
              {showLabel && <span className="s-dot-label">{label}</span>}
            </div>
            {i < STEP_LABELS.length - 1 &&
            <div className={`s-dot-sep ${isDone ? "s-dot-sep--done" : ""}`} />
            }
          </React.Fragment>);

      })}
    </div>);

}

// ============================================================
// Footer
// ============================================================
function SimpleFoot({ left, back, skip, primary }) {
  return (
    <div className="s-foot">
      <div className="s-foot-left">{back || left}</div>
      <div className="s-foot-center">{primary}</div>
      <div className="s-foot-right">{skip}</div>
    </div>);

}

// Tertiary control, deliberately understated next to the primary action —
// available for busy staff, but not the path the screen is designed around.
function SkipButton({ onClick }) {
  return (
    <button className="s-btn s-btn--skip" onClick={onClick}>
      <SI.skip size={15} /> {S.skip.button}
    </button>);

}

function SkipReasonModal({ screenLabel, onConfirm, onClose, reasons }) {
  const list = reasons && reasons.length ? reasons : ["Other"];
  const [reason, setReason] = React.useState(list[0]);
  const [note, setNote] = React.useState("");
  // Admin-editable reasons can be reordered/renamed, so "show a free-text
  // box" keys off the text itself rather than assuming "Other" is last.
  const isOther = reason.trim().toLowerCase() === "other";

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="s-info" onClick={onClose}>
      <div className="s-info-card s-skip-card s-fadeup" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="s-info-close" onClick={onClose} aria-label="Close">
          <SI.close size={18} />
        </button>
        <div className="s-info-head">
          <div>
            <div className="s-info-eyebrow">{S.skip.eyebrowPrefix}{screenLabel}</div>
            <h3 className="s-info-title">{S.skip.modalTitle}</h3>
          </div>
        </div>
        <div className="s-skip-reasons">
          {list.map((r) =>
          <button
            key={r}
            className={`s-skip-reason ${reason === r ? "s-skip-reason--on" : ""}`}
            onClick={() => setReason(r)}>
              <span className="s-skip-reason-dot" />
              {r}
            </button>
          )}
        </div>
        {isOther &&
        <textarea
          className="s-input s-skip-other"
          rows={2}
          placeholder={S.skip.otherPlaceholder}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          autoFocus />
        }
        <div className="s-tut-foot">
          <button className="s-btn s-btn--ghost" onClick={onClose}>{S.skip.cancel}</button>
          <button
            className="s-btn s-btn--primary"
            onClick={() => onConfirm(isOther && note.trim() ? note.trim() : reason)}>
            {S.skip.confirm}
          </button>
        </div>
      </div>
    </div>);

}

// ============================================================
// Screen 1 — Welcome (getting-started splash: location + what you'll need)
// ============================================================
function ScreenWelcome({ onStart, settings }) {
  const [now, setNow] = React.useState(() => new Date());
  const [greyCardHelp, setGreyCardHelp] = React.useState(false);
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const dateText = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const timeText = now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" });

  const loc = settings.location || {};
  const locationText =
  loc.name ||
  (loc.number ? fmt(S.app.locationNumberOnly, { number: loc.number }) : null) ||
  settings.hostname ||
  S.app.locationUnknown;
  const needs = [
  { title: S.welcome.need1Title, text: S.welcome.need1Text },
  { title: S.welcome.need2Title, lines: S.welcome.need2Lines },
  { title: S.welcome.need3Title, text: S.welcome.need3Text },
  { title: S.welcome.need4Title, text: S.welcome.need4Text }];

  return (
    <>
      <div className="s-body">
        <div className="s-screen s-fadeup">
          <h1 className="s-h1" style={{ marginTop: 8 }}>{S.welcome.title}</h1>
          <p className="s-lede">
            {S.welcome.ledeBefore}<b>{S.welcome.ledeBold}</b>{S.welcome.ledeAfter}
          </p>

          <div className="s-form">
            <div className="s-field" style={{ width: "100%" }}>
              <label>{S.welcome.needsTitle}</label>
              <div className="s-needs-box">
                <ul>
                  {needs.map((n, i) =>
                  <li key={n.title}>
                      <span className="s-checklist-dot" />
                      <div>
                        <b>{n.title}</b>
                        {n.lines ?
                        <ul className="s-need-sublist">
                          {n.lines.map((line, li) => <li key={li}>{line}</li>)}
                        </ul> :
                        <span>{n.text}</span>}
                      </div>
                      {i === 0 &&
                      <button
                        className="s-tip-btn"
                        style={{ marginLeft: "auto", alignSelf: "center" }}
                        onClick={() => setGreyCardHelp(true)}>
                          <SI.help size={14} /> {S.camera.shoot.greyCardHelpButton}
                        </button>
                      }
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimpleFoot
        left={
        <span className="s-welcome-foot-info">
            <span><SI.pin size={14} /> {locationText} · <b>{loc.station || "Camera 1"}</b></span>
            <span>{dateText} · <b>{timeText}</b></span>
          </span>
        }
        primary={
        <button className="s-btn s-btn--primary s-btn--xl" onClick={() => onStart()}>
            {S.common.start} <SI.arrow size={20} />
          </button>
        } />
      {greyCardHelp && <GreyCardHelpModal onClose={() => setGreyCardHelp(false)} />}
    </>);

}

// ============================================================
// Screen 2 — Walk around the station
// ============================================================
const WALK_ICONS = {
  clean: <SI.broom size={26} />, router: <SI.router size={26} />,
  webcam: <SI.webcam size={26} />, camera: <SI.pole size={26} />, framing: <SI.framing size={26} />, flash: <SI.bolt size={26} />
};
// Card copy comes from strings.js. Each bullet doubles as a "More info"
// tutorial step (title = bullet text) so guidance is authored once, not
// twice — items needing extra reference photos beyond their bullets (e.g.
// different camera mount styles) list them in `extraSteps`.
const WALK_ITEMS = Object.keys(WALK_ICONS).map((key) => {
  const item = S.walk.items[key];
  const bulletSteps = (item.bullets.length ? item.bullets : [item.label]).map((b) => ({ title: b, text: "" }));
  const extraSteps = (item.extraSteps || []).map((t) => ({ title: t, text: "" }));
  return { key, icon: WALK_ICONS[key], ...item, steps: [...bulletSteps, ...extraSteps] };
});

function ScreenWalkAround({ checked, setChecked, onNext, onBack, onSkip }) {
  // A card's value is `true` (checked done), the sentinel "skipped" (not
  // applicable at this station -- a router or webcam that isn't in use,
  // say), or absent/false (untouched). Either resolved state satisfies the
  // gate to Continue; clicking the card body always lands on "done"
  // regardless of which state it started from.
  const toggle = (k) => setChecked((c) => ({ ...c, [k]: c[k] === true ? false : true }));
  const skipItem = (k) => setChecked((c) => ({ ...c, [k]: c[k] === "skipped" ? false : "skipped" }));
  const resolvedCount = Object.values(checked).filter((v) => v === true || v === "skipped").length;
  const total = WALK_ITEMS.length;
  const allDone = resolvedCount === total;
  const [infoKey, setInfoKey] = React.useState(null);
  const infoItem = WALK_ITEMS.find((i) => i.key === infoKey);

  return (
    <>
      <div className="s-body">
        <div className="s-screen s-screen--wide s-screen--tight s-fadeup">
          <h1 className="s-h1 s-h1--small">{S.walk.title}</h1>
          <p className="s-lede">{S.walk.lede}</p>

          <div className="s-grid s-grid--checklist" style={{ marginTop: 4 }}>
            {WALK_ITEMS.map((it) => {
              const state = checked[it.key];
              return (
              <button
                key={it.key}
                className={`s-card s-card--checklist ${state === true ? "s-card--on" : ""} ${state === "skipped" ? "s-card--skipped" : ""}`}
                onClick={() => toggle(it.key)}>

                  <div className="s-card-head">
                    <div className="s-card-ic">{it.icon}</div>
                    <div className="s-card-label">{it.label}</div>
                    <span className="s-card-check">
                      {state === "skipped" ? <SI.skip size={13} /> : <SI.check size={16} />}
                    </span>
                  </div>
                  {it.bullets.length > 0 &&
                  <ul className="s-card-bullets">
                    {it.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  }
                  <span
                  className="s-card-info"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {e.stopPropagation();setInfoKey(it.key);}}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      setInfoKey(it.key);
                    }
                  }}>
                    <SI.info size={14} /> {S.common.moreInfo}
                  </span>
                  <span
                  className={`s-card-skip ${state === "skipped" ? "s-card-skip--on" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {e.stopPropagation();skipItem(it.key);}}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      skipItem(it.key);
                    }
                  }}>
                    <SI.skip size={13} /> {state === "skipped" ? S.walk.itemSkipped : S.walk.itemNotApplicable}
                  </span>
                </button>);

            })}
          </div>
        </div>
      </div>
      {infoItem && <WalkInfoModal item={infoItem} onClose={() => setInfoKey(null)} />}
      <SimpleFoot
        back={<button className="s-btn s-btn--back" onClick={onBack}><SI.back /> {S.common.back}</button>}
        skip={<SkipButton onClick={onSkip} />}
        primary={
        <button
          className="s-btn s-btn--primary s-btn--xl"
          disabled={!allDone}
          onClick={onNext}>

            {S.common.continue} <SI.arrow size={20} />
          </button>
        } />

    </>);

}

// ============================================================
// Micro-tutorial popup for a walk-around card
// Steps (title + caption) come from strings.js. Each step displays
// assets/tutorials/<key>-<n>.png when the file exists; until then a
// placeholder names the file so real equipment photos can drop in.
// ============================================================
function TutMedia({ itemKey, idx }) {
  const src = `assets/tutorials/${itemKey}-${idx + 1}.png`;
  const [ok, setOk] = React.useState(true);
  React.useEffect(() => { setOk(true); }, [src]);
  return (
    <div className="s-tut-stage" key={src}>
      {ok ?
      <img
        src={src}
        alt=""
        onError={() => setOk(false)}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} /> :

      <div className="s-tut-ph">
        <SI.camera size={38} />
        <b>{S.walk.tutorial.placeholderTitle}</b>
        <span>{S.walk.tutorial.placeholderHint}</span>
        <code>{src}</code>
      </div>
      }
    </div>);

}

function WalkInfoModal({ item, onClose }) {
  const steps = item.steps || [];
  const total = steps.length;
  const [idx, setIdx] = React.useState(0);
  const step = steps[idx] || {};

  const next = () => idx < total - 1 ? setIdx(idx + 1) : onClose();
  const prev = () => setIdx(Math.max(0, idx - 1));

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      e.stopPropagation();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [idx, onClose]);

  return (
    <div className="s-info" onClick={onClose}>
      <div className="s-info-card s-tut-card s-fadeup" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="s-info-close" onClick={onClose} aria-label="Close">
          <SI.close size={18} />
        </button>
        <div className="s-info-head">
          <div className="s-info-ic">{item.icon}</div>
          <div>
            <div className="s-info-eyebrow">{S.walk.tutorial.eyebrow} · {idx + 1} {S.walk.tutorial.of} {total}</div>
            <h3 className="s-info-title">{item.label}</h3>
          </div>
        </div>

        <TutMedia itemKey={item.key} idx={idx} />

        <div className="s-tut-caption" key={"c" + idx}>
          <b>{step.title}</b>
          <span>{step.text}</span>
        </div>

        <div className="s-tut-foot">
          <button className="s-btn s-btn--ghost" onClick={prev} disabled={idx === 0}>
            <SI.back size={16} /> {S.common.back}
          </button>
          <div className="s-tut-dots">
            {Array.from({ length: total }, (_, i) =>
            <button
              key={i}
              className={`s-tut-dot ${i === idx ? "s-tut-dot--on" : i < idx ? "s-tut-dot--done" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Step ${i + 1}`} />
            )}
          </div>
          <button className="s-btn s-btn--primary" onClick={next}>
            {idx < total - 1 ? <>{S.common.next} <SI.arrow size={16} /></> : <>{S.common.gotIt}</>}
          </button>
        </div>
      </div>
    </div>);

}

// Simple one-image, static-text popup — for the "Can't find your grey card?"
// fallback on the calibration screen. No step pagination, unlike WalkInfoModal.
function GreyCardHelpModal({ onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="s-info" onClick={onClose}>
      <div className="s-info-card s-tut-card s-fadeup" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="s-info-close" onClick={onClose} aria-label={S.common.close}>
          <SI.close size={18} />
        </button>
        <div className="s-info-head">
          <h3 className="s-info-title">{S.camera.shoot.greyCardHelpTitle}</h3>
        </div>

        <TutMedia itemKey="grey-card-help" idx={0} />

        <div className="s-tut-caption s-tut-caption--lines">
          {S.camera.shoot.greyCardHelpLines.map((line, i) => <p key={i}>{line}</p>)}
        </div>

        <div className="s-tut-foot" style={{ justifyContent: "flex-end" }}>
          <button className="s-btn s-btn--primary" onClick={onClose}>{S.common.gotIt}</button>
        </div>
      </div>
    </div>);

}

// Confirms a "Revert to default settings" write (CFC-04 escape hatch) and
// lists what the camera is actually set to now. No backdrop-click or Escape
// dismissal on purpose -- the photo on screen was taken under whatever
// settings caused the rejection, so the only way out is Retake, which
// captures a fresh one under the settings just shown here.
function RevertedSettingsModal({ settings: s, onRetake }) {
  return (
    <div className="s-info">
      <div className="s-info-card s-fadeup" role="dialog" aria-modal="true">
        <div className="s-info-head">
          <h3 className="s-info-title">{S.camera.select.revertedTitle}</h3>
        </div>
        <p style={{ margin: "0 0 16px", color: "var(--text-2)", fontSize: 15 }}>{S.camera.select.revertedBody}</p>
        <SettingsStrip s={s} />
        <div className="s-tut-foot" style={{ justifyContent: "flex-end", marginTop: 20 }}>
          <button className="s-btn s-btn--primary" onClick={onRetake}>
            <SI.retake size={16} /> {S.camera.select.retakePhoto}
          </button>
        </div>
      </div>
    </div>);

}

// ============================================================
// Screen 3 — Camera check (real detect → capture → grey-card region → apply)
// Stages: "auto" -> "shoot" -> "select" -> "applied"
// ============================================================
function ScreenCamera({ onNext, onBack, onSkip, settings, run }) {
  const [stage, setStage] = React.useState("auto");
  const [detected, setDetected] = React.useState(null); // {model, serial}
  const [camSettings, setCamSettings] = React.useState(null);
  const [camError, setCamError] = React.useState(null);
  const [autoProgress, setAutoProgress] = React.useState(0);
  const [photo, setPhoto] = React.useState(null); // dataUrl of calibration shot
  const [photoFile, setPhotoFile] = React.useState(null); // on-disk path of the same capture, for CFC-06 diagnostics
  const [busy, setBusy] = React.useState(false);
  const [busyLabel, setBusyLabel] = React.useState("");
  const [selBox, setSelBox] = React.useState(null);
  const [result, setResult] = React.useState(null); // {analysis, plan, applied, rejected, before, after, refreshFailed}
  const [refreshing, setRefreshing] = React.useState(false);
  const [greyCardHelp, setGreyCardHelp] = React.useState(false);
  // Counts sanity-gate rejections for the current photo (CFC-04) -- once a
  // real lighting problem (glare, shadow) can fail every box placement, the
  // operator needs an escape hatch after one retry rather than infinite
  // redraws as the only path forward. Resets on each new photo.
  const [selectRejectCount, setSelectRejectCount] = React.useState(0);
  // Holds the camera's settings right after a "Revert to default settings"
  // write, so the confirmation popup can list what actually took effect;
  // null when the popup isn't showing.
  const [revertedSettings, setRevertedSettings] = React.useState(null);

  // ---------- detection ----------
  const runAuto = React.useCallback(async () => {
    setCamError(null);
    setAutoProgress(0);
    if (!cam) { setCamError(S.camera.detect.unavailable); return; }
    try {
      const d = await cam.detect();
      if (!d.connected) {
        setCamError(S.camera.detect.notFoundBody);
        return;
      }
      setDetected(d);
      setAutoProgress(1);
      const s = await cam.settings();
      setCamSettings(s);
      setAutoProgress(2);
      setTimeout(() => setStage("shoot"), 900);
    } catch (e) {
      setCamError(errText(e));
    }
  }, []);

  React.useEffect(() => { if (stage === "auto") runAuto(); }, [stage]);

  // ---------- capture ----------
  const takePhoto = async () => {
    setBusy(true); setBusyLabel(S.common.takingPhoto); setCamError(null);
    try {
      const p = await cam.capture();
      setPhoto(p.dataUrl);
      setPhotoFile(p.file || null);
      setSelBox(null);
      setResult(null);
      setSelectRejectCount(0);
      setStage("select");
    } catch (e) {
      setCamError(errText(e));
    } finally { setBusy(false); }
  };

  // Fire-and-forget CFC-06 diagnostics write, shared by every outcome of a
  // grey-card attempt (applied, gate-rejected, or escape-hatch skipped) so a
  // field dispute over "why did it reject this" has real pixel data behind
  // it instead of a guess from a screenshot.
  const saveDiagnostics = (extra) => {
    if (!(window.cfc && window.cfc.calibration)) return;
    window.cfc.calibration.save({
      runId: run && run.id,
      photoFile,
      analysisRecord: { capturedAt: new Date().toISOString(), ...extra }
    }).catch(() => {});
  };

  // ---------- grey-card region chosen ----------
  const onRegion = async (box, imgEl) => {
    setBusy(true); setBusyLabel(S.camera.select.balancing); setCamError(null);
    try {
      const analysis = analyzeGreyCard(imgEl, box);
      const nat = mapRegionToNatural(imgEl, box);

      // Sanity gate (REMEDIATION-PLAN.md CFC-04) -- refuse to write anything
      // to the camera on a sample that can't plausibly be the grey card, and
      // send the operator back to redraw with a reason instead of silently
      // basing a correction on backdrop, shadow, or skin. Checked in the
      // order a bad tap is most likely to fail: blown-out, too dark/missed
      // the card, or too saturated to be a neutral grey surface.
      const { r: avgR, g: avgG, b: avgB } = analysis.avg; // avoid shadowing cam.set()'s `r` result below
      const meanLuma = (avgR + avgG + avgB) / 3; // coarse 8-bit plausibility check, not the linear Y used for exposure
      const channelSpread = Math.max(avgR, avgG, avgB) / Math.max(Math.min(avgR, avgG, avgB), 1);
      let reasonCode = null;
      if (analysis.clipped >= CLIP_LIMIT) reasonCode = "clipped";
      else if (meanLuma < 40 || meanLuma > 220) reasonCode = "offCard";
      else if (channelSpread > 2.5) reasonCode = "saturated";
      // One message covers all three (rather than a distinct reason per
      // check) since the operator's next move is the same either way: fix
      // the box, or -- if the photo itself is too bright/dark -- revert to
      // this station's default settings and retake. reasonCode is still
      // kept distinct for diagnostics.
      if (reasonCode) {
        setCamError(S.camera.select.rejectGeneric);
        setSelBox(null);
        setSelectRejectCount((n) => n + 1);
        saveDiagnostics({
          outcome: "rejected", reasonCode,
          box: { display: box, natural: nat },
          avg: analysis.avg, evDelta: analysis.evDelta, warmth: analysis.warmth,
          cameraSettingsBeforeAnalysis: camSettings
        });
        return;
      }

      const plan = planCorrections(camSettings, analysis, settings.cameraLimits);
      const before = {
        iso: camSettings.iso, wb: camSettings.wb,
        aperture: camSettings.aperture, shutter: camSettings.shutter
      };
      let applied = {}, rejected = {};
      if (Object.keys(plan).length) {
        const r = await cam.set(plan);
        applied = r.applied || {}; rejected = r.rejected || {};
      }
      // The camera can stay busy digesting the writes — if the re-read times
      // out, show what was applied rather than failing the whole step.
      let after = null;
      try { after = await cam.settings(); } catch {}
      const refreshFailed = !after;
      if (!after) after = { ...camSettings, ...applied };
      setCamSettings(after);
      setResult({ analysis, plan, applied, rejected, before, after, refreshFailed });
      setStage("applied");

      saveDiagnostics({
        outcome: "applied",
        box: { display: box, natural: nat },
        avg: analysis.avg, evDelta: analysis.evDelta, warmth: analysis.warmth,
        cameraSettingsBeforeAnalysis: camSettings,
        plan, applied, rejected
      });
    } catch (e) {
      setCamError(errText(e));
    } finally { setBusy(false); }
  };

  // Escape hatch (REMEDIATION-PLAN.md CFC-04) -- once the sanity gate has
  // rejected at least one attempt, a real lighting problem (glare, shadow, a
  // card the strobe can't reach) can make every possible box placement fail.
  // Rather than trap the operator in redraw after redraw with no way
  // through, revert the camera to this station's known-good default settings
  // (admin-configured, Settings → Camera → Default Camera Settings) instead
  // of leaving it at whatever it happened to be mid-adjustment -- clearly
  // disclosed on the next screen so a detected problem is never left
  // unexplained. Each default is matched to the nearest value this camera
  // actually reports, same tolerant approach as the grey-card correction
  // plan, so the admin doesn't need to type exact camera-vocabulary strings.
  const revertToDefaults = async () => {
    setBusy(true); setBusyLabel(S.camera.select.balancing); setCamError(null);
    try {
      const d = settings.cameraDefaults || {};
      const before = {
        iso: camSettings.iso, wb: camSettings.wb,
        aperture: camSettings.aperture, shutter: camSettings.shutter
      };
      const plan = {};
      if (d.iso) {
        const v = nearestValue(camSettings.isoValues, parseFloat(d.iso));
        if (v && v !== before.iso) plan.iso = v;
      }
      if (d.aperture) {
        const v = nearestValue(camSettings.apertureValues, parseFloat(d.aperture));
        if (v && v !== before.aperture) plan.aperture = v;
      }
      if (d.shutter) {
        const v = nearestShutter(camSettings.shutterValues, d.shutter);
        if (v && v !== before.shutter) plan.shutter = v;
      }
      if (d.wb) {
        const v = nearestWb(camSettings.wbValues, d.wb);
        if (v && v !== before.wb) plan.wb = v;
      }
      let applied = {}, rejected = {};
      if (Object.keys(plan).length) {
        const r = await cam.set(plan);
        applied = r.applied || {}; rejected = r.rejected || {};
      }
      let after = null;
      try { after = await cam.settings(); } catch {}
      if (!after) after = { ...camSettings, ...applied };
      setCamSettings(after);
      setRevertedSettings(after);
      saveDiagnostics({
        outcome: "reverted", reasonAtRevert: camError,
        cameraDefaults: d, plan, applied, rejected,
        cameraSettingsBeforeAnalysis: camSettings
      });
    } catch (e) {
      setCamError(errText(e));
    } finally { setBusy(false); }
  };

  // Closes the reverted-settings confirmation and immediately takes a fresh
  // photo at the new settings, landing back on this same box-selection
  // screen -- the old photo was taken under whatever settings caused the
  // rejection, so it's never reused after a revert.
  const retakeAfterRevert = () => {
    setRevertedSettings(null);
    takePhoto();
  };

  // Terminal escape hatch (CFC-04): some problems aren't fixable from this
  // app at all -- a manual external flash slider has no software control,
  // so reverting to default camera settings can't help a scene that's
  // blown out by the flash itself. Rather than trap the operator between
  // "redraw the box" and "revert settings" forever, let them move past the
  // whole calibration step with nothing changed, clearly disclosed on the
  // next screen (never leave a detected problem unexplained).
  const proceedWithPicture = () => {
    const now = { iso: camSettings.iso, wb: camSettings.wb, aperture: camSettings.aperture, shutter: camSettings.shutter };
    setResult({ analysis: null, before: now, after: now, applied: {}, rejected: {}, refreshFailed: false });
    setStage("applied");
    saveDiagnostics({ outcome: "proceeded", reasonAtProceed: camError, cameraSettingsBeforeAnalysis: camSettings });
  };

  // ---------- Stage: auto ----------
  if (stage === "auto") {
    const rows = [
    {
      label: detected ? S.camera.detect.foundLabel : S.camera.detect.lookingLabel,
      sub: detected ? detected.model : S.camera.detect.lookingSub
    },
    {
      label: camSettings ? S.camera.detect.settingsLoadedLabel : S.camera.detect.settingsLoadingLabel,
      sub: camSettings ? fmt(S.camera.detect.settingsLoadedSub, { mode: camSettings.mode || "—" }) : S.camera.detect.settingsLoadingSub
    }];

    return (
      <>
        <div className="s-body">
          <div className="s-screen s-fadeup">
            <div className={`s-hero-ic ${camError ? "s-hero-ic--fail" : "s-hero-ic--accent s-pulse"}`}>
              <SI.camera size={72} />
            </div>
            <h1 className="s-h1 s-h1--small">{camError ? S.camera.detect.notFoundTitle : S.camera.detect.title}</h1>
            <p className="s-lede">
              {camError ? camError : S.camera.detect.lede}
            </p>

            {!camError &&
            <div style={{ width: "100%", marginTop: 12 }}>
              {rows.map((s, i) => {
                const isDone = i < autoProgress;
                const isWorking = i === autoProgress;
                return (
                  <div key={i} className="s-row">
                    <div className={`s-row-ic ${isWorking ? "s-row-ic--working" : ""}`}>
                      {isDone ? <SI.check size={20} /> :
                      isWorking ? <div className="s-spinner" /> :
                      <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--dim)" }} />
                      }
                    </div>
                    <div>
                      <div className="s-row-label" style={{ color: isDone || isWorking ? "var(--text)" : "var(--muted)" }}>
                        {s.label}
                      </div>
                      <div className="s-row-sub">{s.sub}</div>
                    </div>
                    {isDone && <div className="s-row-right"><SI.check size={16} /> {S.common.done}</div>}
                    {isWorking && <div className="s-row-right" style={{ color: "var(--accent-2)" }}>{S.common.checking}</div>}
                  </div>);
              })}
            </div>
            }
            {camError &&
            <button className="s-btn s-btn--primary s-btn--xl" style={{ marginTop: 10 }} onClick={runAuto}>
              <SI.retake size={20} /> {S.common.tryAgain}
            </button>
            }
          </div>
        </div>
        <SimpleFoot
          left={null}
          back={<button className="s-btn s-btn--back" onClick={onBack}><SI.back /> {S.common.back}</button>}
          skip={<SkipButton onClick={onSkip} />}
          primary={
          <button
            className="s-btn s-btn--primary s-btn--xl"
            disabled={autoProgress < 2}
            onClick={() => setStage("shoot")}>
              {S.common.continue} <SI.arrow size={20} />
            </button>
          } />
      </>);
  }

  // ---------- Stage: shoot ----------
  if (stage === "shoot") {
    // A populated ISO table means settings actually loaded. With settings loaded,
    // a missing WB value/list means the mode dial is on an Auto mode (the camera
    // locks WB there). With nothing loaded at all, the read failed — different
    // problem, different message.
    const settingsLoaded = camSettings && (camSettings.isoValues || []).length > 0;
    const modeWarn = settingsLoaded && (camSettings.wb == null || !(camSettings.wbValues || []).length);
    const readFail = camSettings && !settingsLoaded;
    const recheck = async () => {
      setRefreshing(true);
      try { setCamSettings(await cam.settings()); } catch {}
      setRefreshing(false);
    };
    return (
      <>
        <div className="s-body">
          <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
            <div className="s-stage">
              <div className="s-photo s-photo--portrait">
                {photo ?
                <img src={photo} alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.45 }} /> :
                <div className="s-photo-placeholder">
                  <SI.camera size={64} />
                  <span>{S.camera.shoot.photoPlaceholder}</span>
                </div>
                }
                <div className="s-photo-pill" style={{ background: "rgba(0,0,0,0.55)" }}>
                  {detected ? detected.model : S.app.title}
                </div>
              </div>
              <div className="s-stage-side" style={{ gap: 12 }}>
                <h1 className="s-h1 s-h1--small s-h1--left">{S.camera.shoot.title}</h1>
                <p className="s-lede s-lede--left">
                  {S.camera.shoot.ledeBefore}<b style={{ color: "var(--text-2)" }}>{S.camera.shoot.ledeGreyCard}</b>{S.camera.shoot.ledeAfter}
                </p>
                <ul className="s-checklist s-checklist--grouped">
                  <li>
                    <span className="s-checklist-dot" />
                    <div><b>{S.camera.shoot.tip1}</b></div>
                  </li>
                  <li>
                    <span className="s-checklist-dot" />
                    <div><b>{S.camera.shoot.tip2}</b></div>
                  </li>
                  <li>
                    <span className="s-checklist-dot" />
                    <div><b>{S.camera.shoot.tip3}</b></div>
                  </li>
                </ul>
                <button className="s-refresh-btn" style={{ alignSelf: "flex-start" }} onClick={() => setGreyCardHelp(true)}>
                  <SI.help size={13} /> {S.camera.shoot.greyCardHelpButton}
                </button>
                {/* last-minute dial changes on the camera → re-pull without leaving the screen */}
                <div className="s-refresh-row">
                  <button
                    className={`s-refresh-btn ${refreshing ? "s-refresh-btn--busy" : ""}`}
                    disabled={refreshing}
                    onClick={recheck}>
                    <SI.retake size={13} /> {refreshing ? S.camera.shoot.refreshing : S.camera.shoot.refreshSettings}
                  </button>
                </div>
                <CameraStats s={camSettings} />
                {readFail &&
                <div className="s-cam-warn">
                  <SI.warn size={16} />
                  <span>{S.camera.shoot.readFailWarn}</span>
                  <button onClick={recheck}>{S.common.recheck}</button>
                </div>
                }
                {modeWarn &&
                <div className="s-cam-warn">
                  <SI.warn size={16} />
                  <span>{S.camera.shoot.autoModeWarnBefore}<b>{S.camera.shoot.autoModeWarnAuto}</b>{S.camera.shoot.autoModeWarnMiddle}<b>{S.camera.shoot.autoModeWarnDial}</b>{S.camera.shoot.autoModeWarnAfter}</span>
                  <button onClick={recheck}>{S.common.recheck}</button>
                </div>
                }
                {camError && <div className="s-cam-error"><SI.warn size={16} /> {camError}</div>}
              </div>
            </div>
          </div>
        </div>
        <SimpleFoot
          left={null}
          back={<button className="s-btn s-btn--back" disabled={busy} onClick={() => setStage("auto")}><SI.back /> {S.common.back}</button>}
          skip={<SkipButton onClick={onSkip} />}
          primary={
          <button className="s-btn s-btn--primary s-btn--xl" disabled={busy} onClick={takePhoto}>
              {busy ? <><div className="s-spinner" /> {busyLabel}</> : <><SI.shutter size={22} /> {S.common.takePhoto}</>}
            </button>
          } />
        {greyCardHelp && <GreyCardHelpModal onClose={() => setGreyCardHelp(false)} />}
      </>);
  }

  // ---------- Stage: select (drag over the grey card) ----------
  if (stage === "select") {
    return (
      <>
        <div className="s-body">
          <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
            <div className="s-stage">
              <div className="s-stage-photo-col">
                <RegionSelect src={photo} box={selBox} setBox={setSelBox} onDone={onRegion} busy={busy} />
                <SettingsStrip s={camSettings} />
              </div>
              <div className="s-stage-side">
                <h1 className="s-h1 s-h1--small s-h1--left">
                  {busy ? S.camera.select.titleBusy : S.camera.select.title}
                </h1>
                <p className="s-lede s-lede--left">
                  {busy ? S.camera.select.ledeBusy : S.camera.select.lede}
                </p>
                {!busy && !camError &&
                <ul className="s-checklist s-checklist--grouped">
                  <li>
                    <span className="s-checklist-dot" />
                    <div>
                      <b>{S.camera.select.check1Title}</b>
                      <span>{S.camera.select.check1Text}</span>
                    </div>
                  </li>
                  <li>
                    <span className="s-checklist-dot" />
                    <div>
                      <b>{S.camera.select.check2Title}</b>
                      <span>{S.camera.select.check2Text}</span>
                    </div>
                  </li>
                  <li>
                    <span className="s-checklist-dot" />
                    <div>
                      <b>{S.camera.select.check3Title}</b>
                      <span>{S.camera.select.check3Text}</span>
                    </div>
                  </li>
                  <li>
                    <span className="s-checklist-dot" />
                    <div>
                      <b>{S.camera.select.check4Title}</b>
                      <span>{S.camera.select.check4Text}</span>
                    </div>
                  </li>
                </ul>
                }
                {busy &&
                <div className="s-stage-status">
                  <div className="s-spinner" />
                  <span>{busyLabel}</span>
                </div>
                }
                {camError && <div className="s-cam-error"><SI.warn size={16} /> {camError}</div>}
                {selectRejectCount > 0 &&
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                  <button className="s-btn s-qa-skip-continue" disabled={busy} onClick={revertToDefaults}>
                    <SI.skip size={14} /> {S.camera.select.revertToDefaults}
                  </button>
                  <button className="s-btn s-qa-skip-continue" disabled={busy} onClick={proceedWithPicture}>
                    <SI.skip size={14} /> {S.camera.select.proceedWithPicture}
                  </button>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
        <SimpleFoot
          skip={<SkipButton onClick={onSkip} />}
          primary={
          <button className="s-btn s-btn--warn s-btn--xl" disabled={busy} onClick={() => setStage("shoot")}>
              <SI.retake size={16} /> {S.camera.select.retakePhoto}
            </button>
          } />
        {revertedSettings &&
        <RevertedSettingsModal settings={revertedSettings} onRetake={retakeAfterRevert} />
        }
      </>);
  }

  // ---------- Stage: applied ----------
  const changes = [];
  let measured = [];
  if (result && !result.analysis) {
    // "Proceed with this picture" path (CFC-04): no usable grey-card
    // reading, operator moved on anyway -- nothing to measure or change,
    // so say so plainly instead of a blank "What we found"/"changed" card.
    measured.push(S.camera.applied.uncalibratedFound);
    changes.push({ label: S.camera.applied.uncalibratedChangedLabel, sub: S.camera.applied.uncalibratedChanged });
  } else if (result) {
    const { before, after, analysis, rejected } = result;
    const evd = analysis.evDelta;
    const warmLog = Math.log2(analysis.warmth);
    const castWord = warmLog > 0 ? S.camera.applied.castWarm : S.camera.applied.castCool;

    // what the grey card told us
    const evAbs = Math.abs(evd);
    measured.push(evAbs < 0.25 ?
    S.camera.applied.brightnessOnTarget :
    evAbs < EV_TOLERANCE ?
    fmt(S.camera.applied.brightnessWithin, { n: evAbs.toFixed(1), dir: evd < 0 ? S.camera.applied.dirBright : S.camera.applied.dirDark }) :
    fmt(S.camera.applied.brightnessIssue, { n: evAbs.toFixed(1), s: evAbs >= 1.05 ? "s" : "", dir: evd < 0 ? S.camera.applied.dirBright : S.camera.applied.dirDark }));
    measured.push(analysis.clipped >= CLIP_LIMIT ?
    S.camera.applied.colorsClipped :
    Math.abs(warmLog) < CAST_TOLERANCE ?
    S.camera.applied.colorsGood :
    fmt(S.camera.applied.colorsLeaned, { strength: Math.abs(warmLog) >= CAST_STRONG ? S.camera.applied.strengthStrong : S.camera.applied.strengthSlight, cast: castWord }));

    // what we changed, setting by setting
    if (before.wb !== after.wb) {
      changes.push({
        label: S.camera.applied.wbLabel,
        sub: fmt(S.camera.applied.wbChange, { from: before.wb, to: after.wb, cast: castWord })
      });
    }
    if (before.iso !== after.iso) {
      const stops = Math.log2(parseFloat(after.iso) / parseFloat(before.iso));
      changes.push({
        label: S.camera.applied.isoLabel,
        sub: fmt(S.camera.applied.isoChange, {
          from: before.iso, to: after.iso,
          n: Math.abs(stops).toFixed(1), s: Math.abs(stops) >= 1.05 ? "s" : "",
          dir: stops < 0 ? S.camera.applied.isoDirDarker : S.camera.applied.isoDirBrighter
        })
      });
    }
    if (before.aperture !== after.aperture) {
      changes.push({
        label: S.camera.applied.apertureLabel,
        sub: fmt(S.camera.applied.apertureChange, { from: before.aperture, to: after.aperture })
      });
    }
    // Findings we could NOT fix deserve a row too — never leave a found issue unexplained.
    if (Math.abs(warmLog) > CAST_TOLERANCE && analysis.clipped < CLIP_LIMIT && before.wb === after.wb && !(rejected && rejected.wb)) {
      const needWarmer = warmLog < 0; // image is cool → needs a warmer WB setting
      changes.push({
        label: S.camera.applied.castNotFixedLabel,
        sub: fmt(S.camera.applied.castNotFixed, {
          limit: needWarmer ? S.camera.applied.limitWarmest : S.camera.applied.limitCoolest,
          wb: before.wb,
          look: needWarmer ? S.camera.applied.lookBlue : S.camera.applied.lookOrange
        }),
        warn: true
      });
    }
    if (Math.abs(evd) >= EV_TOLERANCE && before.iso === after.iso && before.aperture === after.aperture && !(rejected && rejected.iso)) {
      changes.push({
        label: S.camera.applied.brightnessNotFixedLabel,
        sub: S.camera.applied.brightnessNotFixed,
        warn: true
      });
    }
    if (!changes.length) changes.push({ label: S.camera.applied.noChangesLabel, sub: S.camera.applied.noChanges });
    for (const k of Object.keys(rejected || {})) {
      changes.push({ label: fmt(S.camera.applied.rejectedLabel, { key: k }), sub: fmt(S.camera.applied.rejected, { key: k, value: rejected[k] }), warn: true });
    }
  }

  return (
    <>
      <div className="s-body">
        <div className="s-screen s-screen--wide s-fadeup">
          <div className="s-hero-ic s-hero-ic--sm s-hero-ic--pass">
            <SI.check size={40} />
          </div>
          <h1 className="s-h1 s-h1--small">{S.camera.applied.title}</h1>
          <p className="s-lede">
            {result && !result.analysis ? S.camera.applied.ledeUncalibrated : S.camera.applied.lede}
          </p>

          {result && result.refreshFailed &&
          <div className="s-cam-warn" style={{ maxWidth: 640 }}>
            <SI.warn size={16} />
            <span>{S.camera.applied.refreshFailed}</span>
          </div>
          }
          <div className="s-summary-grid">
          <div className="s-summary-card">
            <div className="s-summary-head">{S.camera.applied.foundHead}</div>
            {measured.map((m, i) =>
            <div key={i} className="s-summary-row">
                <SI.info size={15} />
                <span>{m}</span>
              </div>
            )}
          </div>

          <div className="s-summary-card">
            <div className="s-summary-head">{S.camera.applied.fixedHead}</div>
            {changes.map((s, i) =>
            <div key={i} className="s-summary-row">
                <span className={`s-fix-ic ${s.warn ? "s-fix-ic--warn" : ""}`}>
                  {s.warn ? <SI.warn size={14} /> : <SI.check size={14} />}
                </span>
                <div className="s-fix-body">
                  <b>{s.label}</b>
                  <span>{s.sub}</span>
                </div>
                {!s.warn && <span className="s-fix-set"><SI.check size={14} /> {S.common.set}</span>}
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
      <SimpleFoot
        primary={
        <div style={{ display: "flex", gap: 16 }}>
            <button className="s-btn s-btn--warn s-btn--xl" onClick={() => setStage("shoot")}>
              <SI.retake size={16} /> {S.camera.applied.redoGreyCard}
            </button>
            <button className="s-btn s-btn--primary s-btn--xl" onClick={onNext}>
              {S.common.continue} <SI.arrow size={20} />
            </button>
          </div>
        } />
    </>);
}

// ============================================================
// Drag-to-select region over the calibration photo
// ============================================================
function RegionSelect({ src, box, setBox, onDone, busy }) {
  const wrapRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const rel = (e) => {
    // The stage is scaled with a CSS transform, so viewport px ≠ layout px.
    // Convert through the scale factor so the box and pixel math line up.
    const el = wrapRef.current;
    const r = el.getBoundingClientRect();
    const sx = r.width / el.clientWidth || 1;
    const sy = r.height / el.clientHeight || 1;
    return {
      x: Math.min(Math.max((e.clientX - r.left) / sx, 0), el.clientWidth),
      y: Math.min(Math.max((e.clientY - r.top) / sy, 0), el.clientHeight),
      r: { width: el.clientWidth, height: el.clientHeight }
    };
  };
  const norm = (x0, y0, x1, y1) => ({
    x: Math.min(x0, x1), y: Math.min(y0, y1),
    w: Math.abs(x1 - x0), h: Math.abs(y1 - y0)
  });

  const down = (e) => {
    if (busy) return;
    e.preventDefault();
    const p = rel(e);
    dragRef.current = { x0: p.x, y0: p.y, moved: false };
    setBox(null);
  };
  const move = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const p = rel(e);
    if (Math.abs(p.x - d.x0) + Math.abs(p.y - d.y0) > 6) d.moved = true;
    if (d.moved) setBox(norm(d.x0, d.y0, p.x, p.y));
  };
  const up = (e) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d || busy) return;
    const p = rel(e);
    let b;
    if (d.moved && Math.abs(p.x - d.x0) > 10 && Math.abs(p.y - d.y0) > 10) {
      b = norm(d.x0, d.y0, p.x, p.y);
    } else {
      // single tap → sample a small square around the point
      const s = Math.min(p.r.width, p.r.height) * 0.08;
      b = { x: d.x0 - s / 2, y: d.y0 - s / 2, w: s, h: s };
    }
    // The box now persists for an explicit confirm/discard (the check/X
    // badges below) instead of advancing immediately -- onDone only fires
    // once the operator taps the checkmark.
    setBox(b);
  };

  const confirm = () => { if (box && !busy) onDone(box, imgRef.current); };
  const discard = () => { if (!busy) setBox(null); };

  return (
    <div
      ref={wrapRef}
      className={`s-photo s-photo--portrait ${busy ? "" : "s-photo--clickable"}`}
      onMouseDown={down} onMouseMove={move} onMouseUp={up}
      onMouseLeave={() => { dragRef.current = null; }}>
      <img
        ref={imgRef}
        src={src}
        alt="Calibration photo"
        draggable={false}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
      {box &&
      <div className="s-selbox" style={{ left: box.x, top: box.y, width: box.w, height: box.h }}>
        {!busy &&
        <>
          <button
            type="button"
            className="s-selbox-btn s-selbox-btn--confirm"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={confirm}
            aria-label={S.camera.select.confirmBox}>
            <SI.check size={14} />
          </button>
          <button
            type="button"
            className="s-selbox-btn s-selbox-btn--discard"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={discard}
            aria-label={S.camera.select.discardBox}>
            <SI.close size={14} />
          </button>
        </>
        }
      </div>
      }
      {!box && !busy &&
      <div className="s-photo-pill" style={{ background: "rgba(0,0,0,0.55)" }}>
        {S.camera.select.pill}
      </div>
      }
    </div>);
}

// ============================================================
// Grey-card illustration for the intro stage
// ============================================================
function GreyCardDemo() {
  return (
    <div className="s-greycard-demo">
      <img
        src={window.__resources.greyCard}
        alt="Santa holding a grey card against his chest"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>);

}

// ============================================================
// Grey-card overlay placed over the SantaScene
// `live`: true → small subtle hint; false → larger, clear target
// ============================================================
function GreyCardOverlay({ live, portrait }) {
  // Positioned over the grey card / tablet the character holds.
  // Use percent positions for responsive scaling.
  const pos = portrait ?
  { left: "49%", top: "48%", width: "26%", height: "10%" } :
  { left: "44%", top: "52%", width: "12%", height: "11%" };
  return (
    <div style={{
      position: "absolute",
      left: pos.left, top: pos.top,
      width: pos.width, height: pos.height,
      transform: "translate(-50%, -50%)",
      background: "linear-gradient(160deg, #909090, #7a7a7a 50%, #6a6a6a)",
      border: "2px solid #f4f6fa",
      borderRadius: 4,
      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      display: "grid",
      placeItems: "center",
      pointerEvents: "none"
    }}>
      <span style={{
        fontFamily: "Geist, sans-serif",
        fontSize: portrait ? 11 : 12,
        fontWeight: 600,
        color: "#f4f6fa",
        letterSpacing: "0.1em",
        textShadow: "0 1px 2px rgba(0,0,0,0.5)"
      }}>
        GREY CARD
      </span>
      {!live &&
      <div style={{
        position: "absolute", inset: -10,
        border: "2px dashed #5eead4",
        borderRadius: 8,
        animation: "s-pulse-soft 1.6s ease-in-out infinite"
      }} />
      }
    </div>);

}

// Animated "tap here" hint
function TapHint({ portrait }) {
  return (
    <div style={{
      position: "absolute",
      left: portrait ? "50%" : "44%",
      top: portrait ? "57%" : "62%",
      transform: "translateX(-50%)",
      pointerEvents: "none",
      fontFamily: "Geist, sans-serif",
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "white",
      background: "rgba(0,0,0,0.6)",
      padding: "6px 12px",
      borderRadius: 6,
      border: "1px solid rgba(94,234,212,0.5)",
      whiteSpace: "nowrap"
    }}>
      ↑ Click here
    </div>);

}

// Marker placed where the operator clicked
function TapMarker({ x, y }) {
  return (
    <div style={{
      position: "absolute",
      left: `${x}%`, top: `${y}%`,
      transform: "translate(-50%, -50%)",
      pointerEvents: "none"
    }}>
      {/* ripple */}
      <div style={{
        position: "absolute",
        left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        width: 64, height: 64, borderRadius: "50%",
        border: "2px solid #5eead4",
        animation: "s-ripple 1.4s ease-out infinite"
      }} />
      {/* dot */}
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        background: "#5eead4",
        border: "3px solid white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 0 0 4px rgba(94,234,212,0.3)"
      }} />
    </div>);

}

// ============================================================
// Screen 4 — Test photo (capture + guided QA review)
// Review is a sequence of operator checks:
//   1. centered?  (dotted placement overlay until answered)
//   2. crisp?     (No → autofocus help)
//   3. colors ok? (multi-select; problems auto-adjust the camera + retake)
// ============================================================

// Dotted seated-person guide overlaid on the photo while centering is
// unconfirmed. Admin-adjustable via Settings: offsetXPct/offsetYPct nudge
// position, scalePct resizes, and customSrc swaps the built-in SVG for an
// uploaded image entirely — all three as a CSS transform on the outer
// element so the tuned default artwork itself never needs to change.
const DEFAULT_FRAMING_GUIDE = "assets/framing-guide-default.png";
// Field-tuned "zero" resting position for the overlay sliders — matches
// defaultSettings().overlay in main.js. Reset to default returns here.
const DEFAULT_OVERLAY = { offsetXPct: 0, offsetYPct: 9, scalePct: 87, customImagePath: null };

function CenterGuide({ offsetXPct = 0, offsetYPct = 0, scalePct = 100, customSrc = null }) {
  // Falls back to the hand-drawn SVG guide below if neither an admin-uploaded
  // overlay nor the bundled default image can load (e.g. file went missing).
  const [imgFailed, setImgFailed] = React.useState(false);
  React.useEffect(() => setImgFailed(false), [customSrc]);

  const wrapStyle = {
    position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
    transform: `translate(${offsetXPct}%, ${offsetYPct}%) scale(${scalePct / 100})`,
  };

  if (!imgFailed) {
    return (
      <img
        src={customSrc || DEFAULT_FRAMING_GUIDE}
        alt=""
        onError={() => setImgFailed(true)}
        style={{ ...wrapStyle, objectFit: "contain" }} />);

  }

  const stroke = {
    fill: "rgba(94,234,212,0.05)", stroke: "#5eead4", strokeWidth: 2,
    strokeDasharray: "3 2.5", vectorEffect: "non-scaling-stroke",
    strokeLinecap: "round", strokeLinejoin: "round"
  };
  return (
    <svg viewBox="0 0 100 150" preserveAspectRatio="none" style={wrapStyle}>
      {/* head */}
      <ellipse cx="50" cy="58" rx="14" ry="15" {...stroke} />
      {/* 3/4 bust: broad shoulders, torso runs off the bottom of the frame */}
      <path
        d="M15 150
           C15 144 16 118 19 102
           C21 89 28 80 37 76
           C42 74 58 74 63 76
           C72 80 79 89 81 102
           C84 118 85 144 85 150"
        {...stroke} />
      {/* center line */}
      <line x1="50" y1="8" x2="50" y2="144" stroke="#5eead4" strokeWidth="1"
        strokeDasharray="1 3" opacity="0.4" vectorEffect="non-scaling-stroke" />
    </svg>);

}

// file:// URL for a local overlay image path (Windows paths need forward
// slashes and a triple slash after the scheme).
function toFileUrl(p) {
  return p ? "file:///" + p.replace(/\\/g, "/") : null;
}

// EV nudges for each color complaint (strobe-lit set: exposure moves via ISO,
// aperture only ever stops down). Values are starting points — tune in field.
const COLOR_FIX_EV = { bright: -1, dark: 1, washed: -2 / 3, saturated: -1 / 3 };
const COLOR_FIXES = [
{ key: "bright", ev: COLOR_FIX_EV.bright },
{ key: "dark", ev: COLOR_FIX_EV.dark },
{ key: "washed", ev: COLOR_FIX_EV.washed },
{ key: "saturated", ev: COLOR_FIX_EV.saturated }];

const COLOR_FIX_LABELS = () => ({
  bright: S.testPhoto.colorTooBright,
  dark: S.testPhoto.colorTooDark,
  washed: S.testPhoto.colorWashedOut,
  saturated: S.testPhoto.colorOverSaturated
});

function ScreenTestPhoto({ onNext, onBack, onSkip, settings }) {
  const overlay = settings.overlay || {};
  const [stage, setStage] = React.useState("aim"); // "aim" | "review"
  const [photo, setPhoto] = React.useState(null);
  const [camSettings, setCamSettings] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [camError, setCamError] = React.useState(null);
  const [adjustNote, setAdjustNote] = React.useState(null); // shown on aim after auto-fix
  // QA answers
  const [centered, setCentered] = React.useState(null); // null | true | false
  const [crisp, setCrisp] = React.useState(null); // null | true | false
  const [colorSel, setColorSel] = React.useState([]); // ["yes"] or fix keys
  // Counts failed attempts per question so "Skip and continue" only shows
  // up once a retake has already failed to fix it once -- an escape hatch
  // for a real hardware/lighting problem the operator can't self-resolve,
  // so a single stubborn check doesn't strand them here indefinitely.
  const [centeredFails, setCenteredFails] = React.useState(0);
  const [crispFails, setCrispFails] = React.useState(0);
  const [colorFails, setColorFails] = React.useState(0);

  React.useEffect(() => {
    if (cam) cam.settings().then(setCamSettings).catch(() => {});
  }, []);

  // Retakes triggered from inside a QA card keep the earlier answers so the
  // operator lands back on the card they came from (keep: 0 = re-answer all,
  // 1 = keep "centered", 2 = keep "centered" + "crisp"). Colors always re-ask.
  const [pendingKeep, setPendingKeep] = React.useState(0);

  const takePhoto = async (keep = 0) => {
    setBusy(true); setCamError(null);
    try {
      const p = await cam.capture();
      setPhoto(p.dataUrl);
      if (keep < 1) setCentered(null);
      if (keep < 2) setCrisp(null);
      setColorSel([]);
      setPendingKeep(0);
      setAdjustNote(null);
      const s = await cam.settings().catch(() => null);
      if (s) setCamSettings(s);
      setStage("review");
    } catch (e) {
      setCamError(errText(e));
    } finally { setBusy(false); }
  };

  // Apply exposure fixes for the selected color problems, then send the
  // operator back to take a fresh test photo.
  const applyColorFixes = async () => {
    setBusy(true); setCamError(null);
    try {
      const ev = Math.max(-2, Math.min(2,
      colorSel.reduce((sum, k) => {
        const f = COLOR_FIXES.find((x) => x.key === k);
        return sum + (f ? f.ev : 0);
      }, 0)));
      const plan = {};
      const labels = [];
      const limits = settings.cameraLimits || {};
      const curIso = parseFloat(camSettings && camSettings.iso);
      if (ev !== 0 && curIso > 0) {
        const isoFloor = Math.max(100, limits.isoMin ?? 100);
        const isoCeil = Math.min(25600, limits.isoMax ?? 25600);
        const isoCandidates = (camSettings.isoValues || []).filter((v) => {
          const n = parseFloat(v);
          return n >= isoFloor && n <= isoCeil;
        });
        const newIso = nearestValue(isoCandidates, curIso * Math.pow(2, ev));
        if (newIso && newIso !== camSettings.iso) {
          plan.iso = newIso;
          labels.push(`ISO ${camSettings.iso} → ${newIso}`);
        }
        // darkening beyond ISO's floor → stop the aperture down
        const isoAfter = parseFloat(newIso || camSettings.iso);
        const remaining = ev - Math.log2(isoAfter / curIso);
        const curN = parseFloat(camSettings.aperture);
        if (remaining <= -0.4 && curN > 0) {
          const apertureCeil = limits.apertureMax ?? Infinity;
          const apertureFloor = Math.max(curN, limits.apertureMin ?? -Infinity);
          const stopDownValues = (camSettings.apertureValues || []).filter((v) => {
            const n = parseFloat(v);
            return n >= apertureFloor && n <= apertureCeil;
          });
          const newN = nearestValue(stopDownValues, curN * Math.pow(2, -remaining / 2));
          if (newN && newN !== camSettings.aperture) {
            plan.aperture = newN;
            labels.push(`f/${camSettings.aperture} → f/${newN}`);
          }
        }
      }
      if (Object.keys(plan).length) {
        await cam.set(plan);
        let after = null;
        try { after = await cam.settings(); } catch {}
        setCamSettings(after || { ...camSettings, ...plan });
        setAdjustNote(fmt(S.testPhoto.adjustedNote, { changes: labels.join(", ") }));
      } else {
        setAdjustNote(S.testPhoto.atLimitNote);
      }
      setColorFails((n) => n + 1);
      setPendingKeep(2);
      setStage("aim");
    } catch (e) {
      setCamError(errText(e));
    } finally { setBusy(false); }
  };

  // ---------- Stage: aim ----------
  if (stage === "aim") {
    return (
      <>
        <div className="s-body">
          <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
            <div className="s-stage s-stage--reverse">
              <div className="s-stage-photo-col">
                <div className="s-photo s-photo--portrait">
                  {photo ?
                  <img src={photo} alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.45 }} /> :
                  <div className="s-photo-placeholder">
                    <SI.camera size={64} />
                    <span>{S.testPhoto.photoPlaceholder}</span>
                  </div>
                  }
                </div>
                <SettingsStrip s={camSettings} />
              </div>
              <div className="s-stage-side">
                <h1 className="s-h1 s-h1--small s-h1--left">{adjustNote ? S.testPhoto.retakeTitle : S.testPhoto.aimTitle}</h1>
                <p className="s-lede s-lede--left">
                  {adjustNote ? S.testPhoto.retakeLede : S.testPhoto.aimLede}
                </p>
                {adjustNote &&
                <div className="s-cam-warn">
                  <SI.retake size={16} />
                  <span>{adjustNote}</span>
                </div>
                }
                {/* setup steps only matter on the first shot — skip them on adjust-retakes */}
                {!adjustNote &&
                <ul className="s-checklist s-checklist--grouped">
                  <li>
                    <span className="s-checklist-dot" />
                    <div>
                      <b>{S.testPhoto.setup1Title}</b>
                      <span>{S.testPhoto.setup1Text}</span>
                    </div>
                  </li>
                  <li>
                    <span className="s-checklist-dot" />
                    <div>
                      <b>{S.testPhoto.setup2Title}</b>
                      <span>{S.testPhoto.setup2Text}</span>
                    </div>
                  </li>
                  <li>
                    <span className="s-checklist-dot" />
                    <div>
                      <b>{S.testPhoto.setup3Title}</b>
                      <span>{S.testPhoto.setup3Text}</span>
                    </div>
                  </li>
                </ul>
                }
                {camError && <div className="s-cam-error"><SI.warn size={16} /> {camError}</div>}
              </div>
            </div>
          </div>
        </div>
        <SimpleFoot
          left={null}
          back={<button className="s-btn s-btn--back" disabled={busy} onClick={onBack}><SI.back /> {S.common.back}</button>}
          skip={<SkipButton onClick={onSkip} />}
          primary={
          <button className="s-btn s-btn--primary s-btn--xl" disabled={busy} onClick={() => takePhoto(pendingKeep)}>
              {busy ? <><div className="s-spinner" /> {S.common.takingPhoto}</> : <><SI.shutter size={22} /> {S.common.takePhoto}</>}
            </button>
          } />
      </>);
  }

  // ---------- Stage: review (guided QA) ----------
  const activeCard = centered !== true ? 0 : crisp !== true ? 1 : 2;
  const colorsYes = colorSel.includes("yes");
  const fixesSelected = colorSel.filter((k) => k !== "yes");
  const colorLabels = COLOR_FIX_LABELS();

  const toggleColor = (key) => {
    setColorSel((sel) => {
      if (key === "yes") return sel.includes("yes") ? [] : ["yes"]; // exclusive
      const without = sel.filter((k) => k !== "yes");
      return without.includes(key) ? without.filter((k) => k !== key) : [...without, key];
    });
  };

  const qaCards = [
  {
    title: S.testPhoto.q1Title,
    sub: S.testPhoto.q1Sub,
    state: centered === true ? "done" : activeCard === 0 ? "active" : "pending"
  },
  {
    title: S.testPhoto.q2Title,
    sub: S.testPhoto.q2Sub,
    state: crisp === true ? "done" : activeCard === 1 ? "active" : "pending"
  },
  {
    title: S.testPhoto.q3Title,
    sub: S.testPhoto.q3Sub,
    state: colorsYes ? "done" : activeCard === 2 ? "active" : "pending"
  }];

  return (
    <>
      <div className="s-body">
        <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
          <div className="s-stage s-stage--reverse">
            <div className="s-stage-photo-col">
              <div className="s-photo s-photo--portrait">
                <img
                  src={photo}
                  alt=""
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                {centered !== true &&
                <CenterGuide
                  offsetXPct={overlay.offsetXPct}
                  offsetYPct={overlay.offsetYPct}
                  scalePct={overlay.scalePct}
                  customSrc={toFileUrl(overlay.customImagePath)} />
                }
                <div className="s-photo-pill s-photo-pill--taken">
                  <SI.check size={14} /> {S.testPhoto.photoTakenPill}
                </div>
              </div>
              <SettingsStrip s={camSettings} />
            </div>
            <div className="s-stage-side">
              <h1 className="s-h1 s-h1--small s-h1--left">{S.testPhoto.reviewTitle}</h1>

              <div className="s-qa">
                {/* Card 1 — centered */}
                <div className={`s-qa-card s-qa-card--${qaCards[0].state}`}>
                  <div className="s-qa-head">
                    <span className="s-qa-mark">{qaCards[0].state === "done" ? <SI.check size={14} /> : "1"}</span>
                    <div>
                      <div className="s-qa-title">{qaCards[0].title}</div>
                      {qaCards[0].state !== "done" && <div className="s-qa-sub">{qaCards[0].sub}</div>}
                    </div>
                    {qaCards[0].state === "done" &&
                    <button className="s-qa-change" onClick={() => setCentered(null)}>{S.testPhoto.change}</button>
                    }
                  </div>
                  {qaCards[0].state === "active" &&
                  <>
                    <div className="s-qa-actions">
                      <button className="s-btn s-qa-yes" onClick={() => setCentered(true)}>{S.common.yes}</button>
                      <button className="s-btn" onClick={() => { setCentered(false); setCenteredFails((n) => n + 1); }}>{S.common.no}</button>
                      {centeredFails > 0 &&
                      <button className="s-btn s-qa-skip-continue" onClick={() => setCentered(true)}>
                        <SI.skip size={14} /> {S.testPhoto.skipAndContinue}
                      </button>
                      }
                    </div>
                    {centered === false &&
                    <div className="s-qa-help">
                      {S.testPhoto.q1Help}
                      <button className="s-btn s-qa-retake" disabled={busy} onClick={() => takePhoto(0)}>
                        <SI.retake size={14} /> {S.testPhoto.takeAnotherPhoto}
                      </button>
                    </div>
                    }
                  </>
                  }
                </div>

                {/* Card 2 — crisp */}
                <div className={`s-qa-card s-qa-card--${qaCards[1].state}`}>
                  <div className="s-qa-head">
                    <span className="s-qa-mark">{qaCards[1].state === "done" ? <SI.check size={14} /> : "2"}</span>
                    <div>
                      <div className="s-qa-title">{qaCards[1].title}</div>
                      {qaCards[1].state !== "done" && <div className="s-qa-sub">{qaCards[1].sub}</div>}
                    </div>
                    {qaCards[1].state === "done" &&
                    <button className="s-qa-change" onClick={() => setCrisp(null)}>{S.testPhoto.change}</button>
                    }
                  </div>
                  {qaCards[1].state === "active" &&
                  <>
                    <div className="s-qa-actions">
                      <button className="s-btn s-qa-yes" onClick={() => setCrisp(true)}>{S.common.yes}</button>
                      <button className="s-btn" onClick={() => { setCrisp(false); setCrispFails((n) => n + 1); }}>{S.common.no}</button>
                      {crispFails > 0 &&
                      <button className="s-btn s-qa-skip-continue" onClick={() => setCrisp(true)}>
                        <SI.skip size={14} /> {S.testPhoto.skipAndContinue}
                      </button>
                      }
                    </div>
                    {crisp === false &&
                    <div className="s-qa-help">
                      {S.testPhoto.q2HelpBefore}<b>{S.testPhoto.q2HelpAF}</b>{S.testPhoto.q2HelpAfter}
                      <button className="s-btn s-qa-retake" disabled={busy} onClick={() => takePhoto(1)}>
                        <SI.retake size={14} /> {S.testPhoto.takeAnotherPhoto}
                      </button>
                    </div>
                    }
                  </>
                  }
                </div>

                {/* Card 3 — colors (multi-select) */}
                <div className={`s-qa-card s-qa-card--${qaCards[2].state}`}>
                  <div className="s-qa-head">
                    <span className="s-qa-mark">{qaCards[2].state === "done" ? <SI.check size={14} /> : "3"}</span>
                    <div>
                      <div className="s-qa-title">{qaCards[2].title}</div>
                      {qaCards[2].state !== "done" && <div className="s-qa-sub">{qaCards[2].sub}</div>}
                    </div>
                    {qaCards[2].state === "done" &&
                    <button className="s-qa-change" onClick={() => setColorSel([])}>{S.testPhoto.change}</button>
                    }
                  </div>
                  {activeCard === 2 && !colorsYes &&
                  <>
                    <div className="s-qa-chips">
                      <button
                      className={`s-qa-chip s-qa-chip--yes ${colorSel.includes("yes") ? "s-qa-chip--on" : ""}`}
                      onClick={() => toggleColor("yes")}>
                        {S.testPhoto.colorYes}
                      </button>
                      <span className="s-qa-divider" />
                      {COLOR_FIXES.map((f) =>
                    <button
                      key={f.key}
                      className={`s-qa-chip ${colorSel.includes(f.key) ? "s-qa-chip--on" : ""}`}
                      onClick={() => toggleColor(f.key)}>
                          {colorLabels[f.key]}
                        </button>
                    )}
                    </div>
                    {fixesSelected.length > 0 &&
                    <div className="s-qa-help">
                      {S.testPhoto.colorFixHelp}
                      <button className="s-btn s-btn--primary s-qa-retake" disabled={busy} onClick={applyColorFixes}>
                        {busy ? <><div className="s-spinner" /> {S.testPhoto.adjusting}</> : <>{S.testPhoto.adjustAndRetake}</>}
                      </button>
                    </div>
                    }
                    {colorFails > 0 &&
                    <button
                      className="s-btn s-qa-skip-continue"
                      style={{ marginTop: 10 }}
                      onClick={() => setColorSel(["yes"])}>
                        <SI.skip size={14} /> {S.testPhoto.skipAndContinue}
                      </button>
                    }
                  </>
                  }
                </div>
              </div>

              {camError && <div className="s-cam-error"><SI.warn size={16} /> {camError}</div>}
            </div>
          </div>
        </div>
      </div>
      <SimpleFoot
        skip={<SkipButton onClick={onSkip} />}
        primary={
        <div style={{ display: "flex", gap: 16 }}>
            <button className="s-btn s-btn--warn s-btn--xl" disabled={busy} onClick={() => takePhoto(0)}>
              <SI.retake size={16} /> {S.camera.select.retakePhoto}
            </button>
            <button className="s-btn s-btn--primary s-btn--xl" disabled={!colorsYes || busy} onClick={onNext}>
              <SI.check size={20} /> {S.testPhoto.looksGood}
            </button>
          </div>
        } />
    </>);
}

// ============================================================
// Screen 5 — Done
// ============================================================
function ScreenDone({ onRestart, run, settings }) {
  const durationSec = run ? Math.max(0, Math.round((Date.now() - new Date(run.startedAt).getTime()) / 1000)) : null;
  const [closing, setClosing] = React.useState(false);
  const [rpsError, setRpsError] = React.useState(false);
  // The exit app is one selectable default now (Settings > General >
  // App Defaults) -- stations that don't run one can turn it off, and can
  // name it something other than RPS.
  const rpsEnabled = !settings || settings.rpsLaunchEnabled !== false;
  const exitAppName = (settings && settings.rpsAppName) || "RPS";

  const launch = async () => {
    if (closing) return;
    setClosing(true);
    if (run && window.cfc && window.cfc.runs) {
      window.cfc.runs.save({
        type: "check_completed",
        runId: run.id,
        startedAt: run.startedAt,
        completedAt: new Date().toISOString(),
        durationSec
      }).catch(() => {});
    }
    // Closing the session alone isn't reliable — the vendor SDK ties the USB
    // claim to the CameraHost.exe process, not just the session, so RPS can
    // still find the camera busy even after a successful release(). Wait for
    // the helper process to actually exit before handing off to RPS.
    if (cam) { try { await cam.releaseForHandoff(); } catch {} }
    let rpsOk = true;
    if (rpsEnabled && window.cfc && window.cfc.launchRps) {
      const r = await window.cfc.launchRps().catch(() => ({ ok: false }));
      rpsOk = !!(r && r.ok);
    }
    const done = () => window.cfc ? window.cfc.close() : null;
    if (!rpsOk) {
      setRpsError(true);
      setTimeout(done, 2200); // give them a moment to read why before closing anyway
      return;
    }
    const e = document.getElementById("simple-launch");
    if (e) {
      e.style.opacity = "1";
      e.style.pointerEvents = "auto";
    }
    setTimeout(done, 1600);
  };

  return (
    <>
      <div className="s-body">
        <div className="s-screen s-fadeup">
          <div className="s-hero-ic s-hero-ic--pass">
            <SI.trophy size={84} />
          </div>
          <h1 className="s-h1">{S.done.title}</h1>
          <p className="s-lede">
            {S.done.lede}
          </p>

          {rpsError &&
          <div className="s-cam-error" style={{ maxWidth: 480 }}>
            <SI.warn size={16} /> {S.done.rpsNotFound}
          </div>
          }

          <div className="s-result">
            <div className="s-checklist-line"><SI.check size={18} /> {S.done.result1}</div>
            <div className="s-checklist-line"><SI.check size={18} /> {S.done.result2}</div>
            <div className="s-checklist-line"><SI.check size={18} /> {S.done.result3}</div>
          </div>
        </div>
      </div>
      <SimpleFoot
        back={<button className="s-btn s-btn--back" onClick={onRestart} disabled={closing}>{S.done.startOver}</button>}
        primary={
        <button className="s-btn s-btn--primary s-btn--xl" onClick={launch} disabled={closing}>
            {closing ? <><div className="s-spinner" /> {S.done.closing}</> : <><SI.camera size={22} /> {rpsEnabled ? fmt(S.done.closeAndOpenApp, { name: exitAppName }) : S.done.closeOnly}</>}
          </button>
        } />

    </>);

}

// ============================================================
// Help modal
// ============================================================
function HelpModal({ onClose, settings }) {
  const contacts = settings.helpContacts || [];
  const docs = settings.helpDocs || [];

  const openDoc = async (doc) => {
    if (!(window.cfc && window.cfc.help)) return;
    try { await window.cfc.help.openDoc(doc); } catch {}
  };

  return (
    <div className="s-help" onClick={onClose}>
      <div className="s-help-card" onClick={(e) => e.stopPropagation()}>
        <button className="s-info-close" onClick={onClose} aria-label="Close">
          <SI.close size={18} />
        </button>
        <h3>{S.help.title}</h3>
        <ul className="s-help-list">
          <li>{S.help.bodyLine0}</li>
          <li>{S.help.bodyLine1}</li>
          <li>{S.help.bodyLine2}</li>
        </ul>
        <hr className="s-help-hr" />
        <div className="s-help-cols">
          <div className="s-help-col">
            <div className="s-help-col-title s-help-col-title--doc">{S.help.docsEyebrow}</div>
            <div className="s-help-col-list">
              {docs.map((d, i) =>
              <button className="s-help-contact s-help-doc" key={"doc" + i} onClick={() => openDoc(d)}>
                  <div className="s-help-name">
                    {d.localFile ? <SI.file size={16} /> : <SI.link size={16} />} {d.name}
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="s-help-col">
            <div className="s-help-col-title s-help-col-title--contact">{S.help.contactsTitle}</div>
            <div className="s-help-col-list">
              {contacts.map((c, i) =>
              <div className="s-help-contact" key={i}>
                  <div className="s-help-contact-title">{c.title}</div>
                  {c.description && <div className="s-help-desc">{c.description}</div>}
                  {c.phone &&
                <div className="s-help-phone">
                      <SI.phone size={16} /> {c.phone}
                    </div>
                }
                  {c.email &&
                <div className="s-help-phone">
                      <SI.mail size={16} /> {c.email}
                    </div>
                }
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="s-help-actions">
          <button className="s-btn s-btn--ghost" onClick={onClose}>{S.common.close}</button>
        </div>
      </div>
    </div>);

}

// Fallback vocabulary shown when no camera is connected to ask its own list —
// covers both Canon and Nikon preset names (see WB_KELVIN above).
const WB_VOCAB_FALLBACK = Object.keys(WB_KELVIN).concat(["Auto", "Custom"]);

// ============================================================
// Admin Settings screen (gear icon in the header) — location/station,
// data folder + skip-reason toggle, camera setting limits, and the
// test-photo overlay editor. Edits a local draft; only written to disk
// (via settings:save) and applied to the running app on "Save changes".
// ============================================================
function SettingsScreen({ settings, onSave, onClose, locked, onUnlock }) {
  const T = S.settingsScreen;
  const [draft, setDraft] = React.useState(settings);
  const [saving, setSaving] = React.useState(false);
  const [camWb, setCamWb] = React.useState(null); // wbValues from a connected camera, if any
  const [activeGroup, setActiveGroup] = React.useState("general");
  const [overlayPhoto, setOverlayPhoto] = React.useState(null); // real capture, shown under the guide for placement reference
  const [overlayCapturing, setOverlayCapturing] = React.useState(false);
  const [overlayCamError, setOverlayCamError] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  // Reveal-password stays available only while a password is being created
  // for the first time -- once one is saved, changing it means typing a new
  // one blind, same as any other password field. Read from the original
  // `settings` prop (not the live draft) so toggling this doesn't shift
  // under someone mid-edit.
  const hasExistingPassword = !!settings.settingsPassword;

  const groups = [
    { key: "general", label: T.groupGeneral, icon: <SI.pin size={16} /> },
    { key: "camera", label: T.groupCamera, icon: <SI.gear size={16} /> },
    { key: "overlay", label: T.groupOverlay, icon: <SI.framing size={16} /> },
    { key: "help", label: T.groupHelp, icon: <SI.help size={16} /> }
  ];

  React.useEffect(() => {
    if (cam) {
      cam.settings()
        .then((s) => setCamWb((s.wbValues || []).length ? s.wbValues : null))
        .catch(() => {});
    }
  }, []);

  const wbOptions = camWb || WB_VOCAB_FALLBACK;
  const allowedWb = draft.cameraLimits.allowedWb; // null = every option allowed

  const setField = (group, key, value) => {
    setDraft((d) => key == null ? { ...d, [group]: value } : { ...d, [group]: { ...d[group], [key]: value } });
  };

  const toggleWb = (name) => {
    const current = allowedWb || wbOptions;
    const next = current.includes(name) ? current.filter((w) => w !== name) : [...current, name];
    setField("cameraLimits", "allowedWb", next.length === wbOptions.length ? null : next);
  };

  const numOrNull = (v) => v === "" ? null : Number(v);

  const pickPath = async (key) => {
    if (!(window.cfc && window.cfc.settings)) return;
    const dir = await window.cfc.settings.pickFolder();
    if (dir) setField("paths", key, dir);
  };

  const updateReason = (i, value) => {
    setDraft((d) => {
      const reasons = [...(d.skipReasons || [])];
      reasons[i] = value;
      return { ...d, skipReasons: reasons };
    });
  };
  const addReason = () => {
    setDraft((d) => ({ ...d, skipReasons: [...(d.skipReasons || []), ""] }));
  };
  const removeReason = (i) => {
    setDraft((d) => ({ ...d, skipReasons: (d.skipReasons || []).filter((_, idx) => idx !== i) }));
  };

  const pickImage = async () => {
    if (!(window.cfc && window.cfc.settings)) return;
    const p = await window.cfc.settings.pickImage();
    if (p) setField("overlay", "customImagePath", p);
  };

  const takeOverlayPhoto = async () => {
    if (!cam) return;
    setOverlayCapturing(true);
    setOverlayCamError(null);
    try {
      // The Settings screen can be opened before the main flow ever reaches
      // the Camera step, so the camera session may not exist yet — detect()
      // establishes it (same as ScreenCamera's auto stage) before capture()
      // is attempted, otherwise a real (non-simulated) camera reports back
      // as not connected even though it's plugged in and working.
      const d = await cam.detect();
      if (!d.connected) {
        setOverlayCamError(S.camera.detect.notFoundBody);
        return;
      }
      const p = await cam.capture();
      setOverlayPhoto(p.dataUrl);
    } catch (e) {
      setOverlayCamError(errText(e));
    } finally {
      setOverlayCapturing(false);
    }
  };

  // Shared by both the contacts and documentation lists -- move swaps an
  // entry with its neighbor (used by the reorder buttons), out-of-range
  // moves are a no-op so the buttons can stay unconditionally wired to
  // index -1/+1 and just get disabled at the ends.
  const moveItem = (listKey, i, dir) => {
    setDraft((d) => {
      const list = [...(d[listKey] || [])];
      const j = i + dir;
      if (j < 0 || j >= list.length) return d;
      [list[i], list[j]] = [list[j], list[i]];
      return { ...d, [listKey]: list };
    });
  };

  const updateContact = (i, field, value) => {
    setDraft((d) => {
      const contacts = [...(d.helpContacts || [])];
      contacts[i] = { ...contacts[i], [field]: value };
      return { ...d, helpContacts: contacts };
    });
  };
  const addContact = () => {
    setDraft((d) => ({
      ...d,
      helpContacts: [{ title: "", description: "", phone: "", email: "" }, ...(d.helpContacts || [])]
    }));
  };
  const removeContact = (i) => {
    setDraft((d) => ({ ...d, helpContacts: (d.helpContacts || []).filter((_, idx) => idx !== i) }));
  };

  const updateDoc = (i, field, value) => {
    setDraft((d) => {
      const docs = [...(d.helpDocs || [])];
      const next = { ...docs[i], [field]: value };
      // Local file and external URL are mutually exclusive -- setting one clears the other.
      if (field === "localFile" && value) next.externalUrl = "";
      if (field === "externalUrl" && value) next.localFile = "";
      docs[i] = next;
      return { ...d, helpDocs: docs };
    });
  };
  const addDoc = () => {
    setDraft((d) => ({
      ...d,
      helpDocs: [{ name: "", localFile: "", externalUrl: "" }, ...(d.helpDocs || [])]
    }));
  };
  const removeDoc = (i) => {
    setDraft((d) => ({ ...d, helpDocs: (d.helpDocs || []).filter((_, idx) => idx !== i) }));
  };
  const pickDocFile = async (i) => {
    if (!(window.cfc && window.cfc.settings)) return;
    const p = await window.cfc.settings.pickDocFile();
    if (p) updateDoc(i, "localFile", p);
  };

  const pickVideoPlayer = async () => {
    if (!(window.cfc && window.cfc.settings)) return;
    const p = await window.cfc.settings.pickDocFile();
    if (p) setField("videoPlayerPath", null, p);
  };

  const pickRpsPath = async () => {
    if (!(window.cfc && window.cfc.settings)) return;
    const p = await window.cfc.settings.pickDocFile();
    if (p) setField("rpsPath", null, p);
  };

  const save = async () => {
    setSaving(true);
    let result = draft;
    if (window.cfc && window.cfc.settings) {
      try { result = await window.cfc.settings.save(draft); } catch {}
    }
    setSaving(false);
    onSave(result);
    onClose();
  };

  return (
    <div className="s-info" onClick={onClose}>
      <div
        className={`s-settings-card s-fadeup ${activeGroup === "help" ? "s-settings-card--wide" : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true">
        <button className="s-info-close" onClick={onClose} aria-label={S.common.close}>
          <SI.close size={18} />
        </button>
        <h2 className="s-settings-title">{T.title}</h2>

        <div className="s-settings-content-wrap">
        <div className={`s-settings-flex ${locked ? "s-settings-blur" : ""}`}>
        <div className="s-settings-layout">
        <nav className="s-settings-nav">
          {groups.map((g) =>
          <button
            key={g.key}
            className={`s-settings-nav-item ${activeGroup === g.key ? "s-settings-nav-item--on" : ""}`}
            onClick={() => setActiveGroup(g.key)}>
              {g.icon} {g.label}
            </button>
          )}
        </nav>
        <div className="s-settings-body">
          {activeGroup === "general" &&
          <div className="s-settings-compact">
          <section className="s-settings-section">
            <h3>{T.locationTitle}</h3>
            <div className="s-form-row">
              <div className="s-field">
                <label>{T.locationNumberLabel}</label>
                <input
                  className="s-input"
                  value={draft.location.number}
                  placeholder={draft.hostname || T.locationNumberPlaceholder}
                  onChange={(e) => setField("location", "number", e.target.value)} />
              </div>
              <div className="s-field">
                <label>{T.locationNameLabel}</label>
                <input
                  className="s-input"
                  value={draft.location.name}
                  placeholder={T.locationNameNotFound} // name only ever comes from the mall CSV lookup
                  onChange={(e) => setField("location", "name", e.target.value)} />
              </div>
            </div>
            <div className="s-field" style={{ marginTop: 8 }}>
              <label>{T.stationLabel}</label>
              <input
                className="s-input"
                value={draft.location.station}
                placeholder={T.stationPlaceholder}
                onChange={(e) => setField("location", "station", e.target.value)} />
            </div>
          </section>

          <section className="s-settings-section">
            <h3>{T.dataTitle}</h3>
            <div className="s-field">
              <label>{T.pathCompletionLogs}</label>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="s-btn s-btn--ghost s-btn--sm" onClick={() => pickPath("completionLogs")}>{T.changeFolder}</button>
                <input className="s-input" style={{ flex: 1 }} value={draft.paths.completionLogs} readOnly />
              </div>
            </div>
            <div className="s-field" style={{ marginTop: 8 }}>
              <label>{T.pathTestPhotos}</label>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="s-btn s-btn--ghost s-btn--sm" onClick={() => pickPath("testPhotos")}>{T.changeFolder}</button>
                <input className="s-input" style={{ flex: 1 }} value={draft.paths.testPhotos} readOnly />
              </div>
            </div>
            <div className="s-field" style={{ marginTop: 8 }}>
              <label>{T.pathDiagnostics}</label>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="s-btn s-btn--ghost s-btn--sm" onClick={() => pickPath("diagnostics")}>{T.changeFolder}</button>
                <input className="s-input" style={{ flex: 1 }} value={draft.paths.diagnostics} readOnly />
              </div>
            </div>
            <label className="s-settings-toggle">
              <input
                type="checkbox"
                checked={!!draft.calibrationDiagnosticsEnabled}
                onChange={(e) => setField("calibrationDiagnosticsEnabled", null, e.target.checked)} />
              {T.calibrationDiagnosticsToggle}
            </label>
          </section>

          <section className="s-settings-section">
            <h3>{T.skipReasonsTitle}</h3>
            <label className="s-settings-toggle" style={{ marginTop: 0 }}>
              <input
                type="checkbox"
                checked={!!draft.skipReasonPrompt}
                onChange={(e) => setField("skipReasonPrompt", null, e.target.checked)} />
              {T.skipPromptToggle}
            </label>
            <button className="s-btn s-btn--ghost s-btn--sm" style={{ marginTop: 10, marginBottom: 8 }} onClick={addReason}>
              {T.skipReasonAdd}
            </button>
            {(draft.skipReasons || []).map((r, i) =>
            <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <input className="s-input" style={{ flex: 1 }} value={r} onChange={(e) => updateReason(i, e.target.value)} />
                <button className="s-btn s-btn--ghost s-btn--sm s-btn--danger" onClick={() => removeReason(i)}>{T.helpRemove}</button>
              </div>
            )}
          </section>

          <section className="s-settings-section">
            <h3>{T.exitCommandsTitle}</h3>
            <label className="s-settings-toggle" style={{ marginTop: 0 }}>
              <input
                type="checkbox"
                checked={!!draft.rpsLaunchEnabled}
                onChange={(e) => setField("rpsLaunchEnabled", null, e.target.checked)} />
              {T.rpsLaunchToggle}
            </label>
            {draft.rpsLaunchEnabled &&
            <div className="s-form-row" style={{ marginTop: 8 }}>
              <div className="s-field">
                <label>{T.rpsPathLabel}</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    className="s-input"
                    style={{ flex: 1 }}
                    value={draft.rpsPath}
                    readOnly
                    placeholder={T.rpsPathPlaceholder} />
                  <button className="s-btn s-btn--ghost s-btn--sm" onClick={pickRpsPath}>{T.helpDocBrowse}</button>
                </div>
              </div>
              <div className="s-field">
                <label>{T.rpsAppNameLabel}</label>
                <input
                  className="s-input"
                  value={draft.rpsAppName}
                  placeholder={T.rpsAppNamePlaceholder}
                  onChange={(e) => setField("rpsAppName", null, e.target.value)} />
              </div>
            </div>
            }
            <div className="s-field" style={{ marginTop: 12 }}>
              <label>{T.videoPlayerLabel}</label>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="s-btn s-btn--ghost s-btn--sm" onClick={pickVideoPlayer}>{T.helpDocBrowse}</button>
                <input
                  className="s-input"
                  style={{ flex: 1 }}
                  value={draft.videoPlayerPath}
                  readOnly
                  placeholder={T.videoPlayerPlaceholder} />
              </div>
            </div>
          </section>

          <section className="s-settings-section">
            <h3>{T.passwordTitle}</h3>
            <label className="s-settings-toggle">
              <input
                type="checkbox"
                checked={!!draft.settingsPasswordEnabled}
                onChange={(e) => setField("settingsPasswordEnabled", null, e.target.checked)} />
              {T.passwordEnableToggle}
            </label>
            {draft.settingsPasswordEnabled &&
            <div className="s-field" style={{ marginTop: 8 }}>
              <label>{T.passwordFieldLabel}</label>
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  className="s-input"
                  style={{ flex: 1 }}
                  type={showPassword ? "text" : "password"}
                  value={draft.settingsPassword}
                  placeholder={T.passwordPlaceholder}
                  onChange={(e) => setField("settingsPassword", null, e.target.value)} />
                {!hasExistingPassword &&
                <button
                  type="button"
                  className="s-btn s-btn--ghost s-btn--sm"
                  onClick={() => setShowPassword((v) => !v)}>
                  {showPassword ? T.passwordHide : T.passwordShow}
                </button>
                }
              </div>
            </div>
            }
          </section>
          </div>
          }

          {activeGroup === "camera" &&
          <>
          <section className="s-settings-section">
            <h3>{T.defaultsTitle}</h3>
            <p style={{ margin: "-4px 0 14px", color: "var(--text-2)", fontSize: 14 }}>{T.defaultsLede}</p>
            <div className="s-form-row">
              <div className="s-field">
                <label>{T.defaultsIso}</label>
                <input
                  className="s-input" type="number" placeholder="400"
                  value={draft.cameraDefaults.iso ?? ""}
                  onChange={(e) => setField("cameraDefaults", "iso", e.target.value)} />
              </div>
              <div className="s-field">
                <label>{T.defaultsShutter}</label>
                <input
                  className="s-input" placeholder="1/125"
                  value={draft.cameraDefaults.shutter ?? ""}
                  onChange={(e) => setField("cameraDefaults", "shutter", e.target.value)} />
              </div>
            </div>
            <div className="s-form-row" style={{ marginTop: 14 }}>
              <div className="s-field">
                <label>{T.defaultsAperture}</label>
                <input
                  className="s-input" type="number" step="0.1" placeholder="7"
                  value={draft.cameraDefaults.aperture ?? ""}
                  onChange={(e) => setField("cameraDefaults", "aperture", e.target.value)} />
              </div>
              <div className="s-field">
                <label>{T.defaultsWb}</label>
                <input
                  className="s-input" placeholder="Auto"
                  value={draft.cameraDefaults.wb ?? ""}
                  onChange={(e) => setField("cameraDefaults", "wb", e.target.value)} />
              </div>
            </div>
          </section>
          <section className="s-settings-section">
            <h3>{T.limitsTitle}</h3>
            <div className="s-field">
              <label>{T.limitsWbLabel}</label>
              <div className="s-qa-chips">
                {wbOptions.map((name) => {
                  const on = allowedWb == null || allowedWb.includes(name);
                  return (
                    <button key={name} className={`s-qa-chip ${on ? "s-qa-chip--on" : ""}`} onClick={() => toggleWb(name)}>
                      {name}
                    </button>);

                })}
              </div>
            </div>
            <div className="s-form-row" style={{ marginTop: 14 }}>
              <div className="s-field">
                <label>{T.limitsIsoMin}</label>
                <input
                  className="s-input" type="number" placeholder="100"
                  value={draft.cameraLimits.isoMin ?? ""}
                  onChange={(e) => setField("cameraLimits", "isoMin", numOrNull(e.target.value))} />
              </div>
              <div className="s-field">
                <label>{T.limitsIsoMax}</label>
                <input
                  className="s-input" type="number" placeholder="25600"
                  value={draft.cameraLimits.isoMax ?? ""}
                  onChange={(e) => setField("cameraLimits", "isoMax", numOrNull(e.target.value))} />
              </div>
            </div>
            <div className="s-form-row" style={{ marginTop: 14 }}>
              <div className="s-field">
                <label>{T.limitsApertureMin}</label>
                <input
                  className="s-input" type="number" step="0.1" placeholder="4.0"
                  value={draft.cameraLimits.apertureMin ?? ""}
                  onChange={(e) => setField("cameraLimits", "apertureMin", numOrNull(e.target.value))} />
              </div>
              <div className="s-field">
                <label>{T.limitsApertureMax}</label>
                <input
                  className="s-input" type="number" step="0.1" placeholder="16.0"
                  value={draft.cameraLimits.apertureMax ?? ""}
                  onChange={(e) => setField("cameraLimits", "apertureMax", numOrNull(e.target.value))} />
              </div>
            </div>
          </section>
          </>
          }

          {activeGroup === "overlay" &&
          <section className="s-settings-section">
            <h3>{T.overlayTitle}</h3>
            <div className="s-settings-overlay-row">
              <div className="s-settings-overlay-preview-col">
                <div className="s-settings-overlay-preview">
                  {overlayPhoto &&
                  <img
                    src={overlayPhoto}
                    alt=""
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  }
                  <CenterGuide
                    offsetXPct={draft.overlay.offsetXPct}
                    offsetYPct={draft.overlay.offsetYPct}
                    scalePct={draft.overlay.scalePct}
                    customSrc={toFileUrl(draft.overlay.customImagePath)} />
                </div>
              </div>
              <div className="s-settings-overlay-controls">
                <div className="s-field">
                  <label>{T.overlayOffsetX} ({draft.overlay.offsetXPct}%)</label>
                  <input
                    type="range" min="-30" max="30"
                    value={draft.overlay.offsetXPct}
                    onChange={(e) => setField("overlay", "offsetXPct", Number(e.target.value))} />
                </div>
                <div className="s-field">
                  <label>{T.overlayOffsetY} ({draft.overlay.offsetYPct - DEFAULT_OVERLAY.offsetYPct}%)</label>
                  <input
                    type="range" min={-30} max={30}
                    value={draft.overlay.offsetYPct - DEFAULT_OVERLAY.offsetYPct}
                    onChange={(e) => setField("overlay", "offsetYPct", DEFAULT_OVERLAY.offsetYPct + Number(e.target.value))} />
                </div>
                <div className="s-field">
                  <label>{T.overlayScale} ({draft.overlay.scalePct - DEFAULT_OVERLAY.scalePct}%)</label>
                  <input
                    type="range" min={-50} max={50}
                    value={draft.overlay.scalePct - DEFAULT_OVERLAY.scalePct}
                    onChange={(e) => setField("overlay", "scalePct", DEFAULT_OVERLAY.scalePct + Number(e.target.value))} />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="s-btn s-btn--ghost" style={{ flex: 1 }} onClick={pickImage}>{T.overlayUpload}</button>
                  <button
                    className="s-btn s-btn--ghost"
                    style={{ flex: 1 }}
                    disabled={
                    draft.overlay.customImagePath == null &&
                    draft.overlay.offsetXPct === DEFAULT_OVERLAY.offsetXPct &&
                    draft.overlay.offsetYPct === DEFAULT_OVERLAY.offsetYPct &&
                    draft.overlay.scalePct === DEFAULT_OVERLAY.scalePct
                    }
                    onClick={() => setField("overlay", null, { ...DEFAULT_OVERLAY })}>
                    {T.overlayReset}
                  </button>
                </div>
                <button
                  className="s-btn s-btn--ghost"
                  style={{ width: "100%" }}
                  disabled={!cam || overlayCapturing}
                  onClick={takeOverlayPhoto}>
                  {overlayCapturing ?
                  <><div className="s-spinner" /> {S.common.takingPhoto}</> :
                  <><SI.shutter size={16} /> {T.overlayTakePhoto}</>}
                </button>
                {overlayCamError && <div className="s-cam-error"><SI.warn size={16} /> {overlayCamError}</div>}
              </div>
            </div>
          </section>
          }

          {activeGroup === "help" &&
          <div className="s-help-config-cols">
          <section className="s-settings-section">
            <h3>{T.helpDocsTitle}</h3>
            <button className="s-btn s-btn--ghost s-btn--sm" style={{ marginBottom: 10 }} onClick={addDoc}>{T.helpDocAdd}</button>
            {(draft.helpDocs || []).map((d, i) =>
            <div key={i} className="s-help-edit-row">
                <div className="s-field">
                  <label>{T.helpDocFieldName}</label>
                  <input className="s-input" value={d.name} onChange={(e) => updateDoc(i, "name", e.target.value)} />
                </div>
                <div className="s-field" style={{ marginTop: 6 }}>
                  <label>{T.helpDocFieldLocalFile}</label>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="s-btn s-btn--ghost s-btn--sm" onClick={() => pickDocFile(i)}>{T.helpDocBrowse}</button>
                    <input
                      className="s-input"
                      style={{ flex: 1 }}
                      value={d.localFile}
                      readOnly
                      placeholder={T.helpDocLocalFilePlaceholder} />
                  </div>
                </div>
                <div className="s-field" style={{ marginTop: 6 }}>
                  <label>{T.helpDocFieldUrl}</label>
                  <input
                    className="s-input"
                    value={d.externalUrl}
                    placeholder={T.helpDocUrlPlaceholder}
                    onChange={(e) => updateDoc(i, "externalUrl", e.target.value)} />
                </div>
                <div className="s-help-row-actions">
                  <button
                    className="s-btn s-btn--ghost s-btn--sm"
                    disabled={i === 0}
                    aria-label={T.helpMoveUp}
                    onClick={() => moveItem("helpDocs", i, -1)}>
                    <SI.chevronUp size={12} />
                  </button>
                  <button
                    className="s-btn s-btn--ghost s-btn--sm"
                    disabled={i === (draft.helpDocs || []).length - 1}
                    aria-label={T.helpMoveDown}
                    onClick={() => moveItem("helpDocs", i, 1)}>
                    <SI.chevronDown size={12} />
                  </button>
                  <span className="s-help-reorder-hint">{T.helpChangeOrder}</span>
                  <button className="s-btn s-btn--ghost s-btn--sm s-btn--danger" onClick={() => removeDoc(i)}>{T.helpRemove}</button>
                </div>
              </div>
            )}
          </section>

          <section className="s-settings-section">
            <h3>{T.helpTitle}</h3>
            <button className="s-btn s-btn--ghost s-btn--sm" style={{ marginBottom: 10 }} onClick={addContact}>{T.helpAdd}</button>
            {(draft.helpContacts || []).map((c, i) =>
            <div key={i} className="s-help-edit-row">
                <div className="s-field">
                  <label>{T.helpFieldTitle}</label>
                  <input className="s-input" value={c.title} onChange={(e) => updateContact(i, "title", e.target.value)} />
                </div>
                <div className="s-field" style={{ marginTop: 6 }}>
                  <label>{T.helpFieldDescription}</label>
                  <input className="s-input" value={c.description} onChange={(e) => updateContact(i, "description", e.target.value)} />
                </div>
                <div className="s-form-row" style={{ marginTop: 6 }}>
                  <div className="s-field">
                    <label>{T.helpFieldPhone}</label>
                    <input
                      className="s-input"
                      value={c.phone}
                      placeholder="(555) 123-4567"
                      onChange={(e) => updateContact(i, "phone", e.target.value)} />
                  </div>
                  <div className="s-field">
                    <label>{T.helpFieldEmail}</label>
                    <input
                      className="s-input"
                      value={c.email}
                      placeholder="name@example.com"
                      onChange={(e) => updateContact(i, "email", e.target.value)} />
                  </div>
                </div>
                <div className="s-help-row-actions">
                  <button
                    className="s-btn s-btn--ghost s-btn--sm"
                    disabled={i === 0}
                    aria-label={T.helpMoveUp}
                    onClick={() => moveItem("helpContacts", i, -1)}>
                    <SI.chevronUp size={12} />
                  </button>
                  <button
                    className="s-btn s-btn--ghost s-btn--sm"
                    disabled={i === (draft.helpContacts || []).length - 1}
                    aria-label={T.helpMoveDown}
                    onClick={() => moveItem("helpContacts", i, 1)}>
                    <SI.chevronDown size={12} />
                  </button>
                  <span className="s-help-reorder-hint">{T.helpChangeOrder}</span>
                  <button className="s-btn s-btn--ghost s-btn--sm s-btn--danger" onClick={() => removeContact(i)}>{T.helpRemove}</button>
                </div>
              </div>
            )}
          </section>
          </div>
          }
        </div>
        </div>

        <div className="s-tut-foot">
          <button className="s-btn s-btn--ghost" onClick={onClose}>{T.cancel}</button>
          <button className="s-btn s-btn--primary" disabled={saving} onClick={save}>
            {saving ? T.saving : T.save}
          </button>
        </div>
        </div>
        {locked &&
        <SettingsPasswordGate
          correctPassword={settings.settingsPassword}
          onUnlock={onUnlock}
          onClose={onClose} />
        }
        </div>
      </div>
    </div>);

}

// ============================================================
// Settings password gate -- shown over a blurred Settings screen when
// settingsPasswordEnabled is on and this session hasn't unlocked it yet.
// ============================================================
function SettingsPasswordGate({ correctPassword, onUnlock, onClose }) {
  const G = S.settingsGate;
  const [value, setValue] = React.useState("");
  const [wrong, setWrong] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (value === correctPassword) onUnlock();
    else setWrong(true);
  };

  // Sits inside the Settings card itself (see SettingsScreen), covering
  // only the (already-blurred) nav/body/footer below the "Application
  // Settings" title -- a full-viewport backdrop's own blur would otherwise
  // blur that title too, since backdrop-filter samples everything painted
  // behind it regardless of z-index tricks on the title.
  return (
    <div className="s-gate-inline" onClick={onClose}>
      <form className="s-gate-card" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <button type="button" className="s-info-close" onClick={onClose} aria-label={S.common.close}>
          <SI.close size={18} />
        </button>
        <div className="s-gate-icon"><SI.lock size={22} /></div>
        <h3>{G.title}</h3>
        <p style={{ margin: "0 0 18px", color: "var(--text-2)", fontSize: 15 }}>{G.body}</p>
        <div className="s-field">
          <label>{G.fieldLabel}</label>
          <input
            className="s-input"
            type="password"
            autoFocus
            value={value}
            placeholder={G.placeholder}
            onChange={(e) => { setValue(e.target.value); setWrong(false); }} />
        </div>
        {wrong && <div className="s-cam-error"><SI.warn size={16} /> {G.wrongPassword}</div>}
        <div className="s-help-actions" style={{ marginTop: 18 }}>
          <button type="button" className="s-btn s-btn--ghost" onClick={onClose}>{G.cancel}</button>
          <button type="submit" className="s-btn s-btn--primary" disabled={!value}>{G.unlock}</button>
        </div>
      </form>
    </div>);

}

// ============================================================
// Launch flash
// ============================================================
function LaunchFlash() {
  return (
    <div id="simple-launch" style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse at center, rgba(var(--accent-rgb), 0.4), rgba(32, 38, 52, 0.96) 65%)",
      display: "grid", placeItems: "center",
      opacity: 0, pointerEvents: "none",
      transition: "opacity 0.3s ease-out",
      zIndex: 100,
      color: "white"
    }}>
      <div style={{ textAlign: "center" }}>
        <div className="s-hero-ic s-hero-ic--accent s-pulse" style={{ margin: "0 auto 18px" }}>
          <SI.camera size={70} />
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>{S.done.launching}</div>
      </div>
    </div>);

}

// ============================================================
// Stage scale wrapper
// ============================================================
const STAGE_W = 1440;
const STAGE_H = 900;

function useScale(w, h) {
  const [s, setS] = React.useState(1);
  React.useEffect(() => {
    const compute = () => {
      const sx = window.innerWidth / w;
      const sy = window.innerHeight / h;
      setS(Math.min(sx, sy));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [w, h]);
  return s;
}

// ============================================================
// App + Prototype HUD
// ============================================================
function SimpleApp() {
  const [step, setStep] = React.useState(1);
  const [walkChecked, setWalkChecked] = React.useState({});
  const [help, setHelp] = React.useState(false);
  const [run, setRun] = React.useState(null); // { id, startedAt }
  const [settings, setSettings] = React.useState({
    location: { number: "", name: "", station: "Camera" },
    paths: { completionLogs: "", testPhotos: "", diagnostics: "" },
    skipReasonPrompt: true,
    skipReasons: ["Running late", "Equipment issue", "Other"],
    cameraLimits: { allowedWb: null, isoMin: null, isoMax: null, apertureMin: null, apertureMax: null },
    cameraDefaults: { iso: "400", shutter: "1/125", aperture: "7", wb: "Auto" },
    overlay: { ...DEFAULT_OVERLAY },
    rpsLaunchEnabled: true,
    rpsPath: "",
    rpsAppName: "RPS",
    helpContacts: [],
    helpDocs: [],
    videoPlayerPath: "",
    settingsPasswordEnabled: true,
    settingsPassword: "help123",
    calibrationDiagnosticsEnabled: true,
  });
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  // Persists for the rest of the running session once the correct password
  // is entered -- closing and reopening Settings doesn't re-prompt; only
  // relaunching the app does.
  const [settingsUnlocked, setSettingsUnlocked] = React.useState(false);
  const [skipPrompt, setSkipPrompt] = React.useState(null); // { screenKey, screenLabel } while the reason modal is open
  const scale = useScale(STAGE_W, STAGE_H);

  React.useEffect(() => {
    if (window.cfc && window.cfc.settings) {
      window.cfc.settings.load().then(setSettings).catch(() => {});
    }
  }, []);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const restart = () => {setStep(1);setWalkChecked({});setRun(null);};

  // Welcome's Start button opens a check run and persists it (future: POST
  // to the API).
  const startCheck = () => {
    const id = "cfc-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
    const startedAt = new Date().toISOString();
    setRun({ id, startedAt });
    if (window.cfc && window.cfc.runs) {
      window.cfc.runs.save({
        type: "check_started",
        runId: id,
        locationNumber: (settings.location && settings.location.number) || null,
        locationName: (settings.location && settings.location.name) || null,
        station: (settings.location && settings.location.station) || "Camera 1",
        startedAt
      }).catch(() => {});
    }
    next();
  };

  const logSkip = (runId, screenKey, reason) => {
    if (!(window.cfc && window.cfc.runs) || !runId) return;
    window.cfc.runs.save({
      type: "screen_skipped", runId, screen: screenKey, reason: reason || null, at: new Date().toISOString()
    }).catch(() => {});
  };

  const requestSkip = (screenKey, screenLabel) => {
    if (settings.skipReasonPrompt) { setSkipPrompt({ screenKey, screenLabel }); return; }
    logSkip(run && run.id, screenKey, null);
    next();
  };

  const confirmSkip = (reason) => {
    const { screenKey } = skipPrompt;
    setSkipPrompt(null);
    logSkip(run && run.id, screenKey, reason);
    next();
  };

  // Keyboard nav -- dev/headless-verification convenience only (see
  // DEV_MODE above). Does not exist at all in packaged builds: it calls
  // next()/back()/restart() directly with no gating, and an operator has no
  // reason to drive this app from a keyboard.
  React.useEffect(() => {
    if (!DEV_MODE) return;
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowRight" || e.key === "Enter") {e.preventDefault();next();} else
      if (e.key === "ArrowLeft") {e.preventDefault();back();} else
      if (e.key === "Escape") restart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const renderScreen = () => {
    switch (step) {
      case 1:return <ScreenWelcome onStart={startCheck} settings={settings} />;
      case 2:return <ScreenWalkAround checked={walkChecked} setChecked={setWalkChecked} onNext={next} onBack={back} onSkip={() => requestSkip("walkaround", S.steps[1])} />;
      case 3:return <ScreenCamera onNext={next} onBack={back} onSkip={() => requestSkip("camera", S.steps[2])} settings={settings} run={run} />;
      case 4:return <ScreenTestPhoto onNext={next} onBack={back} onSkip={() => requestSkip("testphoto", S.steps[3])} settings={settings} />;
      case 5:return <ScreenDone onRestart={restart} run={run} settings={settings} />;
      default:return null;
    }
  };

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "#11141b", overflow: "hidden" }}>
        <div className="s-stage-frame" style={{
          width: STAGE_W, height: STAGE_H,
          position: "absolute", top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
          borderRadius: 4,
          boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
          overflow: "hidden"
        }}>
          <div className="s-app">
            <SimpleTop openHelp={() => setHelp(true)} openSettings={() => setSettingsOpen(true)} step={step} />
            {renderScreen()}
            {help && <HelpModal onClose={() => setHelp(false)} settings={settings} />}
            {settingsOpen &&
            <SettingsScreen
              settings={settings}
              locked={settings.settingsPasswordEnabled && !settingsUnlocked}
              onUnlock={() => setSettingsUnlocked(true)}
              onSave={(next) => setSettings(next)}
              onClose={() => setSettingsOpen(false)} />
            }
            {skipPrompt &&
            <SkipReasonModal
              screenLabel={skipPrompt.screenLabel}
              reasons={settings.skipReasons}
              onClose={() => setSkipPrompt(null)}
              onConfirm={confirmSkip} />
            }
            <LaunchFlash />
          </div>
        </div>
      </div>
    </>);

}

ReactDOM.createRoot(document.getElementById("simple-root")).render(<SimpleApp />);
