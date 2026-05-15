/* global React */
const { useState, useEffect, useRef } = React;

/* ════════════════════════════════════════════════════════════════
   SCREEN 11: SYNASTRY (compatibility)
   ═══════════════════════════════════════════════════════════════ */
function SynastryScreen({ onBack }) {
  const [stage, setStage] = useState('form'); // form | result
  const [form, setForm] = useState({ name: 'Анна', date: '14.03.1992', time: '08:42', place: 'Санкт-Петербург' });
  const [resonance] = useState(72);

  const submit = () => setStage('result');

  return (
    <>
      <PageHeader crumb="Совместимость" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {stage === 'form' && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <h2 className="h-display" style={{ fontSize: 28 }}>СИНАСТРИЯ</h2>
              <p className="poetic mt-8">Карта вас двоих — где звёзды поют в унисон, а где спорят</p>
            </div>
            <div className="mt-16">
              <div className="field-label">ИМЯ ПАРТНЁРА</div>
              <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
            </div>
            <div>
              <div className="field-label">ДАТА РОЖДЕНИЯ</div>
              <input className="input" value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="дд.мм.гггг"/>
            </div>
            <div>
              <div className="field-label">ВРЕМЯ (НЕОБЯЗАТЕЛЬНО)</div>
              <input className="input" value={form.time} onChange={e => setForm({...form, time: e.target.value})} placeholder="чч:мм"/>
            </div>
            <div>
              <div className="field-label">МЕСТО РОЖДЕНИЯ</div>
              <input className="input" value={form.place} onChange={e => setForm({...form, place: e.target.value})}/>
            </div>
            <button className="btn primary block mt-20" onClick={submit}>Совместить карты</button>
          </div>
        )}
        {stage === 'result' && (
          <div className="stagger">
            <div style={{ textAlign: 'center' }}>
              <div className="section-label" style={{ fontSize: 10 }}>СЕРГЕЙ × {form.name.toUpperCase()}</div>
              <h2 className="h-display mt-6" style={{ fontSize: 26 }}>ВАШ РЕЗОНАНС</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 4px' }}>
              <ResonanceRing value={resonance}/>
            </div>
            <div className="poetic" style={{ textAlign: 'center', fontSize: 17, color: 'var(--gold-soft)' }}>
              Гармоничный резонанс — вы звучите в одной тональности
            </div>

            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #6FD68A, #4FBD6E)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--success-soft)' }}>СИЛЬНАЯ СТОРОНА</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>
                  Венера к Солнцу
                </div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  Вы видите друг в друге не образ, а правду. Это редко — и это надолго.
                </p>
              </div>
            </div>

            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #E26565, #B53A3A)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--danger)' }}>ТОЧКА НАПРЯЖЕНИЯ</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>
                  Марс в квадрате с Луной
                </div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  Скорости разные. Один летит — другой замирает. Учитесь договариваться о темпе.
                </p>
              </div>
            </div>

            <div className="glass" style={{ display: 'flex', gap: 12, padding: 16 }}>
              <div style={{ width: 4, background: 'linear-gradient(180deg, #E8D29E, #C9A86A)', borderRadius: 2 }}/>
              <div>
                <div className="section-label" style={{ fontSize: 10, color: 'var(--gold)' }}>ФОКУС МЕСЯЦА</div>
                <div className="f-corm mt-6" style={{ fontSize: 16, color: 'var(--gold-soft)' }}>
                  Юпитер открывает разговор
                </div>
                <p className="mt-8" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                  Май — время сказать вслух то, что подразумевалось. Это укрепит связь.
                </p>
              </div>
            </div>

            <button className="btn outline block mt-12" onClick={() => setStage('form')}>Сменить партнёра</button>
          </div>
        )}
      </div>
    </>
  );
}
window.SynastryScreen = SynastryScreen;

/* ════════════════════════════════════════════════════════════════
   SCREEN 12 & 13: MOON JOURNAL + HISTORY
   ═══════════════════════════════════════════════════════════════ */
