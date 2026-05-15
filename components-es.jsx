/* global React */
/* Spanish locale build of components.jsx — used by AstroGuide-es.html (landing iframes) */
const { useState, useEffect, useRef, useMemo } = React;

/* ─── Zodiac data (ES) ─── */
const SIGNS = [
  { id: 'aries',       sym: '♈', nm: 'ARIES',       full: 'Aries',       dates: '21 mar — 20 abr' },
  { id: 'taurus',      sym: '♉', nm: 'TAURO',       full: 'Tauro',       dates: '21 abr — 21 may' },
  { id: 'gemini',      sym: '♊', nm: 'GÉMINIS',     full: 'Géminis',     dates: '22 may — 21 jun' },
  { id: 'cancer',      sym: '♋', nm: 'CÁNCER',      full: 'Cáncer',      dates: '22 jun — 22 jul' },
  { id: 'leo',         sym: '♌', nm: 'LEO',         full: 'Leo',         dates: '23 jul — 22 ago' },
  { id: 'virgo',       sym: '♍', nm: 'VIRGO',       full: 'Virgo',       dates: '23 ago — 22 sep' },
  { id: 'libra',       sym: '♎', nm: 'LIBRA',       full: 'Libra',       dates: '23 sep — 22 oct' },
  { id: 'scorpio',     sym: '♏', nm: 'ESCORPIO',    full: 'Escorpio',    dates: '23 oct — 21 nov' },
  { id: 'sagittarius', sym: '♐', nm: 'SAGITARIO',   full: 'Sagitario',   dates: '22 nov — 21 dic' },
  { id: 'capricorn',   sym: '♑', nm: 'CAPRICORNIO', full: 'Capricornio', dates: '22 dic — 19 ene' },
  { id: 'aquarius',    sym: '♒', nm: 'ACUARIO',     full: 'Acuario',     dates: '20 ene — 18 feb' },
  { id: 'pisces',      sym: '♓', nm: 'PISCIS',      full: 'Piscis',      dates: '19 feb — 20 mar' },
];
window.SIGNS = SIGNS;
window.signById = (id) => SIGNS.find(s => s.id === id) || SIGNS[4];

