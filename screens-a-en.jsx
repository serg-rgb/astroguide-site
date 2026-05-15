/* global React */
/* English locale build of screens-a.jsx */
const { useState, useEffect, useRef } = React;

/* ════════════ WELCOME ════════════ */
function WelcomeScreen({ onContinue }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div className="page full" style={{ display: 'flex', flexDirection: 'column',
         alignItems: 'center', justifyContent: 'center', padding: 32, position: 'relative' }}
         onClick={onContinue}>
      <Starfield count={48} seed={11} />
      <div style={{ position: 'absolute', top: '24%', left: '20%',
           width: 110, height: 110, borderRadius: '50%',
           background: 'radial-gradient(circle at 35% 30%, rgba(232,210,158,0.25), rgba(201,168,106,0.08) 50%, transparent 70%)',
           filter: 'blur(2px)', animation: 'fadeIn 2.5s ease forwards' }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center',
                    opacity: phase >= 1 ? 1 : 0, transition: 'opacity 1.2s ease' }}>
        <div className="sigil-ring" style={{ width: 140, height: 140, margin: '0 auto 36px' }}>
          <span style={{ fontFamily: 'Forum', fontSize: 52, color: 'var(--gold)',
                         textShadow: '0 0 36px rgba(201,168,106,0.55)', position: 'relative', zIndex: 1 }}>✶</span>
        </div>
        <div className="h-display" style={{ fontSize: 44, letterSpacing: '0.04em',
             opacity: phase >= 2 ? 1 : 0, transition: 'opacity 1.4s ease' }}>AstroGuide</div>
        <div className="poetic mt-12" style={{ opacity: phase >= 2 ? 0.85 : 0,
             transition: 'opacity 1.4s ease 0.4s', fontSize: 15 }}>the sky chart awaits</div>
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0,
                    textAlign: 'center', opacity: phase >= 2 ? 0.55 : 0,
                    transition: 'opacity 1s ease 1.2s' }}>
        <span className="section-label" style={{ fontSize: 10 }}>TAP TO CONTINUE</span>
      </div>
    </div>
  );
}
window.WelcomeScreen = WelcomeScreen;

