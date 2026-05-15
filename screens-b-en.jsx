/* global React */
/* English locale build of screens-b.jsx */
const { useState, useEffect, useRef } = React;

/* ════════════ NATAL CHART ════════════ */
const NATAL_NARRATIVES = [
  { g: '☉', t: 'Identity',      b: "Sun in Leo in the 10th house. You were made to be seen — your strength unfolds when work becomes a stage. The light you carry warms rather than burns." },
  { g: '☽', t: 'Emotions',      b: "Moon in Virgo in the 11th house. You feel through details, and through other people. The ones close to you are your emotional tuning fork." },
  { g: '☿', t: 'Communication', b: "Mercury in Leo. You speak in images and scenes. There's theatre in your words — that's your power to persuade." },
  { g: '♀', t: 'Love',          b: "Venus in Virgo. You love through care for small things. Gestures mean more to you than declarations." },
  { g: '♂', t: 'Action',        b: "Mars in Aries. You begin fast. Learning to hold the pace is your real practice — pace is your ally, not speed." },
  { g: '♃', t: 'Growth',        b: "Jupiter in Sagittarius. Roads and foreign languages raise you. Don't stay in one room too long." },
  { g: '♄', t: 'Structure',     b: "Saturn in Capricorn. Discipline is your invisible angel. Through limits, you find freedom." },
  { g: '♅', t: 'Freedom',       b: "Uranus in Aquarius. You were born for change. Don't fear letting go of what was true yesterday." },
  { g: '♆', t: 'Imagination',   b: "Neptune in Pisces. You read your dreams like maps. Trust your intuition — it knows before reason does." },
  { g: '♇', t: 'Depth',         b: "Pluto in Scorpio. You're capable of full transformation. Don't fear going into the dark — that's where your resource lives." },
];
function NatalChartScreen({ name, onRecreate }) {
  return (
    <div className="page-pad" style={{ paddingTop: 12 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <h1 className="h-display" style={{ fontSize: 32 }}>BIRTH CHART</h1>
          <p className="poetic mt-6">{name} · August 12, 1993 · 04:18 · Moscow</p>
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
            <span style={{ color: 'var(--gold)', marginRight: 4 }}>ASC</span>Cancer 14°
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-mute)' }}>
            <span style={{ color: 'var(--gold)', marginRight: 4 }}>MC</span>Pisces 22°
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
          <button className="btn outline block" onClick={onRecreate}>Redraw chart</button>
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
        <h2 className="h-display" style={{ fontSize: 28 }}>NO CHART YET</h2>
        <p className="poetic mt-12" style={{ maxWidth: 260, margin: '12px auto 0' }}>
          Your birth chart — an imprint of the sky at the moment you arrived. Drawn once.
        </p>
        <div className="mt-32">
          <button className="btn primary" onClick={onCreate}>Draw chart</button>
        </div>
      </div>
    </div>
  );
}
window.NatalEmptyScreen = NatalEmptyScreen;

/* ════════════ CALENDAR ════════════ */
const WD = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MOON_SIGNS = ['Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo'];

function generateDays() {
  const start = new Date(2026, 4, 12);
  let seed = 42;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const moods = ['up','tension','calm','up','down','calm','up','tension','up','calm','tension','calm'];
  const leads = [
    "Open morning — conversations come easy. Catch the words you've been waiting for.",
    "An inner-tension day: listen more, decide less.",
    "Quiet, even day — good for what needs patience.",
    "Venus smiles — a day for a tender sentence and an old letter.",
    "Mercury retrograde grazes your wires — read it twice.",
    "Moon in Virgo wants order — clear one shelf, just one.",
    "A gold day: take what you began and bring it to a close.",
    "Mars touches the Sun — watch your tone after noon.",
    "The impulse is strong — point it at one thing, not ten.",
    "Silence is the best advisor today.",
    "Retrograde thickens old themes. Don't rush to reply.",
    "Lunar hours — for water, baths, slow undertakings.",
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
        <h1 className="h-display" style={{ fontSize: 36 }}>CALENDAR</h1>
        <p className="poetic mt-6">Thirty days — thirty states of sky</p>
      </div>
      <GlyphDivider/>
      <div className="chips" style={{ paddingBottom: 10 }}>
        <span className="chip"><span className="dot-marker up"/> Opportunity</span>
        <span className="chip"><span className="dot-marker tension"/> Tension</span>
        <span className="chip"><span className="dot-marker merc"/> Mercury Rx</span>
        {hasNatal && <span className="chip"><span className="dot-marker moon"/> Moon touch</span>}
      </div>
      <div className="chips mt-10 mb-16">
        {[['all','All'],['opp','Opportunities'],['tension','Tension'],['peaks','Peaks']].map(([id, lab]) => (
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
        <div className="mt-6" style={{ fontSize: 11, color: 'var(--text-faint)' }}>☽ Moon in {day.moonSign}</div>
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
          <div className="section-label">{WD[d.getDay()]}, {MONTHS[d.getMonth()]} {d.getDate()}</div>
          <div className="f-corm mt-8" style={{ fontSize: 22, color: 'var(--gold-soft)', lineHeight: 1.35 }}>
            {day.lead}
          </div>
        </div>
        <div className="mt-16" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {day.markers.includes('opp')     && <span className="chip active" style={{ borderColor: 'var(--success)', color: 'var(--success-soft)' }}>▲ Opportunity</span>}
          {day.markers.includes('tension') && <span className="chip" style={{ borderColor: 'var(--tension)', color: 'var(--tension)' }}>✕ Tension</span>}
          {day.markers.includes('merc')    && <span className="chip" style={{ borderColor: 'var(--merc)', color: 'var(--merc)' }}>◆ Mercury Rx</span>}
          {hasNatal && day.markers.includes('moon') && <span className="chip" style={{ borderColor: 'var(--moon)', color: 'var(--moon)' }}>○ Moon touch</span>}
        </div>
        <div className="mt-20 glass">
          <div className="section-label mb-8" style={{ color: 'var(--success-soft)' }}>FAVOURABLE FOR</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
            Quiet conversations, agreements on paper, walks by water, long letters to people you haven't written to in a while.
          </div>
        </div>
        <div className="mt-10 glass">
          <div className="section-label mb-8" style={{ color: 'var(--danger)' }}>BETTER AVOIDED</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
            Sharp statements after 19:00, new financial commitments, arguments about the past.
          </div>
        </div>
        <div className="mt-10 glass">
          <div className="section-label mb-8">NOTE</div>
          <div className="f-corm" style={{ fontSize: 14, color: 'var(--text-mute)', lineHeight: 1.6 }}>
            Moon in {day.moonSign} — a day when small things speak louder than the headline.
          </div>
        </div>
        <div className="mt-20"><button className="btn outline block" onClick={onClose}>Close</button></div>
      </div>
    </>
  );
}

/* ════════════ ORACLE ════════════ */
const TAROT_DECK = [
  { id: 0,  nm: 'THE FOOL',               meaning: 'A leap into the unknown. A day to trust your gut.' },
  { id: 1,  nm: 'THE MAGICIAN',           meaning: 'The tools are gathered. Begin — the sky is on your side.' },
  { id: 2,  nm: 'THE HIGH PRIESTESS',     meaning: 'Mystery is at the door. Listen to silence — it speaks the truth.' },
  { id: 3,  nm: 'THE EMPRESS',            meaning: 'The earth is fertile. What you plant today will rise.' },
  { id: 4,  nm: 'THE EMPEROR',            meaning: 'A day of structure and decisions. Set the frame — freedom comes inside it.' },
  { id: 5,  nm: 'THE HIEROPHANT',         meaning: "Old wisdom is your guide. Ask someone who's walked it." },
  { id: 6,  nm: 'THE LOVERS',             meaning: 'A choice of the heart. Between two paths — the one that glows warmer.' },
  { id: 7,  nm: 'THE CHARIOT',            meaning: 'Movement is inevitable. Hold the reins firmly — and ride faster.' },
  { id: 8,  nm: 'STRENGTH',               meaning: "Not a fight, but a taming. Your softness is your strength." },
  { id: 9,  nm: 'THE HERMIT',             meaning: "A day of silence and a lantern. Go inward — that's where the answer is." },
  { id: 10, nm: 'WHEEL OF FORTUNE',       meaning: 'A turn. What was below will rise toward the light.' },
  { id: 11, nm: 'JUSTICE',                meaning: 'The scales are moving. Be honest — especially with yourself.' },
  { id: 12, nm: 'THE HANGED MAN',         meaning: "Turn upside down — you'll see differently. A day for the view from above." },
  { id: 13, nm: 'DEATH',                  meaning: 'Not an ending — a reassembly. Something must leave so something new can arrive.' },
  { id: 14, nm: 'TEMPERANCE',             meaning: "Drop by drop. Today's alchemy is in mixing, not choosing." },
  { id: 15, nm: 'THE DEVIL',              meaning: 'Chains you put on yourself. Today — a day to see them.' },
  { id: 16, nm: 'THE TOWER',              meaning: 'An old wall will tremble. This is release dressed as loss.' },
  { id: 17, nm: 'THE STAR',               meaning: 'Hope returns. Pour someone a glass of water.' },
  { id: 18, nm: 'THE MOON',               meaning: "Fog doesn't lie — it reveals. Trust tonight's dreams." },
  { id: 19, nm: 'THE SUN',                meaning: 'A clear day. Every mask can come off.' },
  { id: 20, nm: 'JUDGEMENT',              meaning: 'A voice calls you to reconsider. Something old asks forgiveness.' },
  { id: 21, nm: 'THE WORLD',              meaning: 'A circle closes. Congratulate yourself — then begin the next.' },
];

function OracleHomeScreen({ onPickCard, onSpread }) {
  return (
    <div className="page-pad" style={{ paddingTop: 8 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <h1 className="h-display" style={{ fontSize: 36 }}>ORACLE</h1>
          <p className="poetic mt-6">Card of the day & spreads</p>
        </div>
        <GlyphDivider/>
        <button className="glass tap" onClick={onPickCard} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 18 }}>
          <div className="tcard back" style={{ width: 70, aspectRatio: '0.66', borderRadius: 10 }}>
            <div className="core" style={{ width: '70%' }}>
              <span style={{ fontFamily: 'Forum', fontSize: 18, color: 'var(--gold)' }}>☽</span>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div className="section-label" style={{ fontSize: 11 }}>CARD OF THE DAY</div>
            <div className="f-corm mt-6" style={{ fontSize: 17, color: 'var(--gold-soft)' }}>
              What the sky wants to tell you today
            </div>
            <div className="mt-6 muted" style={{ fontSize: 11 }}>Tap any of the 22 backs</div>
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
            <div className="section-label" style={{ fontSize: 11 }}>THREE-CARD SPREAD</div>
            <div className="f-corm mt-6" style={{ fontSize: 17, color: 'var(--gold-soft)' }}>
              Past · Present · Future
            </div>
            <div className="mt-6 muted" style={{ fontSize: 11 }}>Ask a question — pull three</div>
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
      <PageHeader crumb="Card of the day" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {!card && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingBottom: 8 }}>
              <h2 className="h-display" style={{ fontSize: 28 }}>CHOOSE ONE</h2>
              <p className="poetic mt-6">Close your eyes, listen, tap</p>
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
                ARCANUM {String(card.id).padStart(2, '0')}{reversed && ' · REVERSED'}
              </div>
              <h2 className="h-display mt-8" style={{ fontSize: 26 }}>{card.nm}</h2>
            </div>
            <div className="glass mt-16" style={{ textAlign: 'left' }}>
              <div className="f-corm" style={{ fontSize: 17, color: 'var(--gold-soft)', lineHeight: 1.45 }}>
                {card.meaning}
              </div>
              <p className="mt-14" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                {reversed
                  ? "Reversed, the card asks you to slow down — what you usually do outside, do inside today. A day for introversion and rebuilding."
                  : "The card speaks plainly: what you feel today isn't accidental. It's a direction. Don't turn away — but don't rush, either."}
              </p>
            </div>
            <div className="mt-20" style={{ display: 'flex', gap: 10 }}>
              <button className="btn outline flex1" onClick={() => setPicked(null)}>Another one</button>
              <button className="btn primary flex1" onClick={onBack}>Save the day</button>
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
  return (
    <div style={{
      width: w, aspectRatio: '0.66', borderRadius: 14,
      background: 'radial-gradient(circle at 50% 30%, rgba(232,210,158,0.18), transparent 60%), linear-gradient(180deg, #1a1424 0%, #0d0a18 100%)',
      border: '1px solid var(--gold)',
      boxShadow: '0 14px 40px rgba(0,0,0,0.5), 0 0 30px rgba(201,168,106,0.18)',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: large ? 22 : 8,
      transform: reversed ? 'rotate(180deg)' : 'none',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'Forum', fontSize: large ? 14 : 8, color: 'var(--gold)', letterSpacing: '0.15em' }}>
          {String(card.id).padStart(2, '0')}
        </span>
        {reversed && <span style={{ color: 'var(--gold)', fontSize: large ? 16 : 9, transform: 'rotate(180deg)' }}>↻</span>}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TarotIllustration id={card.id} size={large ? 110 : 38}/>
      </div>
      <div style={{ fontFamily: 'Forum', fontSize: large ? 13 : 7, color: 'var(--gold-soft)',
                    letterSpacing: '0.16em', textAlign: 'center', textTransform: 'uppercase' }}>
        {card.nm}
      </div>
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
  const positions = ['PAST', 'PRESENT', 'FUTURE'];
  return (
    <>
      <PageHeader crumb="Three-card spread" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {step === 0 && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingTop: 16 }}>
              <h2 className="h-display" style={{ fontSize: 26 }}>ASK A QUESTION</h2>
              <p className="poetic mt-8">Name the thing that matters right now</p>
            </div>
            <div className="mt-24">
              <div className="field-label">QUESTION</div>
              <textarea className="input" rows={3}
                placeholder="For example — should I right now..."
                value={question} onChange={e => setQuestion(e.target.value)}/>
            </div>
            <button className="btn primary block mt-20" onClick={start}>Ask</button>
          </div>
        )}
        {step >= 1 && step <= 3 && (
          <>
            <div className="glass" style={{ padding: 14, marginBottom: 14 }}>
              <div className="section-label" style={{ fontSize: 10 }}>QUESTION</div>
              <div className="f-corm mt-4" style={{ fontSize: 15, color: 'var(--gold-soft)' }}>{question}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="section-label" style={{ fontSize: 11 }}>DRAW CARD {step} OF 3</div>
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
              <div className="section-label" style={{ fontSize: 10 }}>QUESTION</div>
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
            <button className="btn outline block mt-20" onClick={onBack}>Back to Oracle</button>
          </div>
        )}
      </div>
    </>
  );
}
window.SpreadScreen = SpreadScreen;