/* ─── Starfield ─── */
function Starfield({ count = 26, seed = 7 }) {
  const stars = useMemo(() => {
    let s = seed * 9301 + 49297;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    return Array.from({ length: count }, () => ({
      x: rnd() * 100, y: rnd() * 100,
      r: rnd() < 0.18 ? 1.6 : 1.0,
      a: 0.25 + rnd() * 0.55,
      delay: rnd() * 6, dur: 4 + rnd() * 5,
      gold: rnd() < 0.35,
    }));
  }, [count, seed]);
  return (
    <svg className="starfield" width="100%" height="100%"
         style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <defs>
        <radialGradient id="cloud" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="rgba(201,168,106,0.06)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#cloud)" />
      {stars.map((st, i) => (
        <circle key={i} cx={`${st.x}%`} cy={`${st.y}%`} r={st.r}
          fill={st.gold ? '#E8D29E' : '#F0E8D8'} opacity={st.a}>
          <animate attributeName="opacity"
            values={`${st.a * 0.3};${st.a};${st.a * 0.3}`}
            dur={`${st.dur}s`} begin={`${-st.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}
window.Starfield = Starfield;

/* ─── Status bar ─── */
function StatusBar({ time = '9:41' }) {
  return (
    <div className="status-bar">
      <span>{time}</span>
      <span className="right">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="6" width="2" height="4" fill="currentColor" rx="0.5"/>
          <rect x="3" y="4" width="2" height="6" fill="currentColor" rx="0.5"/>
          <rect x="6" y="2" width="2" height="8" fill="currentColor" rx="0.5"/>
          <rect x="9" y="0" width="2" height="10" fill="currentColor" rx="0.5"/>
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M7 8.5C7.83 8.5 8.5 7.83 8.5 7C8.5 6.17 7.83 5.5 7 5.5C6.17 5.5 5.5 6.17 5.5 7C5.5 7.83 6.17 8.5 7 8.5Z" fill="currentColor"/>
          <path d="M2.5 4.5C3.78 3.28 5.32 2.5 7 2.5C8.68 2.5 10.22 3.28 11.5 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M0.5 2.5C2.36 0.73 4.55 0 7 0C9.45 0 11.64 0.73 13.5 2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        </svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
          <rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="currentColor" strokeOpacity="0.7"/>
          <rect x="2" y="2" width="13" height="6" rx="1" fill="currentColor"/>
          <rect x="19.5" y="3.5" width="2" height="3" rx="0.5" fill="currentColor"/>
        </svg>
      </span>
    </div>
  );
}
window.StatusBar = StatusBar;

/* ─── Bottom nav (ES) ─── */
const TABS = [
  { id: 'horoscope', glyph: '✦', label: 'Horóscopo' },
  { id: 'natal',     glyph: '✶', label: 'Carta' },
  { id: 'days',      glyph: '◐', label: 'Días' },
  { id: 'oracle',    glyph: '☽', label: 'Oráculo' },
  { id: 'profile',   glyph: '⚙', label: 'Perfil' },
];
function BottomNav({ active, onChange }) {
  return (
    <div className="bottom-nav">
      {TABS.map(t => (
        <button key={t.id} className={`nav-item ${active === t.id ? 'active' : ''}`}
                onClick={() => onChange(t.id)}>
          <span className="dot" />
          <span className="glyph">{t.glyph}</span>
          <span className="label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
window.BottomNav = BottomNav;
window.TABS = TABS;

/* ─── Page header ─── */
function PageHeader({ crumb, onBack, right }) {
  return (
    <div className="page-header">
      <button className="icon-btn" onClick={onBack} aria-label="Atrás">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <span className="crumb flex1">{crumb}</span>
      {right}
    </div>
  );
}
window.PageHeader = PageHeader;

/* ─── Glyph divider ─── */
function GlyphDivider({ glyph = '◆' }) {
  return (
    <div className="gdiv">
      <span className="line" /><span className="glyph">{glyph}</span><span className="line" />
    </div>
  );
}
window.GlyphDivider = GlyphDivider;

function Sigil({ size = 110, children }) {
  return (
    <div className="sigil-ring" style={{ width: size, height: size }}>
      <span style={{ fontFamily: "'Forum', serif", fontSize: size * 0.42,
        color: 'var(--gold)', textShadow: '0 0 24px rgba(201,168,106,0.45)',
        position: 'relative', zIndex: 1 }}>{children}</span>
    </div>
  );
}
window.Sigil = Sigil;

/* ─── Moon phase glyph ─── */
function MoonPhase({ phase = 0.35, size = 56 }) {
  const r = size / 2 - 2, cx = size / 2, cy = size / 2;
  const k = Math.abs(0.5 - phase) * 4;
  const lit = phase < 0.5;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={`mg${phase}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F0E8D8" />
          <stop offset="70%" stopColor="#C9A86A" />
          <stop offset="100%" stopColor="#8C7140" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(201,168,106,0.35)" strokeWidth="0.8" />
      <circle cx={cx} cy={cy} r={r - 1} fill={`url(#mg${phase})`} opacity="0.95" />
      <ellipse cx={cx + (lit ? -1 : 1) * r * k * 0.6} cy={cy} rx={r * (1 - k * 0.55)} ry={r}
        fill="#070711" opacity={phase === 0.5 ? 0 : 0.95} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#070711" strokeWidth="0.3" opacity="0.6" />
    </svg>
  );
}
window.MoonPhase = MoonPhase;

/* ─── Natal chart wheel ─── */
function NatalWheel({ size = 320 }) {
  const cx = size / 2, cy = size / 2;
  const rOuter = size / 2 - 4;
  const rZodiac = rOuter - 26;
  const rHouses = rZodiac - 36;
  const rPlanets = rHouses - 30;
  const signs = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
  const sectors = Array.from({ length: 12 }, (_, i) => {
    const a1 = (i * 30 - 90) * Math.PI / 180;
    const a2 = ((i + 1) * 30 - 90) * Math.PI / 180;
    return { a1, a2, mid: (a1 + a2) / 2, label: signs[i] };
  });
  const cusps = Array.from({ length: 12 }, (_, i) => (i * 30 - 90) * Math.PI / 180);
  const planets = [
    { sym: '☉', deg: 142 }, { sym: '☽', deg: 268 }, { sym: '☿', deg: 130 },
    { sym: '♀', deg: 178 }, { sym: '♂', deg: 22 }, { sym: '♃', deg: 305 },
    { sym: '♄', deg: 75 }, { sym: '♅', deg: 250 }, { sym: '♆', deg: 195 },
    { sym: '♇', deg: 95 },
  ];
  const planetPos = planets.map(p => {
    const ang = (p.deg - 90) * Math.PI / 180;
    return { ...p, ang, x: cx + Math.cos(ang) * rPlanets, y: cy + Math.sin(ang) * rPlanets };
  });
  const aspects = [[0,4],[1,7],[2,6],[3,8],[5,9],[0,2]];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="nwbg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,168,106,0.06)" />
          <stop offset="80%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={rOuter} fill="url(#nwbg)" />
      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="rgba(201,168,106,0.45)" strokeWidth="1"/>
      <circle cx={cx} cy={cy} r={rZodiac} fill="none" stroke="rgba(201,168,106,0.35)" strokeWidth="0.6"/>
      <circle cx={cx} cy={cy} r={rHouses} fill="none" stroke="rgba(201,168,106,0.22)" strokeWidth="0.6"/>
      <circle cx={cx} cy={cy} r={rPlanets - 18} fill="none" stroke="rgba(201,168,106,0.18)" strokeWidth="0.6"/>
      {sectors.map((s, i) => {
        const x1 = cx + Math.cos(s.a1) * rZodiac, y1 = cy + Math.sin(s.a1) * rZodiac;
        const x2 = cx + Math.cos(s.a1) * rOuter, y2 = cy + Math.sin(s.a1) * rOuter;
        const lx = cx + Math.cos(s.mid) * (rZodiac + 13), ly = cy + Math.sin(s.mid) * (rZodiac + 13);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,106,0.4)" strokeWidth="0.6"/>
            <text x={lx} y={ly} fill="#C9A86A" fontSize="13" fontFamily="Forum, serif"
                  textAnchor="middle" dominantBaseline="central">{s.label}</text>
          </g>
        );
      })}
      {cusps.map((a, i) => {
        const x1 = cx + Math.cos(a) * (rPlanets - 18), y1 = cy + Math.sin(a) * (rPlanets - 18);
        const x2 = cx + Math.cos(a) * rHouses, y2 = cy + Math.sin(a) * rHouses;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(201,168,106,0.22)" strokeWidth="0.6"/>;
      })}
      {aspects.map(([a, b], i) => (
        <line key={i} x1={planetPos[a].x} y1={planetPos[a].y}
              x2={planetPos[b].x} y2={planetPos[b].y}
              stroke="rgba(201,168,106,0.28)" strokeWidth="0.5"
              strokeDasharray={i % 2 ? '2 3' : ''}/>
      ))}
      {planetPos.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="11" fill="#0a0a14" stroke="rgba(201,168,106,0.5)" strokeWidth="0.6"/>
          <text x={p.x} y={p.y} fill="#E8D29E" fontSize="13" textAnchor="middle" dominantBaseline="central">{p.sym}</text>
        </g>
      ))}
      <circle cx={cx} cy={cy} r="3" fill="#C9A86A"/>
      <circle cx={cx} cy={cy} r="8" fill="none" stroke="rgba(201,168,106,0.3)" strokeWidth="0.5"/>
    </svg>
  );
}
window.NatalWheel = NatalWheel;

/* ─── Resonance ring (ES label) ─── */
function ResonanceRing({ value = 72, size = 220 }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  const color = value < 40 ? '#E26565' : value < 70 ? '#C9A86A' : '#4FBD6E';
  return (
    <div className="res-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="resGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E26565"/>
            <stop offset="50%" stopColor="#C9A86A"/>
            <stop offset="100%" stopColor="#4FBD6E"/>
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#resGrad)" strokeWidth={stroke}
                strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
                transform={`rotate(-90 ${size/2} ${size/2})`}
                style={{ transition: 'stroke-dashoffset 1200ms cubic-bezier(0.2,0.7,0.2,1)' }}/>
        <circle cx={size/2} cy={size/2} r={r - 14} fill="none" stroke="rgba(201,168,106,0.25)" strokeWidth="0.5"/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <div style={{ fontFamily: 'Yeseva One', fontSize: 56, color, lineHeight: 1 }}>{value}</div>
        <div className="section-label" style={{ fontSize: 9 }}>RESONANCIA / 100</div>
      </div>
    </div>
  );
}
window.ResonanceRing = ResonanceRing;
