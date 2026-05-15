/* global React */
/* Spanish locale build of screens-b.jsx */
const { useState, useEffect, useRef } = React;

/* ════════════ NATAL CHART ════════════ */
const NATAL_NARRATIVES = [
  { g: '☉', t: 'Identidad',      b: 'Sol en Leo en la casa 10. Estás hecho para ser visto — tu fuerza se despliega cuando el trabajo se vuelve escenario. La luz que llevas calienta, no quema.' },
  { g: '☽', t: 'Emociones',      b: 'Luna en Virgo en la casa 11. Sientes a través de los detalles, y a través de las otras personas. Los cercanos son tu diapasón emocional.' },
  { g: '☿', t: 'Comunicación',   b: 'Mercurio en Leo. Hablas en imágenes y escenas. Hay teatro en tus palabras — ese es tu poder para persuadir.' },
  { g: '♀', t: 'Amor',           b: 'Venus en Virgo. Amas a través del cuidado de las cosas pequeñas. Los gestos te dicen más que las declaraciones.' },
  { g: '♂', t: 'Acción',         b: 'Marte en Aries. Empiezas rápido. Aprender a sostener el ritmo es tu práctica real — el ritmo es tu aliado, no la velocidad.' },
  { g: '♃', t: 'Crecimiento',    b: 'Júpiter en Sagitario. Las carreteras y los idiomas extranjeros te elevan. No te quedes demasiado tiempo en una sola habitación.' },
  { g: '♄', t: 'Estructura',     b: 'Saturno en Capricornio. La disciplina es tu ángel invisible. A través de los límites encuentras la libertad.' },
  { g: '♅', t: 'Libertad',       b: 'Urano en Acuario. Naciste para el cambio. No temas soltar lo que era cierto ayer.' },
  { g: '♆', t: 'Imaginación',    b: 'Neptuno en Piscis. Lees tus sueños como mapas. Confía en tu intuición — sabe antes que la razón.' },
  { g: '♇', t: 'Profundidad',    b: 'Plutón en Escorpio. Eres capaz de una transformación completa. No temas entrar en lo oscuro — ahí vive tu recurso.' },
];
function NatalChartScreen({ name, onRecreate }) {
  return (
    <div className="page-pad" style={{ paddingTop: 12 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <h1 className="h-display" style={{ fontSize: 32 }}>CARTA NATAL</h1>
          <p className="poetic mt-6">{name} · 12 de agosto de 1993 · 04:18 · Moscú</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -10, borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(201,168,106,0.12), transparent 70%)',
                          filter: 'blur(8px)' }}/>
            <NatalWheel size={310}/>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap',
                      paddingBottom: 4 }}>
          <span style={{ fontSize: 11, color: 'var(--text-mute)' }}>
            <span style={{ color: 'var(--gold)', marginRight: 4 }}>ASC</span>Cáncer 14°
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-mute)' }}>
            <span style={{ color: 'var(--gold)', marginRight: 4 }}>MC</span>Piscis 22°
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-mute)' }}>
            <span style={{ color: 'var(--gold)', marginRight: 4 }}>☉</span>Leo 19°
          </span>
        </div>
        <div><GlyphDivider/></div>
        {NATAL_NARRATIVES.map(n => (
          <div key={n.t} className="glass" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%',
                          border: '1px solid var(--border-strong)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--gold)', fontFamily: 'Forum', fontSize: 16, flexShrink: 0 }}>{n.g}</div>
            <div style={{ flex: 1 }}>
              <div className="section-label" style={{ fontSize: 11 }}>{n.t.toUpperCase()}</div>
              <div className="mt-6" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text)' }}>{n.b}</div>
            </div>
          </div>
        ))}
        <div style={{ paddingTop: 4 }}>
          <button className="btn outline block" onClick={onRecreate}>Rehacer carta</button>
        </div>
      </div>
    </div>
  );
}
window.NatalChartScreen = NatalChartScreen;

