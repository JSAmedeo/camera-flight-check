// Camera Flight Check — Simple Mode: FAILURE / EDGE-CASE SCREENS
// Same friendly, one-task-per-screen voice as the happy path.
// Each screen names where it appears in the flow and how to recover.

const FI = {
  cameraOff: (p = {}) =>
    <svg viewBox="0 0 64 64" width={p.size || 68} height={p.size || 68} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M8 18h9l4-6h14" />
      <path d="M50 18h6v28" />
      <path d="M8 22v28h34" />
      <circle cx="28" cy="34" r="9" strokeDasharray="3 4" />
      <path d="M6 8l52 52" strokeWidth="3" />
    </svg>,
  battery: (p = {}) =>
    <svg viewBox="0 0 64 64" width={p.size || 64} height={p.size || 64} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <rect x="8" y="20" width="42" height="24" rx="4" />
      <path d="M50 28h6v8h-6" />
      <rect x="14" y="26" width="8" height="12" rx="1.5" fill="currentColor" stroke="none" />
    </svg>,
  disconnect: (p = {}) =>
    <svg viewBox="0 0 64 64" width={p.size || 64} height={p.size || 64} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M28 12l-8 8 8 8" />
      <path d="M20 20h10a8 8 0 018 8" transform="translate(0 0)" />
      <path d="M36 52l8-8-8-8" />
      <path d="M44 44H34a8 8 0 01-8-8" />
      <path d="M6 6l52 52" strokeWidth="3" />
    </svg>,
  darkPhoto: (p = {}) =>
    <svg viewBox="0 0 64 64" width={p.size || 64} height={p.size || 64} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 8a24 24 0 100 48 18 18 0 010-48z" />
    </svg>,
  lifebuoy: (p = {}) =>
    <svg viewBox="0 0 64 64" width={p.size || 70} height={p.size || 70} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <circle cx="32" cy="32" r="24" />
      <circle cx="32" cy="32" r="10" />
      <path d="M15 15l9.5 9.5M49 15l-9.5 9.5M15 49l9.5-9.5M49 49l-9.5-9.5" />
    </svg>,
  card: (p = {}) =>
    <svg viewBox="0 0 64 64" width={p.size || 64} height={p.size || 64} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <rect x="12" y="16" width="40" height="32" rx="4" />
      <path d="M6 6l52 52" strokeWidth="3" />
    </svg>,
  check: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6" /></svg>,
  x: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>,
  warn: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l10 18H2L12 3z" /><path d="M12 10v5M12 18v.5" /></svg>,
  arrow: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  back: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>,
  refresh: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M21 12a9 9 0 11-3-6.7" /><path d="M21 4v5h-5" /></svg>,
  shutter: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 22} height={p.size || 22} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" /></svg>,
  phone: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>,
  help: (p = {}) =>
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 014.8 1c0 1.5-2.3 1.7-2.3 3.5" /><circle cx="12" cy="17" r="0.8" fill="currentColor" /></svg>,
  plug: (p = {}) =>
    <svg viewBox="0 0 64 64" width={p.size || 40} height={p.size || 40} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"><path d="M22 8v10M42 8v10" /><rect x="16" y="18" width="32" height="14" rx="3" /><path d="M32 32v8c0 4-4 6-8 6h-6" /><circle cx="14" cy="46" r="4" /></svg>,
  bolt: (p = {}) =>
    <svg viewBox="0 0 64 64" width={p.size || 40} height={p.size || 40} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"><path d="M36 6L16 36h14l-4 22 22-30H34z" /></svg>,
};

// ============================================================
// Chrome (mirrors the happy-path app, but read-only for showcase)
// ============================================================
function FailTop() {
  return (
    <div className="s-top">
      <div className="s-top-brand">
        <div className="s-top-mark">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <path d="M3 7h3.5l1.5-2h8l1.5 2H21v12H3z" /><circle cx="12" cy="13" r="4.5" />
          </svg>
        </div>
        <div>
          <div className="s-top-title">Camera Check</div>
          <div className="s-top-sub">Run daily or as needed</div>
        </div>
      </div>
      <div className="s-top-station"><span>Santa Set A · <b>Camera 1</b></span></div>
      <button className="s-help-btn"><FI.help size={16} /> Get help</button>
    </div>);
}

