/* global React */
/* English locale build of screens-c.jsx */
const { useState, useEffect, useRef } = React;

/* ════════════ SYNASTRY ════════════ */
function SynastryScreen({ onBack }) {
  const [stage, setStage] = useState('form');
  const [form, setForm] = useState({ name: 'Anna', date: '14.03.1992', time: '08:42', place: 'Saint Petersburg' });
  const [resonance] = useState(72);
  const submit = () => setStage('result');
  return (
    <>
      <PageHeader crumb="Compatibility" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {stage === 'form' && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <h2 className="h-display" style={{ fontSize: 28 }}>SYNASTRY</h2>
              <p className="poetic mt-8">A chart of the two of you — where the stars sing in unison, and where they argue</p>
            </div>
            <div className="mt-16">
              <div className="field-label">PARTNER'S NAME</div>
              <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
            </div>
            <div>
              <div className="field-label">DATE OF BIRTH</div>
              <input className="input" value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="dd.mm.yyyy"/>
            </div>
            <div>
              <div className="field-label">TIME (OPTIONAL)</div>
              <input className="input" value={form.time} onChange={e => setForm({...form, time: e.target.value})} placeholder="hh:mm"/>
            </div>
            <div>
              <div className="field-label">PLACE OF BIRTH</div>
              <input className="input" value={form.place} onChange={e => setForm({...form, place: e.target.value})}/>
            </div>
            <button className="btn primary block mt-20" onClick={submit}>Compare charts</button>
          </div>
        )}
        {stage === 'result' && (
          <div className="stagger">
            <div style={{ textAlign: 'center' }}>
              <div className="section-label" style={{ fontSize: 10 }}>SAM × {form.name.toUpperCase()}</div>
              <h2 className="h-display mt-6" style={{ fontSize: 26 }}>YOUR RESONANCE</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 4px' }}>
              <ResonanceRing value={resonance}/>
            </div>
            <div className="poetic" style={{ textAlign: 'center', fontSize: 17, color: 'var(--gold-soft)' }}>
              A harmonious resonance — you ring in the same key
            </div>
            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #6FD68A, #4FBD6E)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--success-soft)' }}>STRONG SIDE</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>Venus to Sun</div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  You see truth in each other, not an image. Rare — and it lasts.
                </p>
              </div>
            </div>
            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #E26565, #B53A3A)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--danger)' }}>TENSION POINT</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>Mars square Moon</div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  Different speeds. One sprints, the other pauses. Learn to negotiate the tempo.
                </p>
              </div>
            </div>
            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #E8D29E, #C9A86A)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--gold)' }}>FOCUS OF THE MONTH</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>Jupiter opens the conversation</div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  May is the time to say aloud what was implied. It strengthens the bond.
                </p>
              </div>
            </div>
            <button className="btn outline block mt-12" onClick={() => setStage('form')}>Change partner</button>
          </div>
        )}
      </div>
    </>
  );
}
window.SynastryScreen = SynastryScreen;

/* ════════════ MOON JOURNAL ════════════ */
const MOON_PHASES = [
  { p: 0.0,  nm: 'NEW MOON',          glyph: '🌑' },
  { p: 0.25, nm: 'FIRST QUARTER',     glyph: '🌓' },
  { p: 0.35, nm: 'WAXING MOON',       glyph: '🌔' },
  { p: 0.5,  nm: 'FULL MOON',         glyph: '🌕' },
  { p: 0.7,  nm: 'WANING MOON',       glyph: '🌖' },
  { p: 0.75, nm: 'LAST QUARTER',      glyph: '🌗' },
];
const PROMPTS = [
  'What are you ready to release?',
  'What do you want to let into your life?',
  'Where is your strength living today?',
  'Which feeling is asking to be heard?',
  'What are you forgiving yourself for today?',
];