/* ════════════ NATAL PROMO ════════════ */
function NatalPromoScreen({ onCreate, onSkip }) {
  return (
    <>
      <StatusBar />
      <div className="page full">
        <div className="page-pad" style={{ paddingTop: 8, paddingBottom: 28 }}>
          <div className="stagger" style={{ textAlign: 'center', paddingTop: 28 }}>
            <div>
              <div className="sigil-ring" style={{ width: 130, height: 130, margin: '0 auto 28px' }}>
                <span style={{ fontFamily: 'Forum', fontSize: 56, color: 'var(--gold)',
                               textShadow: '0 0 30px rgba(201,168,106,0.45)',
                               position: 'relative', zIndex: 1 }}>✶</span>
              </div>
            </div>
            <h1 className="h-display" style={{ fontSize: 30 }}>YOUR<br/>BIRTH CHART</h1>
            <p className="poetic mt-16" style={{ maxWidth: 280, margin: '16px auto 0' }}>
              The sky's portrait at the moment you arrived. Drawn once. Never moves.
            </p>
            <div className="glass mt-24" style={{ textAlign: 'left' }}>
              <div className="section-label mb-10">WHY IT MATTERS</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['☉', 'Forecasts use your real planets, not just your sun sign'],
                  ['☽', 'The moon journal listens to your moon'],
                  ['✦', 'Transits are calculated for you, personally'],
                ].map(([g, t]) => (
                  <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--gold)', fontFamily: 'Forum', fontSize: 18,
                                   width: 22, flexShrink: 0 }}>{g}</span>
                    <span className="muted" style={{ fontSize: 13, lineHeight: 1.55 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col gap-10 mt-24">
              <button className="btn primary block" onClick={onCreate}>Draw my chart</button>
              <button className="btn outline block" onClick={onSkip}>Skip for now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
window.NatalPromoScreen = NatalPromoScreen;

/* ════════════ HOROSCOPE ════════════ */
function HoroscopeScreen({ hasNatal, name, selectedSign, onPickSign, onChangeSign,
                            onOpenPeriod, onOpenJournal, onOpenSynastry, onOpenOtherSign,
                            onCreateNatal }) {
  const mode = hasNatal ? 'natal' : (selectedSign ? 'sign' : 'pick');
  return (
    <div className="page-pad" style={{ paddingTop: 16 }}>
      {mode === 'pick' && (
        <div className="stagger">
          <div style={{ textAlign: 'center', paddingTop: 8 }}>
            <h1 className="h-display" style={{ fontSize: 38 }}>HOROSCOPE</h1>
            <p className="poetic mt-10" style={{ maxWidth: 270, margin: '10px auto 0', fontSize: 16 }}>
              Pick your sign — get a daily, weekly, or monthly reading
            </p>
          </div>
          <div><GlyphDivider/></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {SIGNS.map(s => (
              <button key={s.id} className="sign-tile tap-glow" onClick={() => onPickSign(s.id)}>
                <span className="sym">{s.sym}</span>
                <span className="nm">{s.nm}</span>
              </button>
            ))}
          </div>
          <div style={{ textAlign: 'center', paddingTop: 14 }}>
            <button className="btn text" onClick={onCreateNatal}>
              Want it personal? Draw your birth chart →
            </button>
          </div>
        </div>
      )}
      {mode === 'sign' && (
        <HoroscopeForSign sign={selectedSign}
          onOpenPeriod={onOpenPeriod} onOpenJournal={onOpenJournal}
          onOpenSynastry={onOpenSynastry} onOpenOtherSign={onOpenOtherSign}
          onChangeSign={onChangeSign} onCreateNatal={onCreateNatal}/>
      )}
      {mode === 'natal' && (
        <HoroscopeForNatal name={name}
          onOpenPeriod={onOpenPeriod} onOpenJournal={onOpenJournal}
          onOpenSynastry={onOpenSynastry} onOpenOtherSign={onOpenOtherSign}/>
      )}
    </div>
  );
}
window.HoroscopeScreen = HoroscopeScreen;

function PeriodTile({ glyph, label, desc, onClick }) {
  return (
    <button className="period-tile tap-glow" onClick={onClick}>
      <span className="orb">{glyph}</span>
      <span className="nm-row">
        <span className="nm" style={{ display: 'block' }}>{label}</span>
        <span className="desc" style={{ display: 'block' }}>{desc}</span>
      </span>
      <span className="arrow">›</span>
    </button>
  );
}

function HoroscopeForSign({ sign, onOpenPeriod, onOpenJournal, onOpenSynastry, onOpenOtherSign, onChangeSign, onCreateNatal }) {
  const s = signById(sign);
  return (
    <div className="stagger">
      <div style={{ textAlign: 'center', paddingTop: 4 }}>
        <div style={{ fontFamily: 'Forum', fontSize: 56, color: 'var(--gold)', lineHeight: 1,
                      textShadow: '0 0 28px rgba(201,168,106,0.4)' }}>{s.sym}</div>
        <h1 className="h-display mt-8" style={{ fontSize: 36 }}>{s.nm}</h1>
        <p className="poetic mt-6">Horoscope for your sign · {s.dates}</p>
      </div>
      <div><GlyphDivider/></div>
      <div className="col gap-10">
        <PeriodTile glyph="☉" label="TODAY"     desc="Tuesday · May 12"   onClick={() => onOpenPeriod('day')}/>
        <PeriodTile glyph="☽" label="THIS WEEK" desc="May 12 — 18"        onClick={() => onOpenPeriod('week')}/>
        <PeriodTile glyph="✦" label="THIS MONTH" desc="May 2026"          onClick={() => onOpenPeriod('month')}/>
      </div>
      <div><GlyphDivider/></div>
      <div className="col gap-10">
        <PeriodTile glyph="☾" label="MOON JOURNAL" desc="Waxing moon · 35% lit"   onClick={onOpenJournal}/>
        <PeriodTile glyph="∞" label="COMPATIBILITY" desc="Compare with a partner" onClick={onOpenSynastry}/>
        <PeriodTile glyph="☉" label="OTHER SIGN"    desc="Read for a friend"      onClick={onOpenOtherSign}/>
      </div>
      <div style={{ textAlign: 'center', paddingTop: 12, display: 'flex', justifyContent: 'center', gap: 18 }}>
        <button className="btn text" onClick={onChangeSign}>Change sign</button>
        <span style={{ color: 'var(--text-faint)', alignSelf: 'center' }}>·</span>
        <button className="btn text" onClick={onCreateNatal}>Draw birth chart</button>
      </div>
    </div>
  );
}

function HoroscopeForNatal({ name, onOpenPeriod, onOpenJournal, onOpenSynastry, onOpenOtherSign }) {
  return (
    <div className="stagger">
      <div style={{ textAlign: 'center', paddingTop: 8 }}>
        <div className="section-label" style={{ fontSize: 10 }}>GOOD MORNING</div>
        <h1 className="h-display mt-6" style={{ fontSize: 42 }}>{name.toUpperCase()}</h1>
        <p className="poetic mt-8">Forecasts drawn from your birth chart</p>
      </div>
      <div><GlyphDivider/></div>
      <div className="glass strong" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, #E8D29E, #8C7140)',
                      flexShrink: 0,
                      boxShadow: '0 0 20px rgba(201,168,106,0.3)' }} />
        <div style={{ flex: 1 }}>
          <div className="section-label" style={{ fontSize: 9, color: 'var(--gold)' }}>TRANSIT OF THE DAY</div>
          <div className="f-corm" style={{ fontSize: 16, color: 'var(--text)', marginTop: 4 }}>
            Venus meets your Sun — a soft, warm pull, the kind that makes mornings honest.
          </div>
        </div>
      </div>
      <div className="col gap-10">
        <PeriodTile glyph="☉" label="TODAY"     desc="Tuesday · May 12"   onClick={() => onOpenPeriod('day')}/>
        <PeriodTile glyph="☽" label="THIS WEEK" desc="May 12 — 18"        onClick={() => onOpenPeriod('week')}/>
        <PeriodTile glyph="✦" label="THIS MONTH" desc="May 2026"          onClick={() => onOpenPeriod('month')}/>
      </div>
      <div><GlyphDivider/></div>
      <div className="col gap-10">
        <PeriodTile glyph="☾" label="MOON JOURNAL" desc="Waxing moon in Virgo"      onClick={onOpenJournal}/>
        <PeriodTile glyph="∞" label="COMPATIBILITY" desc="Compare with a partner"   onClick={onOpenSynastry}/>
        <PeriodTile glyph="☉" label="OTHER SIGN"    desc="Read for a friend"        onClick={onOpenOtherSign}/>
      </div>
    </div>
  );
}