function NatalEmptyScreen({ onCreate }) {
  return (
    <div className="page-pad" style={{ paddingTop: 60, textAlign: 'center' }}>
      <div className="stagger">
        <div>
          <div className="sigil-ring" style={{ width: 120, height: 120, margin: '0 auto 24px' }}>
            <span style={{ fontFamily: 'Forum', fontSize: 50, color: 'var(--gold)',
                           position: 'relative', zIndex: 1,
                           textShadow: '0 0 26px rgba(201,168,106,0.4)' }}>✶</span>
          </div>
        </div>
        <h2 className="h-display" style={{ fontSize: 28 }}>AÚN SIN CARTA</h2>
        <p className="poetic mt-12" style={{ maxWidth: 260, margin: '12px auto 0' }}>
          Tu carta natal — la huella del cielo en el momento en que llegaste. Se dibuja una vez.
        </p>
        <div className="mt-32">
          <button className="btn primary" onClick={onCreate}>Dibujar carta</button>
        </div>
      </div>
    </div>
  );
}
window.NatalEmptyScreen = NatalEmptyScreen;

/* ════════════ CALENDAR ════════════ */
const WD = ['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'];
const MONTHS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const MOON_SIGNS = ['Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis','Aries','Tauro','Géminis','Cáncer','Leo'];

function generateDays() {
  const start = new Date(2026, 4, 12);
  let seed = 42;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const moods = ['up','tension','calm','up','down','calm','up','tension','up','calm','tension','calm'];
  const leads = [
    'Mañana abierta — las conversaciones fluyen. Atrapa las palabras que estabas esperando.',
    'Un día de tensión interna: escucha más, decide menos.',
    'Día tranquilo y parejo — bueno para lo que requiere paciencia.',
    'Venus sonríe — un día para una frase tierna y una carta vieja.',
    'Mercurio retrógrado roza tus cables — léelo dos veces.',
    'La Luna en Virgo pide orden — ordena un estante, solo uno.',
    'Un día de oro: toma lo que empezaste y ciérralo.',
    'Marte toca al Sol — cuida tu tono después del mediodía.',
    'El impulso es fuerte — apúntalo a una sola cosa, no a diez.',
    'El silencio es el mejor consejero hoy.',
    'El retrógrado espesa temas viejos. No te apresures a responder.',
    'Horas lunares — para el agua, los baños, los procesos lentos.',
  ];
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const r = rnd();
    const mood = moods[i % moods.length];
    const markers = [];
    if (r > 0.7) markers.push('opp');
    if (r > 0.85) markers.push('tension');
    if ([3, 11, 22].includes(i)) markers.push('merc');
    if ([5, 14, 26].includes(i)) markers.push('moon');
    return { date: d, mood, lead: leads[i % leads.length],
             moonSign: MOON_SIGNS[i % MOON_SIGNS.length], markers };
  });
}
const moodColor = (m) => ({
  up: 'linear-gradient(180deg, #6FD68A, #4FBD6E)',
  tension: 'linear-gradient(180deg, #E0A560, #C77A35)',
  calm: 'linear-gradient(180deg, rgba(201,168,106,0.7), rgba(201,168,106,0.3))',
  down: 'linear-gradient(180deg, #E26565, #B53A3A)',
}[m] || 'rgba(255,255,255,0.2)');

