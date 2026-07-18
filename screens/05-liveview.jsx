// Screen 5: Live View Composition with Overlay — the centerpiece.

function LiveViewScreen() {
  return (
    <Frame
      active={5}
      statuses={{ 1: "done", 2: "done", 3: "done", 4: "done" }}
      eyebrow="Step 05 · Composition"
      title="Frame the set against the overlay"
      lede="Adjust the pole and tilt until the chair and character zone sit inside the guides. Backdrop must fill the frame; the bottom crop line must not cut the seated guest."
      top={{
        clock: "08:11:46",
        right: (
          <div className="pf-row" style={{ gap: 10 }}>
            <Pill kind="info">Live · 30 fps</Pill>
            <Pill kind="pass">Tether linked</Pill>
            <span className="pf-mono pf-dim" style={{ fontSize: 12 }}>Overlay v2.4 · Santa Set A</span>
          </div>
        ),
      }}
      footStatus={<>
        <Pill kind="warn">Composition · pending test capture</Pill>
        <span className="pf-mono">f/8 · 1/160 · ISO 200 · WB FLASH · JPEG L</span>
      </>}
      footActions={
        <>
          <button className="pf-btn pf-btn--lg">
            <Icon.pause /> Pause Live View
          </button>
          <button className="pf-btn pf-btn--lg">Back</button>
          <button className="pf-btn pf-btn--lg pf-btn--primary">
            <Icon.shutter size={16} /> Capture Test Image<span className="kbd">␣</span>
          </button>
        </>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, height: "100%" }}>
        <div className="pf-stack-md" style={{ minWidth: 0 }}>
          <LiveViewFrame />

          {/* Quick controls below */}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, alignItems: "center" }}>
            <div className="pf-seg">
              <span className="pf-seg-opt pf-seg-opt--on">Overlay</span>
              <span className="pf-seg-opt">Grid</span>
              <span className="pf-seg-opt">Reference</span>
              <span className="pf-seg-opt">Clean</span>
            </div>
            <div className="pf-row" style={{ gap: 14, justifyContent: "center" }}>
              <SlideMini label="Overlay opacity" value="78%" />
              <SlideMini label="Zoom" value="100%" />
              <SlideMini label="Brightness aid" value="OFF" />
            </div>
            <div className="pf-row">
              <button className="pf-btn">
                <Icon.refresh size={13}/> Re-detect set
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="pf-stack-md">
          <div className="pf-card">
            <div className="pf-card-title">Overlay profile</div>
            <div className="pf-kv"><span className="k">Profile</span><span className="v">Santa Set A</span></div>
            <div className="pf-kv"><span className="k">Reference image</span>
              <span className="v" style={{ color: "var(--pass)" }}>Available</span>
            </div>
            <div className="pf-kv"><span className="k">Camera angle</span>
              <span className="v">Staff confirmed</span>
            </div>
            <div className="pf-kv"><span className="k">Composition status</span>
              <span className="v" style={{ color: "var(--warn)" }}>Pending test</span>
            </div>
          </div>

          <div className="pf-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "14px 16px 8px" }}>
              <div className="pf-card-title" style={{ marginBottom: 4 }}>Reference frame</div>
              <div style={{ fontSize: 11.5, color: "var(--text-dim)" }} className="pf-mono">CAPTURED 2024-11-04 · LEAD APPROVED</div>
            </div>
            <ReferenceThumb />
          </div>

          <div className="pf-card">
            <div className="pf-card-title">Live telemetry</div>
            <div className="pf-kv"><span className="k">Stream</span><span className="v" style={{ color: "var(--pass)" }}>30.0 fps</span></div>
            <div className="pf-kv"><span className="k">Latency</span><span className="v">62 ms</span></div>
            <div className="pf-kv"><span className="k">Lens</span><span className="v">EF-S 18-55 @ 24mm</span></div>
            <div className="pf-kv"><span className="k">AF point</span><span className="v">Center · locked</span></div>
            <div className="pf-kv"><span className="k">Strobe ready</span><span className="v" style={{ color: "var(--pass)" }}>Yes · 1.4s recycle</span></div>
          </div>

          <Callout kind="info" title="Staff tip">
            Stand to the right of the strobe so you don’t cast a shadow. The chair’s back should sit just below the headroom line.
          </Callout>
        </div>
      </div>
    </Frame>
  );
}