const MOON_PHASES = [
  { p: 0.0,  nm: 'НОВОЛУНИЕ',         glyph: '🌑', ritual: 'Запиши намерение от руки. Сложи лист, спрячь в книгу.' },
  { p: 0.25, nm: 'ПЕРВАЯ ЧЕТВЕРТЬ',   glyph: '🌓' },
  { p: 0.35, nm: 'РАСТУЩАЯ ЛУНА',     glyph: '🌔' },
  { p: 0.5,  nm: 'ПОЛНОЛУНИЕ',        glyph: '🌕', ritual: 'Зажги свечу у окна. Поблагодари то, что уже сбылось.' },
  { p: 0.7,  nm: 'УБЫВАЮЩАЯ ЛУНА',    glyph: '🌖' },
  { p: 0.75, nm: 'ПОСЛЕДНЯЯ ЧЕТВЕРТЬ', glyph: '🌗' },
];

const PROMPTS = [
  'От чего пора освободиться?',
  'Что ты хочешь впустить в свою жизнь?',
  'Где сегодня живёт твоя сила?',
  'Какое чувство просит быть услышанным?',
  'Что ты прощаешь себе сегодня?',
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
      <PageHeader crumb="Лунный дневник" onBack={onBack}
        right={<>
          <button className="icon-btn" onClick={onHistory} aria-label="История">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="3" y="3" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <line x1="6" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="6" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="6" y1="13" x2="10" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn" onClick={save} aria-label="Сохранить"
                  style={{ color: saved ? 'var(--success)' : 'var(--gold)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9L7.5 12.5L14 5.5" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
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
            <p className="poetic mt-6" style={{ fontSize: 14 }}>
              Луна в Деве · освещённость 35%
            </p>
          </div>
          <GlyphDivider glyph="☽"/>
          <div style={{ textAlign: 'center', padding: '8px 4px' }}>
            <div className="f-corm" style={{ fontSize: 22, color: 'var(--gold-soft)', lineHeight: 1.35 }}>
              «{prompt}»
            </div>
          </div>
          <div>
            <textarea className="input" rows={9}
              placeholder="Пиши свободно — никто, кроме тебя, не увидит"
              value={text} onChange={e => setText(e.target.value)}/>
            <div className="muted mt-8 f-corm" style={{ fontSize: 12, textAlign: 'center' }}>
              запись сохранится локально, на этом устройстве
            </div>
          </div>
          <button className="btn primary block" onClick={save}>
            {saved ? 'Сохранено ✓' : 'Сохранить запись'}
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
      <PageHeader crumb="История дневника" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        <div style={{ textAlign: 'center', paddingBottom: 8 }}>
          <span className="section-label">{entries.length} {pluralRu(entries.length, 'запись','записи','записей')}</span>
        </div>
        <GlyphDivider/>
        {entries.length === 0 && (
          <div className="muted center" style={{ paddingTop: 40, fontSize: 13 }}>
            Здесь будут твои записи.
          </div>
        )}
        <div className="col gap-12">
          {entries.slice().reverse().map((e, i) => (
            <div key={i} className="glass">
              <div className="section-label" style={{ fontSize: 10 }}>
                {formatRuDate(e.date).toUpperCase()}
              </div>
              {e.prompt && (
                <div className="f-corm mt-6" style={{ fontSize: 14, color: 'var(--gold-soft)' }}>
                  «{e.prompt}»
                </div>
              )}
              <div className="mt-10" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
                {e.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
window.JournalHistoryScreen = JournalHistoryScreen;

const RU_WD_FULL = ['ВОСКРЕСЕНЬЕ','ПОНЕДЕЛЬНИК','ВТОРНИК','СРЕДА','ЧЕТВЕРГ','ПЯТНИЦА','СУББОТА'];
const RU_M_FULL = ['ЯНВАРЯ','ФЕВРАЛЯ','МАРТА','АПРЕЛЯ','МАЯ','ИЮНЯ','ИЮЛЯ','АВГУСТА','СЕНТЯБРЯ','ОКТЯБРЯ','НОЯБРЯ','ДЕКАБРЯ'];
function formatRuDate(d) {
  return `${RU_WD_FULL[d.getDay()]}, ${d.getDate()} ${RU_M_FULL[d.getMonth()]}`;
}
function pluralRu(n, one, few, many) {
  const r = n % 10, h = n % 100;
  if (h >= 11 && h <= 14) return many;
  if (r === 1) return one;
  if (r >= 2 && r <= 4) return few;
  return many;
}
window.formatRuDate = formatRuDate;

/* ════════════════════════════════════════════════════════════════
   PROFILE
   ═══════════════════════════════════════════════════════════════ */
function ProfileScreen({ name, hasNatal, onResetWelcome, onToggleNatal }) {
  return (
    <div className="page-pad" style={{ paddingTop: 16 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <div className="sigil-ring" style={{ width: 88, height: 88, margin: '0 auto 16px' }}>
            <span style={{ fontFamily: 'Forum', fontSize: 36, color: 'var(--gold)', position: 'relative', zIndex: 1 }}>♌</span>
          </div>
          <h2 className="h-display" style={{ fontSize: 28 }}>{(hasNatal ? name : 'ГОСТЬ').toUpperCase()}</h2>
          <p className="poetic mt-6">{hasNatal ? 'Лев · 12 августа 1993' : 'Натальная карта не создана'}</p>
        </div>
        <GlyphDivider/>
        <div className="glass">
          <div className="section-label mb-10">ПОДПИСКА</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%',
                          background: 'radial-gradient(circle at 30% 30%, #E8D29E, #8C7140)',
                          flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Forum', fontSize: 13, letterSpacing: '0.14em', color: 'var(--gold)' }}>ASTROGUIDE+</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>Активна до 14 декабря 2026</div>
            </div>
            <button className="btn text">Управлять</button>
          </div>
        </div>
        <ListRow label="УВЕДОМЛЕНИЯ" sub="Каждое утро в 8:00"/>
        <ListRow label="ТЕМА" sub="Только тёмная"/>
        <ListRow label="ЯЗЫК" sub="Русский"/>
        <ListRow label="ЭКСПОРТ ДНЕВНИКА" sub="PDF · 12 записей"/>
        <ListRow label="ОБ ПРИЛОЖЕНИИ" sub="Версия 1.4.2"/>
        <GlyphDivider glyph="✦"/>
        <button className="btn outline block" onClick={onResetWelcome}>Показать вступление снова</button>
        <button className="btn outline block" onClick={onToggleNatal}>
          {hasNatal ? 'Удалить натальную карту' : 'Создать натальную карту'}
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

/* ════════════════════════════════════════════════════════════════
   CHANGE SIGN PICKER (inline modal)
   ═══════════════════════════════════════════════════════════════ */
function SignPickerSheet({ current, onPick, onClose, title = 'Выбери знак' }) {
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
        <button className="btn outline block mt-20" onClick={onClose}>Закрыть</button>
      </div>
    </>
  );
}
window.SignPickerSheet = SignPickerSheet;

/* ════════════════════════════════════════════════════════════════
   NATAL CREATE FORM
   ═══════════════════════════════════════════════════════════════ */
function NatalCreateScreen({ onBack, onCreate, name }) {
  const [form, setForm] = useState({ name: name || 'Сергей', date: '12.08.1993', time: '04:18', place: 'Москва' });
  return (
    <>
      <PageHeader crumb="Создание натальной карты" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        <div className="stagger">
          <div style={{ textAlign: 'center' }}>
            <div className="sigil-ring" style={{ width: 90, height: 90, margin: '0 auto 12px' }}>
              <span style={{ fontFamily: 'Forum', fontSize: 36, color: 'var(--gold)', position: 'relative', zIndex: 1 }}>✶</span>
            </div>
            <h2 className="h-display" style={{ fontSize: 24 }}>ДАННЫЕ РОЖДЕНИЯ</h2>
            <p className="poetic mt-6">Точное время даёт точную карту</p>
          </div>
          <div className="mt-8">
            <div className="field-label">ИМЯ</div>
            <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">ДАТА РОЖДЕНИЯ</div>
            <input className="input" value={form.date} onChange={e => setForm({...form, date: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">ВРЕМЯ</div>
            <input className="input" value={form.time} onChange={e => setForm({...form, time: e.target.value})}/>
          </div>
          <div>
            <div className="field-label">МЕСТО</div>
            <input className="input" value={form.place} onChange={e => setForm({...form, place: e.target.value})}/>
          </div>
          <button className="btn primary block mt-20" onClick={() => onCreate(form.name)}>
            Открыть карту
          </button>
        </div>
      </div>
    </>
  );
}
window.NatalCreateScreen = NatalCreateScreen;
