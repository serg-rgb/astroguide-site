/* global React */
/* Spanish locale build of screens-c.jsx */
const { useState, useEffect, useRef } = React;

/* ════════════ SYNASTRY ════════════ */
function SynastryScreen({ onBack }) {
  const [stage, setStage] = useState('form');
  const [form, setForm] = useState({ name: 'Ana', date: '14.03.1992', time: '08:42', place: 'Madrid' });
  const [resonance] = useState(72);
  const submit = () => setStage('result');
  return (
    <>
      <PageHeader crumb="Compatibilidad" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {stage === 'form' && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <h2 className="h-display" style={{ fontSize: 28 }}>SINASTRÍA</h2>
              <p className="poetic mt-8">Una carta de los dos — dónde las estrellas cantan al unísono y dónde discuten</p>
            </div>
            <div className="mt-16">
              <div className="field-label">NOMBRE DE LA PAREJA</div>
              <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
            </div>
            <div>
              <div className="field-label">FECHA DE NACIMIENTO</div>
              <input className="input" value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="dd.mm.aaaa"/>
            </div>
            <div>
              <div className="field-label">HORA (OPCIONAL)</div>
              <input className="input" value={form.time} onChange={e => setForm({...form, time: e.target.value})} placeholder="hh:mm"/>
            </div>
            <div>
              <div className="field-label">LUGAR DE NACIMIENTO</div>
              <input className="input" value={form.place} onChange={e => setForm({...form, place: e.target.value})}/>
            </div>
            <button className="btn primary block mt-20" onClick={submit}>Comparar cartas</button>
          </div>
        )}
        {stage === 'result' && (
          <div className="stagger">
            <div style={{ textAlign: 'center' }}>
              <div className="section-label" style={{ fontSize: 10 }}>SAM × {form.name.toUpperCase()}</div>
              <h2 className="h-display mt-6" style={{ fontSize: 26 }}>VUESTRA RESONANCIA</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 4px' }}>
              <ResonanceRing value={resonance}/>
            </div>
            <div className="poetic" style={{ textAlign: 'center', fontSize: 17, color: 'var(--gold-soft)' }}>
              Una resonancia armónica — sonáis en la misma tonalidad
            </div>
            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #6FD68A, #4FBD6E)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--success-soft)' }}>LADO FUERTE</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>Venus a Sol</div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  Os veis la verdad, no una imagen. Es raro — y dura.
                </p>
              </div>
            </div>
            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #E26565, #B53A3A)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--danger)' }}>PUNTO DE TENSIÓN</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>Marte cuadra a Luna</div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  Velocidades distintas. Uno corre, la otra pausa. Aprended a negociar el tempo.
                </p>
              </div>
            </div>
            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #E8D29E, #C9A86A)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--gold)' }}>FOCO DEL MES</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>Júpiter abre la conversación</div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  Mayo es el momento de decir en voz alta lo que estaba implícito. Fortalece el vínculo.
                </p>
              </div>
            </div>
            <button className="btn outline block mt-12" onClick={() => setStage('form')}>Cambiar pareja</button>
          </div>
        )}
      </div>
    </>
  );
}
window.SynastryScreen = SynastryScreen;