function CalendarScreen({ hasNatal }) {
  const days = useRef(generateDays()).current;
  const [filter, setFilter] = useState('all');
  const [openDay, setOpenDay] = useState(null);
  const filtered = days.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'opp') return d.markers.includes('opp');
    if (filter === 'tension') return d.markers.includes('tension');
    if (filter === 'peaks') return d.markers.includes('opp') && d.markers.includes('tension');
    return true;
  });
  return (
    <div className="page-pad" style={{ paddingTop: 12 }}>
      <div style={{ textAlign: 'center' }}>
        <h1 className="h-display" style={{ fontSize: 36 }}>CALENDARIO</h1>
        <p className="poetic mt-6">Treinta días — treinta estados del cielo</p>
      </div>
      <GlyphDivider/>
      <div className="chips" style={{ paddingBottom: 10 }}>
        <span className="chip"><span className="dot-marker up"/> Oportunidad</span>
        <span className="chip"><span className="dot-marker tension"/> Tensión</span>
        <span className="chip"><span className="dot-marker merc"/> Mercurio Rx</span>
        {hasNatal && <span className="chip"><span className="dot-marker moon"/> Toque lunar</span>}
      </div>
      <div className="chips mt-10 mb-16">
        {[['all','Todo'],['opp','Oportunidades'],['tension','Tensión'],['peaks','Picos']].map(([id, lab]) => (
          <button key={id} className={`chip ${filter === id ? 'active' : ''}`}
                  onClick={() => setFilter(id)}>{lab}</button>
        ))}
      </div>
      <div className="col gap-10">
        {filtered.map((d, i) => (
          <DayCard key={i} day={d} onClick={() => setOpenDay(d)}/>
        ))}
      </div>
      {openDay && <DaySheet day={openDay} onClose={() => setOpenDay(null)} hasNatal={hasNatal}/>}
    </div>
  );
}
window.CalendarScreen = CalendarScreen;

function DayCard({ day, onClick }) {
  const d = day.date;
  return (
    <button className="glass tap" onClick={onClick}
            style={{ display: 'flex', gap: 14, padding: 14, alignItems: 'stretch', textAlign: 'left' }}>
      <div className="mood-bar" style={{ background: moodColor(day.mood) }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
          <span style={{ fontFamily: 'Forum', fontSize: 11, letterSpacing: '0.22em',
                         color: 'var(--text-mute)', textTransform: 'uppercase' }}>{WD[d.getDay()]}</span>
          <span style={{ fontFamily: 'Yeseva One', fontSize: 22, color: 'var(--gold)' }}>{d.getDate()}</span>
          <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{MONTHS[d.getMonth()]}</span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
            {day.markers.map((m, i) => (
              <span key={i} className={`dot-marker ${
                m === 'opp' ? 'up' : m === 'tension' ? 'tension' : m === 'merc' ? 'merc' : 'moon'
              }`}/>
            ))}
          </span>
        </div>
        <div className="f-corm" style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.45 }}>{day.lead}</div>
        <div className="mt-6" style={{ fontSize: 11, color: 'var(--text-faint)' }}>☽ Luna en {day.moonSign}</div>
      </div>
    </button>
  );
}

function DaySheet({ day, onClose, hasNatal }) {
  const d = day.date;
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose}/>
      <div className="sheet">
        <div style={{ marginTop: 14 }}>
          <div className="section-label">{WD[d.getDay()]}, {d.getDate()} de {MONTHS[d.getMonth()]}</div>
          <div className="f-corm mt-8" style={{ fontSize: 22, color: 'var(--gold-soft)', lineHeight: 1.35 }}>
            {day.lead}
          </div>
        </div>
        <div className="mt-16" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {day.markers.includes('opp')     && <span className="chip active" style={{ borderColor: 'var(--success)', color: 'var(--success-soft)' }}>▲ Oportunidad</span>}
          {day.markers.includes('tension') && <span className="chip" style={{ borderColor: 'var(--tension)', color: 'var(--tension)' }}>✕ Tensión</span>}
          {day.markers.includes('merc')    && <span className="chip" style={{ borderColor: 'var(--merc)', color: 'var(--merc)' }}>◆ Mercurio Rx</span>}
          {hasNatal && day.markers.includes('moon') && <span className="chip" style={{ borderColor: 'var(--moon)', color: 'var(--moon)' }}>○ Toque lunar</span>}
        </div>
        <div className="mt-20 glass">
          <div className="section-label mb-8" style={{ color: 'var(--success-soft)' }}>FAVORABLE PARA</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
            Conversaciones tranquilas, acuerdos sobre papel, paseos cerca del agua, cartas largas a quienes no escribías hace tiempo.
          </div>
        </div>
        <div className="mt-10 glass">
          <div className="section-label mb-8" style={{ color: 'var(--danger)' }}>MEJOR EVITAR</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
            Afirmaciones cortantes después de las 19:00, nuevos compromisos económicos, discusiones sobre el pasado.
          </div>
        </div>
        <div className="mt-10 glass">
          <div className="section-label mb-8">NOTA</div>
          <div className="f-corm" style={{ fontSize: 14, color: 'var(--text-mute)', lineHeight: 1.6 }}>
            Luna en {day.moonSign} — un día en el que las cosas pequeñas hablan más alto que el titular.
          </div>
        </div>
        <div className="mt-20"><button className="btn outline block" onClick={onClose}>Cerrar</button></div>
      </div>
    </>
  );
}