function MoonJournalScreen({ onBack, onHistory, entries, onSave }) {
  const [text, setText] = useState('');
  const phase = MOON_PHASES[2];
  const [promptIdx] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  const prompt = PROMPTS[promptIdx];
  const [saved, setSaved] = useState(false);
  const save = () => {
    if (!text.trim()) return;
    onSave({ date: new Date(), text, prompt });
    setSaved(true);
    setTimeout(() => { setSaved(false); setText(''); }, 1400);
  };
  return (
    <>
      <PageHeader crumb="Moon journal" onBack={onBack}
        right={<>
          <button className="icon-btn" onClick={onHistory} aria-label="History">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="3" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="6" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="6" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="6" y1="13" x2="10" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn" onClick={save} aria-label="Save"
                  style={{ color: saved ? 'var(--success)' : 'var(--gold)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9L7.5 12.5L14 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        <div className="stagger">
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <MoonPhase phase={phase.p} size={64}/>
            </div>
            <h2 className="h-display" style={{ fontSize: 22 }}>{phase.nm}</h2>
            <p className="poetic mt-6" style={{ fontSize: 14 }}>Moon in Virgo · 35% illuminated</p>
          </div>
          <GlyphDivider glyph="☽"/>
          <div style={{ textAlign: 'center', padding: '8px 4px' }}>
            <div className="f-corm" style={{ fontSize: 22, color: 'var(--gold-soft)', lineHeight: 1.35 }}>
              «{prompt}»
            </div>
          </div>
          <div>
            <textarea className="input" rows={9}
              placeholder="Write freely — no one but you sees this"
              value={text} onChange={e => setText(e.target.value)}/>
            <div className="muted mt-8 f-corm" style={{ fontSize: 12, textAlign: 'center' }}>
              saved locally, on this device
            </div>
          </div>
          <button className="btn primary block" onClick={save}>
            {saved ? 'Saved ✓' : 'Save entry'}
          </button>
        </div>
      </div>
    </>
  );
}
window.MoonJournalScreen = MoonJournalScreen;

function JournalHistoryScreen({ onBack, entries }) {
  return (
    <>
      <PageHeader crumb="Journal history" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        <div style={{ textAlign: 'center', paddingBottom: 8 }}>
          <span className="section-label">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
        </div>
        <GlyphDivider/>
        {entries.length === 0 && (
          <div className="muted center" style={{ paddingTop: 40, fontSize: 13 }}>
            Your entries will appear here.
          </div>
        )}
        <div className="col gap-12">
          {entries.slice().reverse().map((e, i) => (
            <div key={i} className="glass">
              <div className="section-label" style={{ fontSize: 10 }}>{formatEnDate(e.date).toUpperCase()}</div>
              {e.prompt && (
                <div className="f-corm mt-6" style={{ fontSize: 14, color: 'var(--gold-soft)' }}>«{e.prompt}»</div>
              )}
              <div className="mt-10" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>{e.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
window.JournalHistoryScreen = JournalHistoryScreen;

const WD_FULL = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
const M_FULL = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
function formatEnDate(d) {
  return `${WD_FULL[d.getDay()]}, ${M_FULL[d.getMonth()]} ${d.getDate()}`;
}
window.formatEnDate = formatEnDate;

/* ════════════ PROFILE ════════════ */
function ProfileScreen({ name, hasNatal, onResetWelcome, onToggleNatal }) {
  return (
    <div className="page-pad" style={{ paddingTop: 16 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <div className="sigil-ring" style={{ width: 88, height: 88, margin: '0 auto 16px' }}>
            <span style={{ fontFamily: 'Forum', fontSize: 36, color: 'var(--gold)', position: 'relative', zIndex: 1 }}>♌</span>
          </div>
          <h2 className="h-display" style={{ fontSize: 28 }}>{(hasNatal ? name : 'GUEST').toUpperCase()}</h2>
          <p className="poetic mt-6">{hasNatal ? 'Leo · August 12, 1993' : 'No birth chart yet'}</p>
        </div>
        <GlyphDivider/>
        <div className="glass">
          <div className="section-label mb-10">SUBSCRIPTION</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%',
                          background: 'radial-gradient(circle at 30% 30%, #E8D29E, #8C7140)',
                          flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Forum', fontSize: 13, letterSpacing: '0.14em', color: 'var(--gold)' }}>ASTROGUIDE+</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>Active until December 14, 2026</div>
            </div>
            <button className="btn text">Manage</button>
          </div>
        </div>
        <ListRow label="NOTIFICATIONS" sub="Every morning at 8:00"/>
        <ListRow label="THEME" sub="Dark only"/>
        <ListRow label="LANGUAGE" sub="English"/>
        <ListRow label="EXPORT JOURNAL" sub="PDF · 12 entries"/>
        <ListRow label="ABOUT" sub="Version 1.4.2"/>
        <GlyphDivider glyph="✦"/>
        <button className="btn outline block" onClick={onResetWelcome}>Show intro again</button>
        <button className="btn outline block" onClick={onToggleNatal}>
          {hasNatal ? 'Delete birth chart' : 'Draw birth chart'}
        </button>
        <div style={{ textAlign: 'center', paddingTop: 18 }}>
          <div className="faint" style={{ fontSize: 11 }}>AstroGuide · 2026</div>
        </div>
      </div>
    </div>
  );
}
window.ProfileScreen = ProfileScreen;

function ListRow({ label, sub }) {
  return (
    <button className="glass tap" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', textAlign: 'left' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Forum', fontSize: 12, letterSpacing: '0.18em',
                      color: 'var(--text)', textTransform: 'uppercase' }}>{label}</div>
        <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>{sub}</div>
      </div>
      <span style={{ color: 'var(--text-mute)', fontSize: 18 }}>›</span>
    </button>
  );
}

/* ════════════ SIGN PICKER ════════════ */
function SignPickerSheet({ current, onPick, onClose, title = 'Pick a sign' }) {
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose}/>
      <div className="sheet">
        <div className="mt-8 mb-16" style={{ textAlign: 'center' }}>
          <div className="section-label">{title.toUpperCase()}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {SIGNS.map(s => (
            <button key={s.id} className={`sign-tile ${current === s.id ? 'active' : ''}`}
                    onClick={() => { onPick(s.id); onClose(); }}>
              <span className="sym">{s.sym}</span>
              <span className="nm">{s.nm}</span>
            </button>
          ))}
        </div>
        <button className="btn outline block mt-20" onClick={onClose}>Close</button>
      </div>
    </>
  );
}
window.SignPickerSheet = SignPickerSheet;

/* ════════════ NATAL CREATE ════════════ */
function NatalCreateScreen({ onBack, onCreate, name }) {
  const [form, setForm] = useState({ name: name || 'Sam', date: '12.08.1993', time: '04:18', place: 'Moscow' });
  return (
    <>
      <PageHeader crumb="Draw birth chart" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        <div className="stagger">
          <div style={{ textAlign: 'center' }}>
            <div className="sigil-ring" style={{ width: 90, height: 90, margin: '0 auto 12px' }}>
              <span style={{ fontFamily: 'Forum', fontSize: 36, color: 'var(--gold)', position: 'relative', zIndex: 1 }}>✶</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 24 }}>BIRTH DETAILS</h2>
            <p className="poetic mt-6">Exact time gives an exact chart</p>
          </div>
          <div className="mt-8">
            <div className="field-label">NAME</div>
            <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">DATE OF BIRTH</div>
            <input className="input" value={form.date} onChange={e => setForm({...form, date: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">TIME</div>
            <input className="input" value={form.time} onChange={e => setForm({...form, time: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">PLACE</div>
            <input className="input" value={form.place} onChange={e => setForm({...form, place: e.target.value})}/>
          </div>
          <button className="btn primary block mt-20" onClick={() => onCreate(form.name)}>Open chart</button>
        </div>
      </div>
    </>
  );
}
window.NatalCreateScreen = NatalCreateScreen;
