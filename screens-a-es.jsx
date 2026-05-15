/* global React */
/* Spanish locale build of screens-a.jsx */
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
             transition: 'opacity 1.4s ease 0.4s', fontSize: 15 }}>la carta del cielo te espera</div>
      </div>
      <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0,
                    textAlign: 'center', opacity: phase >= 2 ? 0.55 : 0,
                    transition: 'opacity 1s ease 1.2s' }}>
        <span className="section-label" style={{ fontSize: 10 }}>TOCA PARA CONTINUAR</span>
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
            <h1 className="h-display" style={{ fontSize: 30 }}>TU<br/>CARTA NATAL</h1>
            <p className="poetic mt-16" style={{ maxWidth: 280, margin: '16px auto 0' }}>
              El retrato del cielo en el momento en que llegaste. Se dibuja una vez. Nunca cambia.
            </p>
            <div className="glass mt-24" style={{ textAlign: 'left' }}>
              <div className="section-label mb-10">POR QUÉ IMPORTA</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['☉', 'Los pronósticos usan tus planetas reales, no solo tu signo solar'],
                  ['☽', 'El diario lunar escucha a tu Luna'],
                  ['✦', 'Los tránsitos se calculan para ti, personalmente'],
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
              <button className="btn primary block" onClick={onCreate}>Dibujar mi carta</button>
              <button className="btn outline block" onClick={onSkip}>Saltar por ahora</button>
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
            <h1 className="h-display" style={{ fontSize: 38 }}>HORÓSCOPO</h1>
            <p className="poetic mt-10" style={{ maxWidth: 270, margin: '10px auto 0', fontSize: 16 }}>
              Elige tu signo — recibe una lectura diaria, semanal o mensual
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
              ¿Lo quieres personal? Dibuja tu carta natal →
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
        <p className="poetic mt-6">Horóscopo para tu signo · {s.dates}</p>
      </div>
      <div><GlyphDivider/></div>
      <div className="col gap-10">
        <PeriodTile glyph="☉" label="HOY"          desc="Martes · 12 de mayo" onClick={() => onOpenPeriod('day')}/>
        <PeriodTile glyph="☽" label="ESTA SEMANA"  desc="12 — 18 de mayo"     onClick={() => onOpenPeriod('week')}/>
        <PeriodTile glyph="✦" label="ESTE MES"     desc="Mayo de 2026"        onClick={() => onOpenPeriod('month')}/>
      </div>
      <div><GlyphDivider/></div>
      <div className="col gap-10">
        <PeriodTile glyph="☾" label="DIARIO LUNAR"     desc="Luna creciente · 35% iluminada" onClick={onOpenJournal}/>
        <PeriodTile glyph="∞" label="COMPATIBILIDAD"   desc="Compara con tu pareja"          onClick={onOpenSynastry}/>
        <PeriodTile glyph="☉" label="OTRO SIGNO"       desc="Lee para un amigo"              onClick={onOpenOtherSign}/>
      </div>
      <div style={{ textAlign: 'center', paddingTop: 12, display: 'flex', justifyContent: 'center', gap: 18 }}>
        <button className="btn text" onClick={onChangeSign}>Cambiar signo</button>
        <span style={{ color: 'var(--text-faint)', alignSelf: 'center' }}>·</span>
        <button className="btn text" onClick={onCreateNatal}>Dibujar carta natal</button>
      </div>
    </div>
  );
}