const STEP_LABELS = ["Welcome", "Walk-around", "Camera", "Test photo", "Done"];
function FailSteps({ step, tone = "warn" }) {
  return (
    <div className="s-steps">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const isActive = n === step;
        const isDone = n < step;
        return (
          <React.Fragment key={label}>
            <div className={`s-dot ${isActive ? "s-dot--active" : ""} ${isDone ? "s-dot--done" : ""}`}>
              <div
                className={`s-dot-mark ${isDone ? "s-dot-mark--done" : ""}`}
                style={isActive ? {
                  background: tone === "fail" ? "var(--fail)" : "var(--warn)",
                  borderColor: tone === "fail" ? "var(--fail)" : "var(--warn)",
                  color: "white",
                  boxShadow: `0 0 0 4px ${tone === "fail" ? "rgba(220,38,38,0.22)" : "rgba(234,179,8,0.22)"}`,
                } : undefined}>
                {isDone ? <FI.check size={16} /> : isActive ? <FI.warn size={15} /> : n}
              </div>
              {isActive && <span className="s-dot-label" style={{ color: "var(--text)" }}>{label}</span>}
            </div>
            {i < STEP_LABELS.length - 1 && <div className={`s-dot-sep ${isDone ? "s-dot-sep--done" : ""}`} />}
          </React.Fragment>);
      })}
    </div>);
}

function FailFoot({ left, back, primary }) {
  return (
    <div className="s-foot">
      <div className="s-foot-status">{left}</div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>{back}{primary}</div>
    </div>);
}

// A status row with a tone (fail / warn / pass)
function Row({ tone = "fail", icon, label, sub, right }) {
  const toneCls = tone === "pass" ? "" : tone === "warn" ? "fr-ic--warn" : "fr-ic--fail";
  const rightCls = tone === "pass" ? "" : tone === "warn" ? "fr-right--warn" : "fr-right--fail";
  return (
    <div className="s-row">
      <div className={`s-row-ic ${toneCls}`}>{icon}</div>
      <div>
        <div className="s-row-label">{label}</div>
        {sub && <div className="s-row-sub">{sub}</div>}
      </div>
      {right && <div className={`s-row-right ${rightCls}`}>{right}</div>}
    </div>);
}

// "What to check" fix list
function FixList({ items }) {
  return (
    <ul className="s-checklist" style={{ width: "100%", maxWidth: 620 }}>
      {items.map((it, i) =>
        <li key={i}>
          <span className="s-checklist-dot" style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }} />
          <div><b>{it.title}</b><span>{it.sub}</span></div>
        </li>)}
    </ul>);
}

// ============================================================
// F1 — Camera not found  (Step 3, auto-check)
// ============================================================
function FailCameraNotFound({ onBack }) {
  return (
    <>
      <FailSteps step={3} tone="fail" />
      <div className="s-body">
        <div className="s-screen s-fadeup">
          <div className="s-hero-ic s-hero-ic--fail"><FI.cameraOff size={72} /></div>
          <h1 className="s-h1 s-h1--small">We can't find your camera</h1>
          <p className="s-lede">The computer isn't seeing the camera yet. It's almost always the cable — let's check it together.</p>
          <FixList items={[
            { title: "The USB cable is plugged into the camera", sub: "Push it in until it clicks — no gap at the port." },
            { title: "The other end is in the computer's blue port", sub: "Try a different blue USB port if you're not sure." },
            { title: "The camera is switched ON", sub: "Look for the small light on the back of the camera." },
          ]} />
        </div>
      </div>
      <FailFoot
        left={<span className="fr-status fr-status--fail"><FI.x size={15} /> Camera not detected</span>}
        back={<button className="s-btn s-btn--back"><FI.back /> Back</button>}
        primary={<button className="s-btn s-btn--primary s-btn--xl"><FI.refresh size={20} /> Try again</button>} />
    </>);
}