/* ════════════ ORACLE ════════════ */
const TAROT_DECK = [
  { id: 0,  nm: 'EL LOCO',                meaning: 'Un salto hacia lo desconocido. Un día para confiar en el instinto.' },
  { id: 1,  nm: 'EL MAGO',                meaning: 'Las herramientas están reunidas. Empieza — el cielo está de tu lado.' },
  { id: 2,  nm: 'LA SACERDOTISA',         meaning: 'El misterio llama a la puerta. Escucha el silencio — habla la verdad.' },
  { id: 3,  nm: 'LA EMPERATRIZ',          meaning: 'La tierra es fértil. Lo que plantes hoy crecerá.' },
  { id: 4,  nm: 'EL EMPERADOR',           meaning: 'Un día de estructura y decisiones. Pon el marco — la libertad vive dentro.' },
  { id: 5,  nm: 'EL HIEROFANTE',          meaning: 'La sabiduría vieja te guía. Pregunta a alguien que ya lo caminó.' },
  { id: 6,  nm: 'LOS ENAMORADOS',         meaning: 'Una elección del corazón. Entre dos caminos — el que arde más cálido.' },
  { id: 7,  nm: 'EL CARRO',               meaning: 'El movimiento es inevitable. Sujeta las riendas firme — y cabalga más rápido.' },
  { id: 8,  nm: 'LA FUERZA',              meaning: 'No una pelea, sino una doma. Tu suavidad es tu fuerza.' },
  { id: 9,  nm: 'EL ERMITAÑO',            meaning: 'Un día de silencio y una linterna. Vete hacia dentro — ahí está la respuesta.' },
  { id: 10, nm: 'RUEDA DE LA FORTUNA',    meaning: 'Un giro. Lo que estaba abajo se elevará hacia la luz.' },
  { id: 11, nm: 'LA JUSTICIA',            meaning: 'La balanza se mueve. Sé honesto — sobre todo contigo mismo.' },
  { id: 12, nm: 'EL COLGADO',             meaning: 'Date la vuelta — verás distinto. Un día para la vista desde arriba.' },
  { id: 13, nm: 'LA MUERTE',              meaning: 'No es un final — es un rearmado. Algo debe irse para que llegue lo nuevo.' },
  { id: 14, nm: 'LA TEMPLANZA',           meaning: 'Gota a gota. La alquimia de hoy está en mezclar, no en elegir.' },
  { id: 15, nm: 'EL DIABLO',              meaning: 'Cadenas que te pusiste tú mismo. Hoy — un día para verlas.' },
  { id: 16, nm: 'LA TORRE',               meaning: 'Un muro viejo temblará. Esto es liberación vestida de pérdida.' },
  { id: 17, nm: 'LA ESTRELLA',            meaning: 'La esperanza vuelve. Sírvele a alguien un vaso de agua.' },
  { id: 18, nm: 'LA LUNA',                meaning: 'La niebla no miente — revela. Confía en los sueños de esta noche.' },
  { id: 19, nm: 'EL SOL',                 meaning: 'Un día claro. Cada máscara puede caer.' },
  { id: 20, nm: 'EL JUICIO',              meaning: 'Una voz te llama a reconsiderar. Algo viejo pide perdón.' },
  { id: 21, nm: 'EL MUNDO',               meaning: 'Un círculo se cierra. Felicítate — luego empieza el siguiente.' },
];

