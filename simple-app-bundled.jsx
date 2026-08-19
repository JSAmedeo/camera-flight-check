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
    </svg>

};

// ============================================================
// Camera access + grey-card analysis
// ============================================================
const cam = (window.cfc && window.cfc.camera) || null;

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
    if (data[i] >= 250 || data[i + 1] >= 250 || data[i + 2] >= 250) clipped++;
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

// Decide what to change on the camera. Strobe-lit set: exposure moves via
// ISO first, then aperture; shutter stays (it barely affects strobe exposure).
function planCorrections(settings, analysis) {
  const plan = {};
  const currentK = WB_KELVIN[settings.wb] || 5500;
  // empirical: pull the WB assumption toward neutral based on measured warmth
  const estimatedK = currentK / Math.pow(analysis.warmth, 0.6);
  if (Math.abs(Math.log2(analysis.warmth)) > CAST_TOLERANCE && analysis.clipped < CLIP_LIMIT) {
    let bestWb = null, bestDiff = Infinity;
    for (const wb of settings.wbValues || []) {
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
      // (T7 lists 6/12/25/50) — writing one can wedge the camera. Stay in 100+.
      const isoCandidates = (settings.isoValues || []).filter((v) => {
        const n = parseFloat(v);
        return n >= 100 && n <= 25600;
      });
      const newIso = nearestValue(isoCandidates, curIso * Math.pow(2, analysis.evDelta));
      if (newIso && newIso !== settings.iso) plan.iso = newIso;
      const isoAfter = parseFloat(newIso || settings.iso);
      const remaining = analysis.evDelta - Math.log2(isoAfter / curIso);
      const curN = parseFloat(settings.aperture);
      if (Math.abs(remaining) >= 0.4 && curN > 0) {
        // Only ever stop DOWN (higher f-number). Opening up may exceed what the
        // lens can do at its current zoom (the table is not lens-aware) — leave
        // brightening to ISO.
        const target = curN * Math.pow(2, -remaining / 2);
        if (target > curN) {
          const stopDownValues = (settings.apertureValues || []).filter((v) => parseFloat(v) >= curN);
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
      {s.battery != null && <span>BAT <b>{s.battery}%</b></span>}
    </div>);

}

// ============================================================
// Top bar
// ============================================================
function SimpleTop({ openHelp }) {
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
          <div className="s-top-sub">{S.app.subtitle}</div>
        </div>
      </div>
      <div className="s-top-station">
        <span>{S.app.station}<b>{S.app.stationBold}</b></span>
        {simulated && <span className="s-sim-badge">{S.app.simulatorBadge}</span>}
      </div>
      <div className="s-top-actions">
        <button className="s-help-btn" onClick={openHelp}>
          <SI.help size={16} /> {S.app.getHelp}
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
  return (
    <div className="s-steps">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const isActive = n === step;
        const isDone = n < step;
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
      <div className="s-foot-status">{left}</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {back}
        {skip}
        {primary}
      </div>
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

function SkipReasonModal({ screenLabel, onConfirm, onClose }) {
  const [reason, setReason] = React.useState(S.skip.reasons[0]);
  const [note, setNote] = React.useState("");
  const isOther = reason === S.skip.reasons[S.skip.reasons.length - 1];

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="s-info" onClick={onClose}>
      <div className="s-info-card s-fadeup" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="s-info-close" onClick={onClose} aria-label="Close">
          <SI.close size={18} />
        </button>
        <div className="s-info-head">
          <div>
            <div className="s-info-eyebrow">{S.skip.eyebrowPrefix}{screenLabel}</div>
            <h3 className="s-info-title">{S.skip.modalTitle}</h3>
          </div>
        </div>
        <div className="s-qa-chips" style={{ marginTop: 4 }}>
          {S.skip.reasons.map((r) =>
          <button
            key={r}
            className={`s-qa-chip ${reason === r ? "s-qa-chip--on" : ""}`}
            onClick={() => setReason(r)}>
              {r}
            </button>
          )}
        </div>
        {isOther &&
        <input
          className="s-input"
          style={{ marginTop: 12 }}
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
// Screen 1 — Welcome (operator sign-in)
// ============================================================
function LiveClock() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const date = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const time = now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" });
  return (
    <div className="s-datetime">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
      <span>{date} · <b>{time}</b></span>
    </div>);

}

function ScreenWelcome({ operator, setOperator, onStart, onSkip }) {
  const canStart = operator.firstName.trim().length > 0 && operator.lastName.trim().length > 0;
  const set = (key) => (e) => setOperator((o) => ({ ...o, [key]: e.target.value }));
  return (
    <>
      <SimpleSteps step={1} />
      <div className="s-body">
        <div className="s-screen s-fadeup">
          <div className="s-hero-ic s-hero-ic--accent s-pulse" aria-hidden>
            <SI.camera size={72} />
          </div>
          <h1 className="s-h1">{S.welcome.title}</h1>
          <p className="s-lede">
            {S.welcome.ledeBefore}<b>{S.welcome.ledeBold}</b>{S.welcome.ledeAfter}
          </p>

          <div className="s-form">
            <div className="s-form-row">
              <div className="s-field">
                <label htmlFor="op-first">{S.welcome.firstNameLabel}</label>
                <input
                  id="op-first"
                  className="s-input"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  placeholder={S.welcome.firstNamePlaceholder}
                  value={operator.firstName}
                  onChange={set("firstName")} />
              </div>
              <div className="s-field">
                <label htmlFor="op-last">{S.welcome.lastNameLabel}</label>
                <input
                  id="op-last"
                  className="s-input"
                  type="text"
                  autoComplete="off"
                  placeholder={S.welcome.lastNamePlaceholder}
                  value={operator.lastName}
                  onChange={set("lastName")} />
              </div>
            </div>
            <LiveClock />
          </div>
        </div>
      </div>
      <SimpleFoot
        left={canStart ? null : <span>{S.welcome.enterNameHint}</span>}
        skip={<SkipButton onClick={onSkip} />}
        primary={
        <button className="s-btn s-btn--primary s-btn--xl" disabled={!canStart} onClick={onStart}>
            {S.common.start} <SI.arrow size={20} />
          </button>
        } />

    </>);

}

// ============================================================
// Screen 2 — Walk around the station
// ============================================================
const WALK_ICONS = {
  pole: <SI.pole />, cap: <SI.cap />, plug: <SI.plug />,
  strobe: <SI.bolt />, back: <SI.backdrop />, floor: <SI.broom />
};
// card copy + tutorial steps come from strings.js
const WALK_ITEMS = Object.keys(WALK_ICONS).map((key) => ({
  key, icon: WALK_ICONS[key], ...S.walk.items[key]
}));

function ScreenWalkAround({ checked, setChecked, onNext, onBack, onSkip }) {
  const toggle = (k) => setChecked((c) => ({ ...c, [k]: !c[k] }));
  const doneCount = Object.values(checked).filter(Boolean).length;
  const total = WALK_ITEMS.length;
  const allDone = doneCount === total;
  const [infoKey, setInfoKey] = React.useState(null);
  const infoItem = WALK_ITEMS.find((i) => i.key === infoKey);

  return (
    <>
      <SimpleSteps step={2} />
      <div className="s-body">
        <div className="s-screen s-screen--wide s-fadeup">
          <h1 className="s-h1 s-h1--small">{S.walk.title}</h1>
          <p className="s-lede">{S.walk.lede}</p>

          <div className="s-grid" style={{ marginTop: 4 }}>
            {WALK_ITEMS.map((it) =>
            <button
              key={it.key}
              className={`s-card ${checked[it.key] ? "s-card--on" : ""}`}
              onClick={() => toggle(it.key)}>

                <div className="s-card-ic">{it.icon}</div>
                <div>
                  <div className="s-card-label">{it.label}</div>
                  <div className="s-card-sub">{it.sub}</div>
                </div>
                <span className="s-card-check">
                  <SI.check size={16} />
                </span>
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
              </button>
            )}
          </div>
        </div>
      </div>
      {infoItem && <WalkInfoModal item={infoItem} onClose={() => setInfoKey(null)} />}
      <SimpleFoot
        left={
        <span>
            <b style={{ color: allDone ? "var(--pass)" : "var(--text)", fontSize: 17 }}>
              {doneCount} {S.walk.tutorial.of} {total}
            </b>
            <span style={{ marginLeft: 8 }}>{S.walk.checkedOff}</span>
          </span>
        }
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

// ============================================================
// Screen 3 — Camera check (real detect → capture → grey-card region → apply)
// Stages: "auto" -> "shoot" -> "select" -> "applied"
// ============================================================
function ScreenCamera({ onNext, onBack, onSkip }) {
  const [stage, setStage] = React.useState("auto");
  const [detected, setDetected] = React.useState(null); // {model, serial}
  const [camSettings, setCamSettings] = React.useState(null);
  const [camError, setCamError] = React.useState(null);
  const [autoProgress, setAutoProgress] = React.useState(0);
  const [photo, setPhoto] = React.useState(null); // dataUrl of calibration shot
  const [busy, setBusy] = React.useState(false);
  const [busyLabel, setBusyLabel] = React.useState("");
  const [selBox, setSelBox] = React.useState(null);
  const [result, setResult] = React.useState(null); // {analysis, plan, applied, rejected, before, after, refreshFailed}
  const [refreshing, setRefreshing] = React.useState(false);

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
      setSelBox(null);
      setResult(null);
      setStage("select");
    } catch (e) {
      setCamError(errText(e));
    } finally { setBusy(false); }
  };

  // ---------- grey-card region chosen ----------
  const onRegion = async (box, imgEl) => {
    setBusy(true); setBusyLabel(S.camera.select.balancing); setCamError(null);
    try {
      const analysis = analyzeGreyCard(imgEl, box);
      const plan = planCorrections(camSettings, analysis);
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
    } catch (e) {
      setCamError(errText(e));
    } finally { setBusy(false); }
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
        <SimpleSteps step={3} />
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
        <SimpleSteps step={3} />
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
              <div className="s-stage-side">
                <h1 className="s-h1 s-h1--small s-h1--left">{S.camera.shoot.title}</h1>
                <p className="s-lede s-lede--left">
                  {S.camera.shoot.ledeBefore}<b style={{ color: "#a8b0c0" }}>{S.camera.shoot.ledeGreyCard}</b>{S.camera.shoot.ledeAfter}
                </p>
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
                <div className="s-stage-tips">
                  <div className="s-tip s-tip--compact">
                    <span className="s-tip-num">1</span>
                    {S.camera.shoot.tip1}
                  </div>
                  <div className="s-tip s-tip--compact">
                    <span className="s-tip-num">2</span>
                    {S.camera.shoot.tip2}
                  </div>
                  <div className="s-tip s-tip--compact">
                    <span className="s-tip-num">3</span>
                    {S.camera.shoot.tip3}
                  </div>
                </div>
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
      </>);
  }

  // ---------- Stage: select (drag over the grey card) ----------
  if (stage === "select") {
    return (
      <>
        <SimpleSteps step={3} />
        <div className="s-body">
          <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
            <div className="s-stage">
              <RegionSelect src={photo} box={selBox} setBox={setSelBox} onDone={onRegion} busy={busy} />
              <div className="s-stage-side">
                <h1 className="s-h1 s-h1--small s-h1--left">
                  {busy ? S.camera.select.titleBusy : S.camera.select.title}
                </h1>
                <p className="s-lede s-lede--left">
                  {busy ?
                  S.camera.select.ledeBusy :
                  <>{S.camera.select.ledeBefore}<b style={{ color: "#a8b0c0" }}>{S.camera.select.ledeGreyCard}</b>{S.camera.select.ledeAfter}</>}
                </p>
                <SettingsStrip s={camSettings} />
                {!busy &&
                <ul className="s-checklist">
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
                </ul>
                }
                {busy &&
                <div className="s-stage-status">
                  <div className="s-spinner" />
                  <span>{busyLabel}</span>
                </div>
                }
                {camError && <div className="s-cam-error"><SI.warn size={16} /> {camError}</div>}
              </div>
            </div>
          </div>
        </div>
        <SimpleFoot
          left={null}
          back={<button className="s-btn s-btn--back" disabled={busy} onClick={() => setStage("shoot")}><SI.back /> {S.camera.select.retakePhoto}</button>}
          skip={<SkipButton onClick={onSkip} />}
          primary={null} />
      </>);
  }

  // ---------- Stage: applied ----------
  const changes = [];
  let measured = [];
  if (result) {
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
      <SimpleSteps step={3} />
      <div className="s-body">
        <div className="s-screen s-screen--wide s-fadeup">
          <div className="s-hero-ic s-hero-ic--sm s-hero-ic--pass">
            <SI.check size={40} />
          </div>
          <h1 className="s-h1 s-h1--small">{S.camera.applied.title}</h1>
          <p className="s-lede">
            {S.camera.applied.lede}
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
        left={null}
        back={<button className="s-btn s-btn--back" onClick={() => setStage("shoot")}>{S.camera.applied.redoGreyCard}</button>}
        skip={<SkipButton onClick={onSkip} />}
        primary={
        <button className="s-btn s-btn--primary s-btn--xl" onClick={onNext}>
            {S.common.continue} <SI.arrow size={20} />
          </button>
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
    setBox(b);
    onDone(b, imgRef.current);
  };

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
      <div className="s-selbox" style={{ left: box.x, top: box.y, width: box.w, height: box.h }} />
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

// Dotted seated-person guide overlaid on the photo while centering is unconfirmed
function CenterGuide() {
  const stroke = {
    fill: "rgba(94,234,212,0.05)", stroke: "#5eead4", strokeWidth: 2,
    strokeDasharray: "3 2.5", vectorEffect: "non-scaling-stroke",
    strokeLinecap: "round", strokeLinejoin: "round"
  };
  return (
    <svg viewBox="0 0 100 150" preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
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

function ScreenTestPhoto({ onNext, onBack, onSkip }) {
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
      const curIso = parseFloat(camSettings && camSettings.iso);
      if (ev !== 0 && curIso > 0) {
        const isoCandidates = (camSettings.isoValues || []).filter((v) => {
          const n = parseFloat(v);
          return n >= 100 && n <= 25600;
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
          const stopDownValues = (camSettings.apertureValues || []).filter((v) => parseFloat(v) >= curN);
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
        <SimpleSteps step={4} />
        <div className="s-body">
          <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
            <div className="s-stage">
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
              <div className="s-stage-side">
                <h1 className="s-h1 s-h1--small s-h1--left">{adjustNote ? S.testPhoto.retakeTitle : S.testPhoto.aimTitle}</h1>
                <p className="s-lede s-lede--left">
                  {adjustNote ? S.testPhoto.retakeLede : S.testPhoto.aimLede}
                </p>
                <SettingsStrip s={camSettings} />
                {adjustNote &&
                <div className="s-cam-warn">
                  <SI.retake size={16} />
                  <span>{adjustNote}</span>
                </div>
                }
                {/* setup steps only matter on the first shot — skip them on adjust-retakes */}
                {!adjustNote &&
                <ul className="s-checklist">
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
      <SimpleSteps step={4} />
      <div className="s-body">
        <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
          <div className="s-stage">
            <div className="s-photo s-photo--portrait">
              <img
                src={photo}
                alt=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              {centered !== true && <CenterGuide />}
              <div className="s-photo-pill s-photo-pill--taken">
                <SI.check size={14} /> {S.testPhoto.photoTakenPill}
              </div>
            </div>
            <div className="s-stage-side">
              <h1 className="s-h1 s-h1--small s-h1--left">{S.testPhoto.reviewTitle}</h1>
              <SettingsStrip s={camSettings} />

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
                      <button className="s-btn" onClick={() => setCentered(false)}>{S.common.no}</button>
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
                      <button className="s-btn" onClick={() => setCrisp(false)}>{S.common.no}</button>
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
        left={<span><b style={{ color: colorsYes ? "var(--pass)" : "var(--text)" }}>
          {(centered === true ? 1 : 0) + (crisp === true ? 1 : 0) + (colorsYes ? 1 : 0)} {S.testPhoto.checksOf} 3
        </b><span style={{ marginLeft: 8 }}>{S.testPhoto.checksPassed}</span></span>}
        back={<button className="s-btn s-btn--back" disabled={busy} onClick={() => takePhoto(0)}><SI.retake size={16} /> {S.testPhoto.takeItAgain}</button>}
        skip={<SkipButton onClick={onSkip} />}
        primary={
        <button className="s-btn s-btn--primary s-btn--xl" disabled={!colorsYes || busy} onClick={onNext}>
            <SI.check size={20} /> {S.testPhoto.looksGood}
          </button>
        } />
    </>);
}

// ============================================================
// Screen 5 — Done
// ============================================================
function ScreenDone({ onRestart, operator, run }) {
  const firstName = (operator && operator.firstName.trim()) || S.done.fallbackName;
  const durationSec = run ? Math.max(0, Math.round((Date.now() - new Date(run.startedAt).getTime()) / 1000)) : null;
  const durationText = durationSec == null ? "—" :
  durationSec >= 60 ? `${Math.floor(durationSec / 60)} ${S.done.minutes} ${durationSec % 60} ${S.done.seconds}` : `${durationSec} ${S.done.seconds}`;

  const launch = () => {
    const e = document.getElementById("simple-launch");
    if (e) {
      e.style.opacity = "1";
      e.style.pointerEvents = "auto";
    }
    if (run && window.cfc && window.cfc.runs) {
      window.cfc.runs.save({
        type: "check_completed",
        runId: run.id,
        operator: { firstName: operator.firstName.trim(), lastName: operator.lastName.trim() },
        startedAt: run.startedAt,
        completedAt: new Date().toISOString(),
        durationSec
      }).catch(() => {});
    }
    // free the USB session so RPS can attach to the camera, then close
    const done = () => window.cfc ? window.cfc.close() : null;
    if (cam) cam.release().then(() => setTimeout(done, 1600)).catch(() => setTimeout(done, 1600));
    else setTimeout(done, 1800);
  };

  return (
    <>
      <SimpleSteps step={5} />
      <div className="s-body">
        <div className="s-screen s-fadeup">
          <div className="s-hero-ic s-hero-ic--pass">
            <SI.trophy size={84} />
          </div>
          <h1 className="s-h1">{S.done.title}</h1>
          <p className="s-lede">
            {fmt(S.done.lede, { name: firstName })}
          </p>

          <div className="s-result">
            <div className="s-checklist-line"><SI.check size={18} /> {S.done.result1}</div>
            <div className="s-checklist-line"><SI.check size={18} /> {S.done.result2}</div>
            <div className="s-checklist-line"><SI.check size={18} /> {S.done.result3}</div>
          </div>
        </div>
      </div>
      <SimpleFoot
        left={<span>{S.done.finishedIn} <b style={{ color: "var(--text)" }}>{durationText}</b></span>}
        back={<button className="s-btn s-btn--back" onClick={onRestart}>{S.done.startOver}</button>}
        primary={
        <button className="s-btn s-btn--primary s-btn--xl" onClick={launch}>
            <SI.camera size={22} /> {S.done.closeAndOpenRps}
          </button>
        } />

    </>);

}

// ============================================================
// Help modal
// ============================================================
function HelpModal({ onClose }) {
  return (
    <div className="s-help" onClick={onClose}>
      <div className="s-help-card" onClick={(e) => e.stopPropagation()}>
        <button className="s-info-close" onClick={onClose} aria-label="Close">
          <SI.close size={18} />
        </button>
        <h3>{S.help.title}</h3>
        <p>
          {S.help.bodyLine1}
          <br />
          {S.help.bodyLine2}
        </p>
        <div className="s-help-contacts">
          <div className="s-help-contact">
            <div className="s-help-eyebrow">{S.help.contact1Eyebrow}</div>
            <div className="s-help-name">{S.help.contact1Name}</div>
            <a className="s-help-phone" href={"tel:" + S.help.contact1Tel}>
              <SI.phone size={16} /> {S.help.contact1Phone}
            </a>
          </div>
          <div className="s-help-contact">
            <div className="s-help-eyebrow">{S.help.contact2Eyebrow}</div>
            <div className="s-help-name">{S.help.contact2Name}</div>
            <a className="s-help-phone" href={"tel:" + S.help.contact2Tel}>
              <SI.phone size={16} /> {S.help.contact2Phone}
            </a>
          </div>
          <div className="s-help-contact s-help-contact--wide">
            <div className="s-help-eyebrow">{S.help.contact3Eyebrow}</div>
            <div className="s-help-name">{S.help.contact3Name}</div>
            <a className="s-help-phone" href={"tel:" + S.help.contact3Tel}>
              <SI.phone size={16} /> {S.help.contact3Phone}
            </a>
          </div>
        </div>
        <div className="s-help-actions">
          <button className="s-btn s-btn--ghost" onClick={onClose}>{S.common.close}</button>
        </div>
      </div>
    </div>);

}

// ============================================================
// Launch flash
// ============================================================
function LaunchFlash() {
  return (
    <div id="simple-launch" style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse at center, rgba(234,88,12,0.4), rgba(15,18,24,0.96) 65%)",
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
  const [operator, setOperator] = React.useState({ firstName: "", lastName: "" });
  const [run, setRun] = React.useState(null); // { id, startedAt }
  const [settings, setSettings] = React.useState({ skipReasonPrompt: true });
  const [skipPrompt, setSkipPrompt] = React.useState(null); // { screenKey, screenLabel } while the reason modal is open
  const scale = useScale(STAGE_W, STAGE_H);

  React.useEffect(() => {
    if (window.cfc && window.cfc.settings) {
      window.cfc.settings.load().then(setSettings).catch(() => {});
    }
  }, []);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const restart = () => {setStep(1);setWalkChecked({});setRun(null);setOperator({ firstName: "", lastName: "" });};

  // Operator signed in — open a check run and persist it (future: POST to the
  // API). Returns the new runId so a Welcome-screen skip can log against it.
  const startCheck = (operatorOverride) => {
    const finalOperator = operatorOverride || operator;
    const id = "cfc-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
    const startedAt = new Date().toISOString();
    if (operatorOverride) setOperator(operatorOverride);
    setRun({ id, startedAt });
    if (window.cfc && window.cfc.runs) {
      window.cfc.runs.save({
        type: "check_started",
        runId: id,
        operator: { firstName: finalOperator.firstName.trim(), lastName: finalOperator.lastName.trim() },
        station: (settings.location && settings.location.station) || "Camera 1",
        set: (settings.location && settings.location.label) || "Santa Set A",
        startedAt
      }).catch(() => {});
    }
    next();
    return id;
  };

  const logSkip = (runId, screenKey, reason) => {
    if (!(window.cfc && window.cfc.runs) || !runId) return;
    window.cfc.runs.save({
      type: "screen_skipped", runId, screen: screenKey, reason: reason || null, at: new Date().toISOString()
    }).catch(() => {});
  };

  // Welcome has no run yet — skipping it starts one (with a placeholder name
  // if none was entered) and logs the skip against that new run.
  const skipWelcome = (reason) => {
    const placeholder = !operator.firstName.trim() ? { firstName: "Unknown", lastName: "Operator" } : null;
    logSkip(startCheck(placeholder), "welcome", reason);
  };

  const requestSkip = (screenKey, screenLabel) => {
    if (settings.skipReasonPrompt) { setSkipPrompt({ screenKey, screenLabel }); return; }
    if (screenKey === "welcome") skipWelcome(null);
    else { logSkip(run && run.id, screenKey, null); next(); }
  };

  const confirmSkip = (reason) => {
    const { screenKey } = skipPrompt;
    setSkipPrompt(null);
    if (screenKey === "welcome") skipWelcome(reason);
    else { logSkip(run && run.id, screenKey, reason); next(); }
  };

  // Keyboard nav
  React.useEffect(() => {
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
      case 1:return <ScreenWelcome operator={operator} setOperator={setOperator} onStart={startCheck} onSkip={() => requestSkip("welcome", S.steps[0])} />;
      case 2:return <ScreenWalkAround checked={walkChecked} setChecked={setWalkChecked} onNext={next} onBack={back} onSkip={() => requestSkip("walkaround", S.steps[1])} />;
      case 3:return <ScreenCamera onNext={next} onBack={back} onSkip={() => requestSkip("camera", S.steps[2])} />;
      case 4:return <ScreenTestPhoto onNext={next} onBack={back} onSkip={() => requestSkip("testphoto", S.steps[3])} />;
      case 5:return <ScreenDone onRestart={restart} operator={operator} run={run} />;
      default:return null;
    }
  };

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "#0a0d12", overflow: "hidden" }}>
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
            <SimpleTop openHelp={() => setHelp(true)} />
            {renderScreen()}
            {help && <HelpModal onClose={() => setHelp(false)} />}
            {skipPrompt &&
            <SkipReasonModal
              screenLabel={skipPrompt.screenLabel}
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