/* ════════════ FORECAST ════════════ */
const FORECAST_DATA = {
  day:   { glyph: '☉', kind: 'TODAY',     title: 'The morning shadows lift early — the day promises a warm turn, in work and in heart.' },
  week:  { glyph: '☽', kind: 'THIS WEEK', title: "A waxing-moon week — what you've been quietly shaping starts to catch the light." },
  month: { glyph: '✦', kind: 'THIS MONTH', title: 'May walks you through a gate of changes — what no longer serves will fall away on its own.' },
};
const FORECAST_SECTIONS = [
  { ic: '☼', nm: 'Mood',        body: "Your inner light is warm and gold today. Don't rush sharp decisions — this is a day that rewards a watcher." },
  { ic: '♡', nm: 'Love',        body: 'Venus is generous. An old misunderstanding can dissolve in one honest sentence. Say it.' },
  { ic: '⚒', nm: 'Work',        body: "Mercury steers your negotiations. The best window is between 11:00 and 14:00. Sign what you've been putting off." },
  { ic: '◈', nm: 'Money',       body: 'Not a day for big spending — but a good day to ask for a raise. Jupiter is on your side for confidence.' },
  { ic: '✦', nm: 'Energy',      body: "About 7/10. By evening your body will ask for quiet and a warm bath. Don't refuse it." },
  { ic: '☉', nm: 'Advice',      body: "Listen to what's been ripening in your silence. Today the inner voice rings cleaner than the loud one." },
  { ic: '⚠', nm: 'Caution',     body: 'Avoid raised voices after 19:00 — Mars is grazing your Moon.' },
];
function ForecastScreen({ period, sign, name, hasNatal, onBack }) {
  const d = FORECAST_DATA[period] || FORECAST_DATA.day;
  const s = signById(sign);
  const summary = "Today's sky is generous. The morning is for important words; the day is for tasks that need warm persistence. By evening you'll be slowed — that's correct. Don't fight it.";
  return (
    <>
      <PageHeader crumb={`Forecast · ${d.kind.toLowerCase()}`} onBack={onBack}
        right={<button className="icon-btn" aria-label="Copy">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="3" y="3" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6 6V4.5C6 4 6.5 3.5 7 3.5H13.5C14 3.5 14.5 4 14.5 4.5V12C14.5 12.5 14 13 13.5 13H12.5"
              stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        </button>}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        <div className="stagger">
          <div className="glass strong" style={{
               background: 'linear-gradient(180deg, rgba(201,168,106,0.10), rgba(201,168,106,0.03))',
               padding: '24px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
              <span style={{ fontFamily: 'Forum', fontSize: 52, color: 'var(--gold)',
                             textShadow: '0 0 24px rgba(201,168,106,0.4)', lineHeight: 1 }}>{hasNatal ? '✶' : s.sym}</span>
              <div style={{ flex: 1 }}>
                <div className="section-label" style={{ fontSize: 10 }}>{d.kind}</div>
                <div style={{ fontFamily: 'Forum', fontSize: 14, letterSpacing: '0.16em',
                              textTransform: 'uppercase', color: 'var(--text)', marginTop: 3 }}>
                  {hasNatal ? name : s.full} · May 12, 2026
                </div>
              </div>
            </div>
            <div className="poetic" style={{ fontSize: 19, color: 'var(--gold-soft)' }}>{d.title}</div>
            <p className="mt-16 dropcap" style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text)' }}>
              {summary}
            </p>
          </div>
          <div><GlyphDivider/></div>
          {FORECAST_SECTIONS.map(sec => (
            <div key={sec.nm} className="glass">
              <div className="f-section">
                <span className="ic">{sec.ic}</span>
                <span style={{ fontFamily: 'Forum', fontSize: 11, letterSpacing: '0.22em',
                               textTransform: 'uppercase', color: 'var(--text)' }}>{sec.nm}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>{sec.body}</div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, paddingTop: 8 }}>
            <button className="btn outline flex1">Copy</button>
            <button className="btn primary flex1" onClick={onBack}>Back to periods</button>
          </div>
        </div>
      </div>
    </>
  );
}
window.ForecastScreen = ForecastScreen;