function OracleHomeScreen({ onPickCard, onSpread }) {
  return (
    <div className="page-pad" style={{ paddingTop: 8 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <h1 className="h-display" style={{ fontSize: 36 }}>ORÁCULO</h1>
          <p className="poetic mt-6">Carta del día y tiradas</p>
        </div>
        <GlyphDivider/>
        <button className="glass tap" onClick={onPickCard} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 18 }}>
          <div className="tcard back" style={{ width: 70, aspectRatio: '0.66', borderRadius: 10 }}>
            <div className="core" style={{ width: '70%' }}>
              <span style={{ fontFamily: 'Forum', fontSize: 18, color: 'var(--gold)' }}>☽</span>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div className="section-label" style={{ fontSize: 11 }}>CARTA DEL DÍA</div>
            <div className="f-corm mt-6" style={{ fontSize: 17, color: 'var(--gold-soft)' }}>
              Lo que el cielo quiere decirte hoy
            </div>
            <div className="mt-6 muted" style={{ fontSize: 11 }}>Toca cualquiera de los 22 reversos</div>
          </div>
        </button>
        <button className="glass tap" onClick={onSpread} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 18 }}>
          <div style={{ width: 70, display: 'flex', gap: 4, justifyContent: 'center' }}>
            {[0,1,2].map(i => (
              <div key={i} className="tcard back" style={{ width: 22, aspectRatio: '0.66', borderRadius: 4,
                   transform: `rotate(${(i-1)*8}deg)` }}/>
            ))}
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div className="section-label" style={{ fontSize: 11 }}>TIRADA DE TRES CARTAS</div>
            <div className="f-corm mt-6" style={{ fontSize: 17, color: 'var(--gold-soft)' }}>
              Pasado · Presente · Futuro
            </div>
            <div className="mt-6 muted" style={{ fontSize: 11 }}>Haz una pregunta — saca tres</div>
          </div>
        </button>
      </div>
    </div>
  );
}
window.OracleHomeScreen = OracleHomeScreen;