/* ════════════ MOON JOURNAL ════════════ */
const MOON_PHASES = [
  { p: 0.0,  nm: 'LUNA NUEVA',          glyph: '🌑' },
  { p: 0.25, nm: 'CUARTO CRECIENTE',    glyph: '🌓' },
  { p: 0.35, nm: 'LUNA CRECIENTE',      glyph: '🌔' },
  { p: 0.5,  nm: 'LUNA LLENA',          glyph: '🌕' },
  { p: 0.7,  nm: 'LUNA MENGUANTE',      glyph: '🌖' },
  { p: 0.75, nm: 'CUARTO MENGUANTE',    glyph: '🌗' },
];
const PROMPTS = [
  '¿Qué estás listo para soltar?',
  '¿Qué quieres dejar entrar en tu vida?',
  '¿Dónde vive hoy tu fuerza?',
  '¿Qué sentimiento pide ser escuchado?',
  '¿Qué te estás perdonando hoy?',
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
      <PageHeader crumb="Diario lunar" onBack={onBack}
        right={<>
          <button className="icon-btn" onClick={onHistory} aria-label="Historial">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="3" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="6" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="6" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="6" y1="13" x2="10" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn" onClick={save} aria-label="Guardar"
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
            <p className="poetic mt-6" style={{ fontSize: 14 }}>Luna en Virgo · 35% iluminada</p>
          </div>
          <GlyphDivider glyph="☽"/>
          <div style={{ textAlign: 'center', padding: '8px 4px' }}>
            <div className="f-corm" style={{ fontSize: 22, color: 'var(--gold-soft)', lineHeight: 1.35 }}>
              «{prompt}»
            </div>
          </div>
          <div>
            <textarea className="input" rows={9}
              placeholder="Escribe con libertad — nadie más que tú lo ve"
              value={text} onChange={e => setText(e.target.value)}/>
            <div className="muted mt-8 f-corm" style={{ fontSize: 12, textAlign: 'center' }}>
              guardado local, en este dispositivo
            </div>
          </div>
          <button className="btn primary block" onClick={save}>
            {saved ? 'Guardado ✓' : 'Guardar entrada'}
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
      <PageHeader crumb="Historial del diario" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        <div style={{ textAlign: 'center', paddingBottom: 8 }}>
          <span className="section-label">{entries.length} {entries.length === 1 ? 'entrada' : 'entradas'}</span>
        </div>
        <GlyphDivider/>
        {entries.length === 0 && (
          <div className="muted center" style={{ paddingTop: 40, fontSize: 13 }}>
            Tus entradas aparecerán aquí.
          </div>
        )}
        <div className="col gap-12">
          {entries.slice().reverse().map((e, i) => (
            <div key={i} className="glass">
              <div className="section-label" style={{ fontSize: 10 }}>{formatEsDate(e.date).toUpperCase()}</div>
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

const WD_FULL = ['DOMINGO','LUNES','MARTES','MIÉRCOLES','JUEVES','VIERNES','SÁBADO'];
const M_FULL = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
function formatEsDate(d) {
  return `${WD_FULL[d.getDay()]}, ${d.getDate()} DE ${M_FULL[d.getMonth()]}`;
}
window.formatEsDate = formatEsDate;

/* ════════════ PROFILE ════════════ */
function ProfileScreen({ name, hasNatal, onResetWelcome, onToggleNatal }) {
  return (
    <div className="page-pad" style={{ paddingTop: 16 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <div className="sigil-ring" style={{ width: 88, height: 88, margin: '0 auto 16px' }}>
            <span style={{ fontFamily: 'Forum', fontSize: 36, color: 'var(--gold)', position: 'relative', zIndex: 1 }}>♌</span>
          </div>
          <h2 className="h-display" style={{ fontSize: 28 }}>{(hasNatal ? name : 'INVITADO').toUpperCase()}</h2>
          <p className="poetic mt-6">{hasNatal ? 'Leo · 12 de agosto de 1993' : 'Aún sin carta natal'}</p>
        </div>
        <GlyphDivider/>
        <div className="glass">
          <div className="section-label mb-10">SUSCRIPCIÓN</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%',
                          background: 'radial-gradient(circle at 30% 30%, #E8D29E, #8C7140)',
                          flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Forum', fontSize: 13, letterSpacing: '0.14em', color: 'var(--gold)' }}>ASTROGUIDE+</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>Activa hasta el 14 de diciembre de 2026</div>
            </div>
            <button className="btn text">Gestionar</button>
          </div>
        </div>
        <ListRow label="NOTIFICACIONES" sub="Cada mañana a las 8:00"/>
        <ListRow label="TEMA" sub="Solo oscuro"/>
        <ListRow label="IDIOMA" sub="Español"/>
        <ListRow label="EXPORTAR DIARIO" sub="PDF · 12 entradas"/>
        <ListRow label="ACERCA DE" sub="Versión 1.4.2"/>
        <GlyphDivider glyph="✦"/>
        <button className="btn outline block" onClick={onResetWelcome}>Mostrar intro de nuevo</button>
        <button className="btn outline block" onClick={onToggleNatal}>
          {hasNatal ? 'Eliminar carta natal' : 'Dibujar carta natal'}
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
function SignPickerSheet({ current, onPick, onClose, title = 'Elige un signo' }) {
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
        <button className="btn outline block mt-20" onClick={onClose}>Cerrar</button>
      </div>
    </>
  );
}
window.SignPickerSheet = SignPickerSheet;

/* ════════════ NATAL CREATE ════════════ */
function NatalCreateScreen({ onBack, onCreate, name }) {
  const [form, setForm] = useState({ name: name || 'Sam', date: '12.08.1993', time: '04:18', place: 'Madrid' });
  return (
    <>
      <PageHeader crumb="Dibujar carta natal" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        <div className="stagger">
          <div style={{ textAlign: 'center' }}>
            <div className="sigil-ring" style={{ width: 90, height: 90, margin: '0 auto 12px' }}>
              <span style={{ fontFamily: 'Forum', fontSize: 36, color: 'var(--gold)', position: 'relative', zIndex: 1 }}>✶</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 24 }}>DATOS DE NACIMIENTO</h2>
            <p className="poetic mt-6">La hora exacta da una carta exacta</p>
          </div>
          <div className="mt-8">
            <div className="field-label">NOMBRE</div>
            <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">FECHA DE NACIMIENTO</div>
            <input className="input" value={form.date} onChange={e => setForm({...form, date: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">HORA</div>
            <input className="input" value={form.time} onChange={e => setForm({...form, time: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">LUGAR</div>
            <input className="input" value={form.place} onChange={e => setForm({...form, place: e.target.value})}/>
          </div>
          <button className="btn primary block mt-20" onClick={() => onCreate(form.name)}>Abrir carta</button>
        </div>
      </div>
    </>
  );
}
window.NatalCreateScreen = NatalCreateScreen;