// ============================================================
// F2 — Battery low / storage full  (Step 3, auto-check)
// ============================================================
function FailBatteryLow({ onBack }) {
  return (
    <>
      <FailSteps step={3} tone="warn" />
      <div className="s-body">
        <div className="s-screen s-fadeup">
          <div className="s-hero-ic" style={{ background: "var(--warn-soft)", border: "1px solid rgba(234,179,8,0.45)", color: "var(--warn)" }}>
            <FI.battery size={64} />
          </div>
          <h1 className="s-h1 s-h1--small">The camera battery is low</h1>
          <p className="s-lede">There's only <b>8% left</b> — that won't last your shift. Swap in a charged battery from the drawer before you keep going.</p>
          <div style={{ width: "100%", maxWidth: 620, marginTop: 4 }}>
            <Row tone="warn" icon={<FI.battery size={22} />} label="Battery is at 8%" sub="A full battery lasts a whole shift" right={<><FI.warn size={15} /> Swap it</>} />
            <Row tone="pass" icon={<FI.check size={20} />} label="Storage has plenty of room" sub="1,240 photos free" right={<><FI.check size={15} /> OK</>} />
          </div>
        </div>
      </div>
      <FailFoot
        left={<span className="fr-status fr-status--warn"><FI.warn size={15} /> 1 thing to fix</span>}
        back={<button className="s-btn s-btn--back"><FI.back /> Back</button>}
        primary={<button className="s-btn s-btn--primary s-btn--xl"><FI.refresh size={20} /> I swapped it — check again</button>} />
    </>);
}

// ============================================================
// F3 — Grey card calibration didn't work  (Step 3, tap stage)
// ============================================================
function FailGreyCard({ onBack }) {
  return (
    <>
      <FailSteps step={3} tone="warn" />
      <div className="s-body">
        <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
          <div className="s-stage">
            <div className="s-photo s-photo--portrait">
              <img src="assets/live-feed-santa.png" alt="Camera feed" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(8,10,14,0.45)" }} />
              <div className="s-photo-pill"><span className="dot" /> Couldn't read the card</div>
            </div>
            <div className="s-stage-side">
              <div className="fr-badge fr-badge--warn"><FI.warn size={14} /> Calibration didn't work</div>
              <h1 className="s-h1 s-h1--small s-h1--left">Let's redo the grey card</h1>
              <p className="s-lede s-lede--left">We couldn't get a clean reading off the card. That's usually one of these — then take the photo again.</p>
              <ul className="s-checklist">
                <li><span className="s-checklist-dot" style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }} /><div><b>Card is fully in frame</b><span>All four corners visible, held flat against the chest.</span></div></li>
                <li><span className="s-checklist-dot" style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }} /><div><b>No shadow or fingers on it</b><span>Keep hands to the edges and away from the strobe's shadow.</span></div></li>
                <li><span className="s-checklist-dot" style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }} /><div><b>Tap the middle of the card</b><span>Aim for the center, not an edge.</span></div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FailFoot
        left={<span className="fr-status fr-status--warn"><FI.warn size={15} /> Try the grey card once more</span>}
        back={<button className="s-btn s-btn--back"><FI.back /> Back</button>}
        primary={<button className="s-btn s-btn--primary s-btn--xl"><FI.shutter size={22} /> Take the photo again</button>} />
    </>);
}