function CardOfDayScreen({ onBack }) {
  const [picked, setPicked] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [reversed] = useState(() => Math.random() < 0.3);
  const handlePick = (idx) => {
    if (picked !== null) return;
    setFlipping(true);
    setTimeout(() => { setPicked(idx); setFlipping(false); }, 600);
  };
  const card = picked !== null ? TAROT_DECK[picked % 22] : null;
  return (
    <>
      <PageHeader crumb="Carta del día" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {!card && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingBottom: 8 }}>
              <h2 className="h-display" style={{ fontSize: 28 }}>ELIGE UNA</h2>
              <p className="poetic mt-6">Cierra los ojos, escucha, toca</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {Array.from({ length: 22 }).map((_, i) => (
                <button key={i} className="tcard back" style={{ borderRadius: 8,
                       transform: flipping ? 'rotateY(180deg)' : 'none',
                       transition: 'transform 600ms cubic-bezier(0.4,0,0.2,1)' }}
                       onClick={() => handlePick(i)}>
                  <div className="core" style={{ width: '70%' }}>
                    <span style={{ fontFamily: 'Forum', fontSize: 11, color: 'var(--gold)' }}>✶</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {card && (
          <div className="stagger" style={{ textAlign: 'center', paddingTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 20px' }}>
              <TarotCardFace card={card} reversed={reversed} large/>
            </div>
            <div>
              <div className="section-label" style={{ fontSize: 11 }}>
                ARCANO {String(card.id).padStart(2, '0')}{reversed && ' · INVERTIDO'}
              </div>
              <h2 className="h-display mt-8" style={{ fontSize: 26 }}>{card.nm}</h2>
            </div>
            <div className="glass mt-16" style={{ textAlign: 'left' }}>
              <div className="f-corm" style={{ fontSize: 17, color: 'var(--gold-soft)', lineHeight: 1.45 }}>
                {card.meaning}
              </div>
              <p className="mt-14" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                {reversed
                  ? 'Invertida, la carta te pide bajar el ritmo — lo que sueles hacer fuera, hoy hazlo dentro. Un día para la introversión y la reconstrucción.'
                  : 'La carta habla claro: lo que sientes hoy no es accidental. Es una dirección. No te apartes — pero tampoco te apresures.'}
              </p>
            </div>
            <div className="mt-20" style={{ display: 'flex', gap: 10 }}>
              <button className="btn outline flex1" onClick={() => setPicked(null)}>Otra</button>
              <button className="btn primary flex1" onClick={onBack}>Guardar el día</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
window.CardOfDayScreen = CardOfDayScreen;

function TarotCardFace({ card, reversed, large }) {
  const w = large ? 220 : 80;
  const pad = large ? 9 : 3;
  const id = String(card.id).padStart(2, '0');
  return (
    <div style={{
      width: w, aspectRatio: '0.66', borderRadius: 14,
      background: 'linear-gradient(180deg, #1a1424 0%, #0d0a18 100%)',
      border: '1px solid var(--gold)',
      boxShadow: '0 14px 40px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,106,0.18)',
      position: 'relative', overflow: 'hidden',
      padding: 0,
    }}>
      <img src={`assets/tarot-dore/${id}.png`} alt={card.nm} loading="lazy" style={{
        position: 'absolute',
        inset: pad,
        width: `calc(100% - ${pad * 2}px)`,
        height: `calc(100% - ${pad * 2}px)`,
        objectFit: 'cover',
        borderRadius: large ? 10 : 5,
      }}/>
      <div style={{
        position: 'absolute',
        inset: pad,
        borderRadius: large ? 10 : 5,
        boxShadow: 'inset 0 0 0 1px rgba(7,7,17,0.32), inset 0 -42px 38px rgba(7,7,17,0.48)',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute',
        left: large ? 14 : 6,
        top: large ? 12 : 5,
        fontFamily: 'Forum',
        fontSize: large ? 13 : 7,
        letterSpacing: '0.16em',
        color: '#fff3c4',
        textShadow: '0 1px 6px rgba(0,0,0,0.75)',
      }}>{id}</div>
      {reversed && <div style={{
        position: 'absolute',
        right: large ? 12 : 4,
        bottom: large ? 12 : 4,
        padding: large ? '4px 7px' : '2px 4px',
        borderRadius: 999,
        background: 'rgba(7,7,17,0.68)',
        border: '1px solid rgba(232,210,158,0.42)',
        color: '#fff3c4',
        fontFamily: 'Forum',
        fontSize: large ? 10 : 6,
        letterSpacing: '0.12em',
      }}>INV</div>}
    </div>
  );
}
window.TarotCardFace = TarotCardFace;

function TarotIllustration({ id, size }) {
  const stroke = 'rgba(232,210,158,0.85)';
  const dim = 'rgba(201,168,106,0.45)';
  const common = { stroke, strokeWidth: 0.9, fill: 'none', strokeLinecap: 'round' };
  return (
    <svg width={size} height={size * 1.35} viewBox={`0 0 ${size} ${size * 1.35}`}>
      <rect x="6" y="6" width={size - 12} height={size * 1.35 - 12}
            stroke={dim} strokeWidth="0.6" fill="none" rx="4"/>
      <g transform={`translate(${size/2}, ${size * 0.65})`}>
        <circle r={size * 0.22} {...common}/>
        <path d={`M 0 ${-size*0.3} L ${size*0.05} ${-size*0.05} L ${size*0.3} 0 L ${size*0.05} ${size*0.05} L 0 ${size*0.3} L ${-size*0.05} ${size*0.05} L ${-size*0.3} 0 L ${-size*0.05} ${-size*0.05} Z`}
              stroke={stroke} strokeWidth="0.7" fill="none"/>
      </g>
    </svg>
  );
}

function SpreadScreen({ onBack }) {
  const [question, setQuestion] = useState('');
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState([]);
  const start = () => { if (question.trim()) setStep(1); };
  const handlePick = (i) => {
    if (picks.includes(i)) return;
    const np = [...picks, i];
    setPicks(np);
    if (np.length >= 3) setTimeout(() => setStep(4), 400);
    else setStep(step + 1);
  };
  const positions = ['PASADO', 'PRESENTE', 'FUTURO'];
  return (
    <>
      <PageHeader crumb="Tirada de tres cartas" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {step === 0 && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingTop: 16 }}>
              <h2 className="h-display" style={{ fontSize: 26 }}>HAZ UNA PREGUNTA</h2>
              <p className="poetic mt-8">Nombra lo que ahora mismo importa</p>
            </div>
            <div className="mt-24">
              <div className="field-label">PREGUNTA</div>
              <textarea className="input" rows={3}
                placeholder="Por ejemplo — ¿debería ahora...?"
                value={question} onChange={e => setQuestion(e.target.value)}/>
            </div>
            <button className="btn primary block mt-20" onClick={start}>Preguntar</button>
          </div>
        )}
        {step >= 1 && step <= 3 && (
          <>
            <div className="glass" style={{ padding: 14, marginBottom: 14 }}>
              <div className="section-label" style={{ fontSize: 10 }}>PREGUNTA</div>
              <div className="f-corm mt-4" style={{ fontSize: 15, color: 'var(--gold-soft)' }}>{question}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="section-label" style={{ fontSize: 11 }}>CARTA {step} DE 3</div>
              <div className="poetic mt-6" style={{ fontSize: 14 }}>{positions[step - 1]}</div>
            </div>
            <div className="mt-16" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
              {Array.from({ length: 22 }).map((_, i) => (
                <button key={i} className="tcard back" style={{
                       borderRadius: 8,
                       opacity: picks.includes(i) ? 0.2 : 1,
                       pointerEvents: picks.includes(i) ? 'none' : 'auto' }}
                       onClick={() => handlePick(i)}>
                  <div className="core" style={{ width: '70%' }}>
                    <span style={{ fontFamily: 'Forum', fontSize: 11, color: 'var(--gold)' }}>✶</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
        {step === 4 && (
          <div className="stagger">
            <div className="glass" style={{ padding: 14 }}>
              <div className="section-label" style={{ fontSize: 10 }}>PREGUNTA</div>
              <div className="f-corm mt-4" style={{ fontSize: 15, color: 'var(--gold-soft)' }}>{question}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, paddingTop: 4 }}>
              {picks.map((p, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TarotCardFace card={TAROT_DECK[p % 22]} reversed={false}/>
                  </div>
                  <div className="section-label mt-8" style={{ fontSize: 9 }}>{positions[i]}</div>
                </div>
              ))}
            </div>
            <GlyphDivider/>
            {picks.map((p, i) => {
              const c = TAROT_DECK[p % 22];
              return (
                <div key={i} className="glass">
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                    <span className="section-label" style={{ fontSize: 9, color: 'var(--gold)' }}>{positions[i]}</span>
                    <span style={{ fontFamily: 'Forum', fontSize: 14, letterSpacing: '0.16em',
                                   color: 'var(--text)', textTransform: 'uppercase' }}>{c.nm}</span>
                  </div>
                  <div className="f-corm" style={{ fontSize: 15, color: 'var(--gold-soft)', lineHeight: 1.4 }}>
                    {c.meaning}
                  </div>
                </div>
              );
            })}
            <button className="btn outline block mt-20" onClick={onBack}>Volver al Oráculo</button>
          </div>
        )}
      </div>
    </>
  );
}
window.SpreadScreen = SpreadScreen;
