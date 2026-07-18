// Shared chrome: top bar, progress rail, screen frame, icon set.

const Icon = {
  check: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  ),
  x: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  ),
  chev: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={p.dir === "right" ? "M6 4l4 4-4 4" : "M4 6l4 4 4-4"} />
    </svg>
  ),
  warn: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5L15 13.5H1L8 1.5z" />
      <path d="M8 6v3.5M8 11.5v.5" />
    </svg>
  ),
  alert: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 5v3.5M8 11v.4" />
    </svg>
  ),
  info: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7.5v3.5M8 5v.4" />
    </svg>
  ),
  camera: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h3.5l1.5-2h8l1.5 2H21v12H3z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  bolt: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 13h7l-1 9 9-12h-7z" />
    </svg>
  ),
  pc: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  usb: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="3" r="1.5" />
      <path d="M12 4.5V14M8 11h8M9 14h6v4l-3 2-3-2z" />
    </svg>
  ),
  user: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 4-5.5 7-5.5s6.2 2 7 5.5" />
    </svg>
  ),
  pin: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  shield: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z" />
    </svg>
  ),
  cog: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </svg>
  ),
  refresh: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 8a6 6 0 11-1.8-4.3" />
      <path d="M13.5 1.5v3h-3" />
    </svg>
  ),
  play: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="currentColor"><path d="M4 3l9 5-9 5z" /></svg>
  ),
  pause: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="currentColor"><rect x="3" y="3" width="3.5" height="10" rx="1"/><rect x="9.5" y="3" width="3.5" height="10" rx="1"/></svg>
  ),
  shutter: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3l5 7-3 9M12 3l-5 7 3 9M17 10H7M14 19l-6-9M10 19l6-9" />
    </svg>
  ),
  printer: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M7 9V3h10v6M6 9h12a2 2 0 012 2v6h-4v4H8v-4H4v-6a2 2 0 012-2z" />
    </svg>
  ),
  doc: (p = {}) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M6 3h8l4 4v14H6z M14 3v4h4" />
    </svg>
  ),
  grip: (p = {}) => (
    <svg viewBox="0 0 16 16" width={p.size || 14} height={p.size || 14} fill="currentColor">
      <circle cx="6" cy="4" r="1.1"/><circle cx="10" cy="4" r="1.1"/>
      <circle cx="6" cy="8" r="1.1"/><circle cx="10" cy="8" r="1.1"/>
      <circle cx="6" cy="12" r="1.1"/><circle cx="10" cy="12" r="1.1"/>
    </svg>
  ),
};

// ============== Top bar ==============
function TopBar({ location, set, station, employee, shift, clock = "08:42:11" }) {
  return (
    <div className="pf-topbar">
      <div className="pf-brand">
        <div className="pf-brand-mark"></div>
        <div className="pf-brand-text">
          <strong>Camera Flight Check</strong>
          <span>v1.2 · Pre-shift gate</span>
        </div>
      </div>
      <div className="pf-topbar-context">
        <span><span className="pf-dim">LOC</span> <b>{location}</b></span>
        <span><span className="pf-dim">SET</span> <b>{set}</b></span>
        <span><span className="pf-dim">STN</span> <b>{station}</b></span>
        <span><span className="pf-dim">USR</span> <b>{employee}</b></span>
        <span><span className="pf-dim">SHIFT</span> <b>{shift}</b></span>
      </div>
      <div className="pf-topbar-right">
        <span className="pf-row" style={{ gap: 6 }}><span className="pf-conn-dot"></span>Camera service</span>
        <span className="pf-clock">{clock}</span>
      </div>
    </div>
  );
}

// ============== Progress rail ==============
const STEPS = [
  { n: "01", title: "Start Check", code: "INIT" },
  { n: "02", title: "Equipment", code: "PHYSICAL" },
  { n: "03", title: "Camera Connection", code: "USB · POWER" },
  { n: "04", title: "Camera Settings", code: "EXPOSURE" },
  { n: "05", title: "Composition", code: "LIVE VIEW" },
  { n: "06", title: "Test Capture", code: "QA" },
  { n: "07", title: "Station Ready", code: "LAUNCH" },
];

function Rail({ active, statuses = {}, runDuration = "04:18", checkId = "CFC-21088" }) {
  // statuses: { 1: 'done' | 'block' | undefined, ... }
  return (
    <aside className="pf-rail">
      <div className="pf-rail-head">
        <div className="pf-eyebrow">Check {checkId}</div>
        <h2>Pre-Shift Readiness</h2>
      </div>
      <div className="pf-rail-steps">
        {STEPS.map((s, i) => {
          const idx = i + 1;
          const status = statuses[idx];
          const isActive = idx === active;
          const cls = [
            "pf-step",
            isActive && "pf-step--active",
            status === "done" && "pf-step--done",
            status === "block" && "pf-step--block",
          ].filter(Boolean).join(" ");
          return (
            <div key={s.n} className={cls}>
              <div className="pf-step-num">
                {status === "done" ? <Icon.check size={13} />
                  : status === "block" ? <Icon.x size={13} />
                  : s.n}
              </div>
              <div className="pf-step-body">
                <strong>{s.title}</strong>
                <span>{s.code}</span>
              </div>
              <div className="pf-step-meta">
                {status === "done" ? "✓"
                  : status === "block" ? "!"
                  : isActive ? "›" : ""}
              </div>
            </div>
          );
        })}
      </div>
      <div className="pf-rail-foot">
        <div className="pf-meta-row"><span className="label">Run</span><span className="value">{runDuration}</span></div>
        <div className="pf-meta-row"><span className="label">RPS</span><span className="value" style={{ color: "var(--warn)" }}>CLOSED</span></div>
        <div className="pf-meta-row"><span className="label">Profile</span><span className="value">SANTA-T7</span></div>
      </div>
    </aside>
  );
}

// ============== Screen frame ==============
function Frame({ active, statuses, title, lede, eyebrow, footStatus, footActions, children, top }) {
  return (
    <div className="pf-app">
      <TopBar
        location="Desert Ridge Mall"
        set="Santa Set A"
        station="Camera 1"
        employee="Maria R."
        shift="Opening"
        clock={top?.clock}
      />
      <div className="pf-body">
        <Rail active={active} statuses={statuses} />
        <main className="pf-main">
          <div className="pf-main-head">
            <div>
              {eyebrow && <div className="pf-eyebrow-tag">{eyebrow}</div>}
              <h1>{title}</h1>
              {lede && <div className="lede">{lede}</div>}
            </div>
            {top?.right}
          </div>
          <div className="pf-main-body">{children}</div>
          <div className="pf-main-foot">
            <div className="pf-foot-status">{footStatus}</div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>{footActions}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Status pill helper
function Pill({ kind = "info", children }) {
  return (
    <span className={`pf-pill pf-pill--${kind}`}>
      <span className="dot"></span>
      {children}
    </span>
  );
}

// Mini icon wrapper used in callouts
function CalloutIcon({ kind }) {
  const I = kind === "fail" || kind === "warn" ? Icon.warn : kind === "pass" ? Icon.check : Icon.info;
  return <span className="pf-callout-ic"><I size={16} /></span>;
}

function Callout({ kind = "info", title, children, action }) {
  return (
    <div className={`pf-callout pf-callout--${kind}`}>
      <CalloutIcon kind={kind} />
      <div className="pf-callout-body pf-grow">
        <strong>{title}</strong>
        <div className="pf-callout-text">{children}</div>
      </div>
      {action}
    </div>
  );
}

Object.assign(window, { Icon, TopBar, Rail, Frame, Pill, Callout, STEPS });