function HoroscopeForNatal({ name, onOpenPeriod, onOpenJournal, onOpenSynastry, onOpenOtherSign }) {
  return (
    <div className="stagger">
      <div style={{ textAlign: 'center', paddingTop: 8 }}>
        <div className="section-label" style={{ fontSize: 10 }}>BUENOS DÍAS</div>
        <h1 className="h-display mt-6" style={{ fontSize: 42 }}>{name.toUpperCase()}</h1>
        <p className="poetic mt-8">Pronósticos extraídos de tu carta natal</p>
      </div>
      <div><GlyphDivider/></div>
      <div className="glass strong" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 30%, #E8D29E, #8C7140)',
                      flexShrink: 0,
                      boxShadow: '0 0 20px rgba(201,168,106,0.3)' }} />
        <div style={{ flex: 1 }}>
          <div className="section-label" style={{ fontSize: 9, color: 'var(--gold)' }}>TRÁNSITO DEL DÍA</div>
          <div className="f-corm" style={{ fontSize: 16, color: 'var(--text)', marginTop: 4 }}>
            Venus se encuentra con tu Sol — un tirón suave y cálido, del tipo que hace honestas las mañanas.
          </div>
        </div>
      </div>
      <div className="col gap-10">
        <PeriodTile glyph="☉" label="HOY"          desc="Martes · 12 de mayo" onClick={() => onOpenPeriod('day')}/>
        <PeriodTile glyph="☽" label="ESTA SEMANA"  desc="12 — 18 de mayo"     onClick={() => onOpenPeriod('week')}/>
        <PeriodTile glyph="✦" label="ESTE MES"     desc="Mayo de 2026"        onClick={() => onOpenPeriod('month')}/>
      </div>
      <div><GlyphDivider/></div>
      <div className="col gap-10">
        <PeriodTile glyph="☾" label="DIARIO LUNAR"     desc="Luna creciente en Virgo"  onClick={onOpenJournal}/>
        <PeriodTile glyph="∞" label="COMPATIBILIDAD"   desc="Compara con tu pareja"    onClick={onOpenSynastry}/>
        <PeriodTile glyph="☉" label="OTRO SIGNO"       desc="Lee para un amigo"        onClick={onOpenOtherSign}/>
      </div>
    </div>
  );
}

/* ════════════ FORECAST ════════════ */
const FORECAST_DATA = {
  day:   { glyph: '☉', kind: 'HOY',         title: 'Las sombras de la mañana se levantan temprano — el día promete un giro cálido, en el trabajo y en el corazón.' },
  week:  { glyph: '☽', kind: 'ESTA SEMANA', title: 'Una semana de luna creciente — lo que has estado moldeando en silencio empieza a captar la luz.' },
  month: { glyph: '✦', kind: 'ESTE MES',    title: 'Mayo te lleva a través de una puerta de cambios — lo que ya no sirve caerá por su propio peso.' },
};
const FORECAST_SECTIONS = [
  { ic: '☼', nm: 'Ánimo',     body: 'Tu luz interior es cálida y dorada hoy. No precipites decisiones afiladas — este es un día que premia al observador.' },
  { ic: '♡', nm: 'Amor',      body: 'Venus es generosa. Un malentendido viejo puede disolverse en una frase honesta. Dila.' },
  { ic: '⚒', nm: 'Trabajo',   body: 'Mercurio guía tus negociaciones. La mejor ventana es entre las 11:00 y las 14:00. Firma lo que vienes postergando.' },
  { ic: '◈', nm: 'Dinero',    body: 'No es un día para grandes gastos — pero sí un buen día para pedir un aumento. Júpiter respalda tu confianza.' },
  { ic: '✦', nm: 'Energía',   body: 'Alrededor de 7/10. Hacia la noche, tu cuerpo pedirá tranquilidad y un baño caliente. No lo niegues.' },
  { ic: '☉', nm: 'Consejo',   body: 'Escucha lo que viene madurando en tu silencio. Hoy la voz interior suena más limpia que la ruidosa.' },
  { ic: '⚠', nm: 'Precaución', body: 'Evita las voces elevadas después de las 19:00 — Marte roza tu Luna.' },
];
function ForecastScreen({ period, sign, name, hasNatal, onBack }) {
  const d = FORECAST_DATA[period] || FORECAST_DATA.day;
  const s = signById(sign);
  const summary = 'El cielo de hoy es generoso. La mañana es para palabras importantes; el día para tareas que requieren una persistencia cálida. Hacia la noche te frenarás — eso es correcto. No lo combatas.';
  return (
    <>
      <PageHeader crumb={`Pronóstico · ${d.kind.toLowerCase()}`} onBack={onBack}
        right={<button className="icon-btn" aria-label="Copiar">
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
                  {hasNatal ? name : s.full} · 12 de mayo de 2026
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
            <button className="btn outline flex1">Copiar</button>
            <button className="btn primary flex1" onClick={onBack}>Volver a los períodos</button>
          </div>
        </div>
      </div>
    </>
  );
}
window.ForecastScreen = ForecastScreen;