// ============================================================
// F4 — Test photo too dark  (Step 4, review)
// ============================================================
function FailPhotoDark({ onBack }) {
  return (
    <>
      <FailSteps step={4} tone="warn" />
      <div className="s-body">
        <div className="s-screen s-screen--wide s-screen--compact s-fadeup">
          <div className="s-stage">
            <div className="s-photo s-photo--portrait">
              <img src="assets/test-photo-santa.png" alt="Test photo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.28) contrast(1.05)" }} />
              <div className="s-photo-pill"><span className="dot" /> Too dark</div>
            </div>
            <div className="s-stage-side">
              <div className="fr-badge fr-badge--warn"><FI.warn size={14} /> This photo won't pass</div>
              <h1 className="s-h1 s-h1--small s-h1--left">This came out too dark</h1>
              <p className="s-lede s-lede--left">The strobe probably didn't fire when you took the photo. Check it, then take another one.</p>
              <ul className="s-checklist">
                <li><span className="s-checklist-dot" style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }} /><div><b>Strobe is powered on</b><span>Green "ready" light showing on the back — not red or blinking.</span></div></li>
                <li><span className="s-checklist-dot" style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }} /><div><b>Sync cable is seated</b><span>The thin cable from the strobe to the camera is plugged in both ends.</span></div></li>
                <li><span className="s-checklist-dot" style={{ borderColor: "var(--accent)", background: "var(--accent-soft)" }} /><div><b>Wait for the light</b><span>Give the strobe a second to recharge between shots.</span></div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FailFoot
        left={<span className="fr-status fr-status--warn"><FI.warn size={15} /> Check the strobe and retake</span>}
        back={<button className="s-btn s-btn--back"><FI.back /> Back</button>}
        primary={<button className="s-btn s-btn--primary s-btn--xl"><FI.shutter size={22} /> Take it again</button>} />
    </>);
}

// ============================================================
// F5 — Camera disconnected mid-check  (can happen anytime)
// ============================================================
function FailDisconnected({ onBack }) {
  return (
    <>
      <FailSteps step={3} tone="fail" />
      <div className="s-body">
        <div className="s-screen s-fadeup">
          <div className="s-hero-ic s-hero-ic--fail"><FI.disconnect size={64} /></div>
          <h1 className="s-h1 s-h1--small">The camera got disconnected</h1>
          <p className="s-lede">We lost the connection to the camera. Nothing you did is lost — plug it back in and we'll pick up right where you left off.</p>
          <FixList items={[
            { title: "Re-seat the USB cable at the camera", sub: "A little slack stops it pulling loose on the pole." },
            { title: "Check the cable at the computer", sub: "Same blue port as before." },
          ]} />
        </div>
      </div>
      <FailFoot
        left={<span className="fr-status fr-status--fail"><FI.x size={15} /> Connection lost</span>}
        back={<button className="s-btn s-btn--back"><FI.back /> Back</button>}
        primary={<button className="s-btn s-btn--primary s-btn--xl"><FI.refresh size={20} /> It's plugged back in</button>} />
    </>);
}

// ============================================================
// F6 — Still stuck: get a manager  (station stays blocked)
// ============================================================
function FailGetHelp({ onBack }) {
  return (
    <>
      <FailSteps step={3} tone="fail" />
      <div className="s-body">
        <div className="s-screen s-fadeup">
          <div className="s-hero-ic s-hero-ic--fail"><FI.lifebuoy size={70} /></div>
          <h1 className="s-h1 s-h1--small">Let's get someone to help</h1>
          <p className="s-lede">This station isn't ready yet, so the photo app will stay closed until it's fixed. Give your manager a call — they can take a look with you.</p>

          <div className="fr-contacts">
            <div className="fr-contact">
              <div className="fr-contact-eyebrow">Local Manager</div>
              <div className="fr-contact-name">On duty</div>
              <a className="fr-contact-phone" href="tel:+15551234567"><FI.phone size={16} /> (555) 123-4567</a>
            </div>
            <div className="fr-contact">
              <div className="fr-contact-eyebrow">Support Helpdesk</div>
              <div className="fr-contact-name">Technical issues</div>
              <a className="fr-contact-phone" href="tel:+18005550199"><FI.phone size={16} /> 1 (800) 555-0199</a>
            </div>
          </div>

          <div className="fr-note"><FI.warn size={16} /> The camera app stays locked until the check passes. Your manager can help clear it.</div>
        </div>
      </div>
      <FailFoot
        left={<span className="fr-status fr-status--fail"><FI.x size={15} /> Station not ready</span>}
        back={<button className="s-btn s-btn--back"><FI.back /> Back to check</button>}
        primary={<button className="s-btn s-btn--primary s-btn--xl"><FI.refresh size={20} /> Try the check again</button>} />
    </>);
}

// ============================================================
// Showcase harness — scale + navigate the failure screens
// ============================================================
const SCREENS = [
  { key: "not-found", where: "Step 3 · Camera", title: "Camera not found", render: (p) => <FailCameraNotFound {...p} /> },
  { key: "battery", where: "Step 3 · Camera", title: "Battery low", render: (p) => <FailBatteryLow {...p} /> },
  { key: "greycard", where: "Step 3 · Calibration", title: "Grey card failed", render: (p) => <FailGreyCard {...p} /> },
  { key: "dark", where: "Step 4 · Test photo", title: "Photo too dark", render: (p) => <FailPhotoDark {...p} /> },
  { key: "disconnect", where: "Any step", title: "Camera disconnected", render: (p) => <FailDisconnected {...p} /> },
  { key: "gethelp", where: "Step 3 · Blocked", title: "Get a manager", render: (p) => <FailGetHelp {...p} /> },
];

const STAGE_W = 1440, STAGE_H = 900;
function useScale(w, h) {
  const [s, setS] = React.useState(1);
  React.useEffect(() => {
    const c = () => setS(Math.min(window.innerWidth / w, window.innerHeight / h));
    c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c);
  }, [w, h]);
  return s;
}