function SlideMini({ label, value }) {
  return (
    <div className="pf-row" style={{ gap: 10 }}>
      <span className="pf-mono pf-dim" style={{ fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      <div style={{
        width: 100, height: 4, borderRadius: 2,
        background: "var(--bg-inset)", border: "1px solid var(--line-strong)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, width: "78%", background: "var(--info-2)" }} />
      </div>
      <span className="pf-mono" style={{ fontSize: 11, minWidth: 32 }}>{value}</span>
    </div>
  );
}

// ============================================================
// The actual live view canvas — SVG-stacked scene + overlay
// ============================================================
function LiveViewFrame() {
  return (
    <div className="pf-liveview" style={{ aspectRatio: "16 / 10" }}>
      {/* Scene */}
      <SantaScene />

      {/* Overlay guides */}
      <Overlay />

      {/* HUD bits */}
      <div className="pf-lv-rec">
        <span className="dot"></span>
        <span className="pf-mono" style={{ fontSize: 11 }}>LIVE</span>
      </div>
      <div className="pf-lv-strip">
        <div className="seg">f/<b>8</b></div>
        <div className="seg">1/<b>160</b></div>
        <div className="seg">ISO <b>200</b></div>
        <div className="seg">WB <b>FL</b></div>
      </div>

      <span className="pf-lv-corner tl" style={{ borderColor: "var(--cyan)" }}></span>
      <span className="pf-lv-corner tr" style={{ borderColor: "var(--cyan)" }}></span>
      <span className="pf-lv-corner bl" style={{ borderColor: "var(--cyan)" }}></span>
      <span className="pf-lv-corner br" style={{ borderColor: "var(--cyan)" }}></span>

      <div className="pf-lv-bottom">
        <span>EOS REBEL T7 · LV</span>
        <span style={{ textAlign: "center" }}>
          <span style={{ color: "var(--cyan)", fontWeight: 500 }}>SANTA SET A</span>
          <span className="pf-dim" style={{ margin: "0 8px" }}>·</span>
          <span>OVERLAY ENGAGED</span>
        </span>
        <span>08:11:46</span>
      </div>
    </div>
  );
}

// Stylized Santa scene that LOOKS like a live view feed
function SantaScene() {
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="velvet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b0f1f" />
          <stop offset="55%" stopColor="#811c30" />
          <stop offset="100%" stopColor="#3a0815" />
        </linearGradient>
        <radialGradient id="spot" cx="0.5" cy="0.32" r="0.55">
          <stop offset="0%" stopColor="rgba(255,232,180,0.45)" />
          <stop offset="55%" stopColor="rgba(255,232,180,0.0)" />
        </radialGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b1d0d" />
          <stop offset="100%" stopColor="#180a04" />
        </linearGradient>
        <linearGradient id="chair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a3a0f" />
          <stop offset="100%" stopColor="#3d1a05" />
        </linearGradient>
        <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4222b" />
          <stop offset="100%" stopColor="#7c1018" />
        </linearGradient>
        <linearGradient id="snow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fafcff" />
          <stop offset="100%" stopColor="#cfd6e0" />
        </linearGradient>
      </defs>

      {/* Backdrop velvet */}
      <rect x="0" y="0" width="1600" height="700" fill="url(#velvet)" />
      {/* Drape folds */}
      {[140, 380, 1100, 1340, 1480].map(x => (
        <path key={x} d={`M${x} 0 Q${x + 30} 350 ${x - 20} 700`} stroke="rgba(0,0,0,0.32)" strokeWidth="40" fill="none" opacity="0.5" />
      ))}
      {/* Wreath */}
      <g transform="translate(280, 130)">
        <circle r="78" fill="none" stroke="#2a4a1c" strokeWidth="22" />
        <circle r="78" fill="none" stroke="#4a7a2c" strokeWidth="14" strokeDasharray="5 10" opacity="0.9"/>
        <circle r="78" fill="none" stroke="#80b04c" strokeWidth="6" strokeDasharray="2 6" opacity="0.8"/>
        <circle r="14" fill="#c43a2a" cx="40" cy="-50"/>
        <circle r="10" fill="#c43a2a" cx="-50" cy="20"/>
        <circle r="11" fill="#c43a2a" cx="0" cy="55"/>
        <rect x="-30" y="62" width="60" height="22" fill="#c43a2a" rx="3"/>
        <rect x="-12" y="50" width="24" height="55" fill="#c43a2a" rx="2"/>
      </g>
      {/* Garland on top */}
      <path d="M0 50 Q400 130 800 60 Q1200 -10 1600 70 L1600 0 L0 0 Z" fill="#1d3a14" />
      <path d="M0 50 Q400 130 800 60 Q1200 -10 1600 70" fill="none" stroke="#4a7a2c" strokeWidth="8" strokeDasharray="3 8" />
      {[200, 460, 760, 1080, 1380].map((x, i) => (
        <g key={x} transform={`translate(${x}, ${60 + Math.sin(i)*10})`}>
          <circle r="7" fill="#c43a2a"/>
        </g>
      ))}

      {/* Spotlight */}
      <ellipse cx="800" cy="450" rx="600" ry="380" fill="url(#spot)" />

      {/* Snow floor */}
      <rect x="0" y="700" width="1600" height="300" fill="url(#floor)" />
      <ellipse cx="800" cy="710" rx="700" ry="80" fill="url(#snow)" opacity="0.92" />
      <ellipse cx="800" cy="780" rx="900" ry="120" fill="url(#snow)" opacity="0.65" />

      {/* Big throne chair */}
      <g transform="translate(800, 540)">
        {/* shadow */}
        <ellipse cx="0" cy="280" rx="320" ry="36" fill="rgba(0,0,0,0.55)" />
        {/* chair back */}
        <rect x="-220" y="-180" width="440" height="380" rx="20" fill="url(#chair)" />
        <rect x="-200" y="-160" width="400" height="360" rx="16" fill="none" stroke="#a05518" strokeWidth="3" opacity="0.7"/>
        {/* arms */}
        <rect x="-280" y="40" width="60" height="180" rx="14" fill="#5a2c0b" />
        <rect x="220" y="40" width="60" height="180" rx="14" fill="#5a2c0b" />
        {/* cushion */}
        <rect x="-200" y="60" width="400" height="120" rx="12" fill="#bd1e29" />
        <path d="M-200 90 Q0 70 200 90" stroke="rgba(0,0,0,0.18)" strokeWidth="6" fill="none" />
        {/* gold trim */}
        <circle cx="-200" cy="-160" r="14" fill="#c79434"/>
        <circle cx="200" cy="-160" r="14" fill="#c79434"/>
      </g>

      {/* Santa figure */}
      <g transform="translate(800, 370)">
        {/* body suit */}
        <path d="M-130 -10 Q-160 200 -100 230 L100 230 Q160 200 130 -10 Q90 -40 0 -40 Q-90 -40 -130 -10 Z" fill="url(#suit)" />
        {/* white trim */}
        <rect x="-110" y="208" width="220" height="28" fill="url(#snow)" />
        <rect x="-30" y="-10" width="60" height="240" fill="url(#snow)" opacity="0.96"/>
        <circle cx="0" cy="60" r="9" fill="#2a2a2a"/>
        <circle cx="0" cy="120" r="9" fill="#2a2a2a"/>
        <circle cx="0" cy="180" r="9" fill="#2a2a2a"/>
        {/* belt */}
        <rect x="-110" y="140" width="220" height="32" fill="#1c1c1c" />
        <rect x="-22" y="142" width="44" height="28" fill="#c79434" />
        {/* head */}
        <circle cx="0" cy="-80" r="58" fill="#f4c8a6" />
        {/* beard */}
        <path d="M-58 -80 Q-70 -10 0 -10 Q70 -10 58 -80 Q40 -45 0 -45 Q-40 -45 -58 -80 Z" fill="url(#snow)" />
        <ellipse cx="0" cy="-55" rx="14" ry="10" fill="#e8a282" />
        <circle cx="-18" cy="-95" r="3.5" fill="#1c1c1c" />
        <circle cx="18" cy="-95" r="3.5" fill="#1c1c1c" />
        {/* mustache */}
        <path d="M-22 -65 Q0 -52 22 -65 Q14 -54 0 -54 Q-14 -54 -22 -65 Z" fill="url(#snow)" />
        {/* hat */}
        <path d="M-58 -120 Q-30 -180 30 -195 Q60 -160 60 -125 Z" fill="url(#suit)" />
        <ellipse cx="-2" cy="-120" rx="62" ry="14" fill="url(#snow)" />
        <circle cx="46" cy="-188" r="14" fill="url(#snow)" />
      </g>

      {/* Subtle film grain overlay */}
      <rect width="1600" height="1000" fill="white" opacity="0.015"/>
    </svg>
  );
}

// Cyan composition overlay guides
function Overlay() {
  return (
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <defs>
        <pattern id="thirds" width="533.33" height="333.33" patternUnits="userSpaceOnUse">
          <rect width="533.33" height="333.33" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1600" height="1000" fill="url(#thirds)" />

      {/* Center vertical */}
      <line x1="800" y1="40" x2="800" y2="960" stroke="var(--cyan)" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.7"/>
      <circle cx="800" cy="500" r="6" fill="none" stroke="var(--cyan)" strokeWidth="1.5"/>
      <circle cx="800" cy="500" r="2" fill="var(--cyan)"/>

      {/* Character / chair zone */}
      <rect x="540" y="220" width="520" height="640" rx="6"
        fill="rgba(94,234,212,0.06)" stroke="var(--cyan)" strokeWidth="2" strokeDasharray="8 6" />
      <text x="558" y="248" fontFamily="ui-monospace, Menlo, monospace" fontSize="16"
        fill="#5eead4" letterSpacing="0.15em">CHARACTER · CHAIR ZONE</text>

      {/* Headroom line */}
      <line x1="40" y1="200" x2="1560" y2="200" stroke="#5eead4" strokeWidth="1.5" strokeDasharray="2 8" opacity="0.85" />
      <rect x="1418" y="184" width="138" height="22" fill="rgba(94,234,212,0.18)" stroke="var(--cyan)" />
      <text x="1428" y="200" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fill="#e6ecf3" letterSpacing="0.12em">HEADROOM</text>

      {/* Left / right backdrop boundary lines */}
      <line x1="120" y1="40" x2="120" y2="960" stroke="#eab308" strokeWidth="1.5" opacity="0.55" strokeDasharray="6 6"/>
      <line x1="1480" y1="40" x2="1480" y2="960" stroke="#eab308" strokeWidth="1.5" opacity="0.55" strokeDasharray="6 6"/>
      <text x="44" y="500" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fill="#eab308" letterSpacing="0.12em" transform="rotate(-90 44 500)">BACKDROP EDGE · L</text>
      <text x="1540" y="500" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fill="#eab308" letterSpacing="0.12em" transform="rotate(-90 1540 500)">BACKDROP EDGE · R</text>

      {/* Guest seating zone (inside chair zone, lower) */}
      <rect x="600" y="500" width="400" height="340" rx="4" fill="none" stroke="rgba(34,197,94,0.7)" strokeWidth="1.5" strokeDasharray="4 5"/>
      <rect x="612" y="510" width="148" height="22" fill="rgba(34,197,94,0.2)" stroke="var(--pass)" />
      <text x="620" y="526" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fill="#e6ecf3" letterSpacing="0.12em">GUEST SEAT</text>

      {/* Bottom crop safety line */}
      <line x1="40" y1="880" x2="1560" y2="880" stroke="#dc2626" strokeWidth="1.6" strokeDasharray="2 8" />
      <rect x="44" y="864" width="180" height="22" fill="rgba(220,38,38,0.22)" stroke="var(--fail)" />
      <text x="54" y="880" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fill="#fff" letterSpacing="0.12em">CROP · DO NOT CUT</text>

      {/* Aiming arrow micro-correction */}
      <g transform="translate(1080, 540)">
        <path d="M-30 0 L30 0 M22 -7 L30 0 L22 7" stroke="#5eead4" strokeWidth="2" fill="none" />
        <text x="40" y="5" fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fill="#5eead4" letterSpacing="0.1em">PAN ← 6°</text>
      </g>
    </svg>
  );
}

// Reference image thumbnail
function ReferenceThumb() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
      <SantaScene />
      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
      }} />
      <div style={{
        position: "absolute", top: 10, left: 10,
        padding: "3px 8px", background: "rgba(0,0,0,0.55)",
        border: "1px solid rgba(255,255,255,0.16)", borderRadius: 4,
        fontSize: 10.5, fontFamily: "var(--mono)", letterSpacing: "0.1em",
        color: "rgba(255,255,255,0.85)",
      }}>REFERENCE</div>
    </div>
  );
}

window.LiveViewScreen = LiveViewScreen;
window.SantaScene = SantaScene;