function FailShowcase() {
  const [i, setI] = React.useState(0);
  const scale = useScale(STAGE_W, STAGE_H);
  const total = SCREENS.length;
  const next = () => setI((n) => Math.min(total - 1, n + 1));
  const prev = () => setI((n) => Math.max(0, n - 1));

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cur = SCREENS[i];
  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "#0a0d12", overflow: "hidden" }}>
        <div style={{
          width: STAGE_W, height: STAGE_H, position: "absolute", top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: "center center",
          borderRadius: 4, boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)", overflow: "hidden",
        }}>
          <div className="s-app">
            <FailTop />
            {cur.render({ onBack: prev })}
          </div>
        </div>
      </div>
      <ShowcaseHUD i={i} total={total} cur={cur} next={next} prev={prev} setI={setI} />
    </>);
}

function ShowcaseHUD({ i, total, cur, next, prev, setI }) {
  return (
    <div data-proto-hud style={{
      position: "fixed", bottom: 18, left: "50%", transform: "translateX(-50%)",
      display: "flex", alignItems: "center", gap: 14, padding: "10px 16px",
      background: "rgba(10,13,18,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14,
      backdropFilter: "blur(16px)", boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
      fontFamily: "Geist, system-ui, sans-serif", color: "#e6ecf3", fontSize: 13, zIndex: 9999,
    }}>
      <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8e99ad" }}>Failure screens</span>
      <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)" }} />
      <button onClick={prev} disabled={i === 0} style={hudBtn(i === 0)}>← Back</button>
      <div style={{ display: "flex", gap: 6 }}>
        {SCREENS.map((s, n) =>
          <button key={s.key} onClick={() => setI(n)} title={s.title} style={{
            width: n === i ? 22 : 8, height: 6, borderRadius: 3, padding: 0, border: "none", cursor: "pointer",
            background: n === i ? "#f97316" : "rgba(255,255,255,0.16)", transition: "width .2s, background .2s",
          }} />)}
      </div>
      <span style={{ fontSize: 12.5, minWidth: 200, textAlign: "center" }}>
        <b>{cur.title}</b><span style={{ color: "#5a657a" }}> · {cur.where}</span>
      </span>
      <button onClick={next} disabled={i === total - 1} style={hudBtn(i === total - 1, true)}>Next →</button>
      <span style={{ fontSize: 10.5, color: "#5a657a", letterSpacing: "0.08em", paddingLeft: 4 }}>← →</span>
    </div>);
}
function hudBtn(disabled, primary) {
  return {
    height: 30, padding: "0 12px", borderRadius: 7,
    background: primary && !disabled ? "#ea580c" : "rgba(255,255,255,0.04)",
    border: `1px solid ${primary && !disabled ? "#ea580c" : "rgba(255,255,255,0.1)"}`,
    color: primary && !disabled ? "white" : disabled ? "#3d4759" : "#e6ecf3",
    cursor: disabled ? "default" : "pointer", fontFamily: "inherit", fontSize: 12.5, fontWeight: 500, opacity: disabled ? 0.5 : 1,
  };
}

ReactDOM.createRoot(document.getElementById("fail-root")).render(<FailShowcase />);
