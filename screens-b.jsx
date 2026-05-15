/* global React */
const { useState, useEffect, useRef } = React;

/* ════════════════════════════════════════════════════════════════
   SCREEN 7: NATAL CHART (when created)
   ═══════════════════════════════════════════════════════════════ */
const NATAL_NARRATIVES = [
  { g: '☉', t: 'Личность',       b: 'Солнце во Льве в 10 доме. Ты создана быть видимой — твоя сила раскрывается, когда работа становится сценой. Свет, который ты несёшь, греет, а не обжигает.' },
  { g: '☽', t: 'Эмоции',         b: 'Луна в Деве в 11 доме. Ты чувствуешь через детали и через других. Близкие люди — твой эмоциональный камертон.' },
  { g: '☿', t: 'Коммуникация',   b: 'Меркурий во Льве. Ты говоришь образами и сценами. В словах живёт театр — это твоя сила убеждать.' },
  { g: '♀', t: 'Любовь',         b: 'Венера в Деве. Ты любишь через заботу о деталях. Жесты значат для тебя больше слов.' },
  { g: '♂', t: 'Действие',       b: 'Марс в Овне. Ты начинаешь стремительно. Учись держать темп — он твой главный союзник.' },
  { g: '♃', t: 'Рост',           b: 'Юпитер в Стрельце. Тебя растят дороги и иностранные языки. Не оставайся в одной комнате слишком долго.' },
  { g: '♄', t: 'Структура',      b: 'Сатурн в Козероге. Дисциплина — твой невидимый ангел. Через ограничение ты находишь свободу.' },
  { g: '♅', t: 'Свобода',        b: 'Уран в Водолее. Ты рождена для перемен. Не бойся отказаться от того, что было правдой вчера.' },
  { g: '♆', t: 'Воображение',    b: 'Нептун в Рыбах. Ты видишь сны как карты. Доверяй интуиции — она знает раньше разума.' },
  { g: '♇', t: 'Глубина',        b: 'Плутон в Скорпионе. Ты способна на полную трансформацию. Не бойся уходить в темноту — там твой ресурс.' },
];
function NatalChartScreen({ name, onRecreate }) {
  return (
    <div className="page-pad" style={{ paddingTop: 12 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <h1 className="h-display" style={{ fontSize: 32 }}>НАТАЛЬНАЯ КАРТА</h1>
          <p className="poetic mt-6">{name} · 12 августа 1993, 04:18 · Москва</p>
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
            <span style={{ color: 'var(--gold)', marginRight: 4 }}>ASC</span>Рак 14°
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-mute)' }}>
            <span style={{ color: 'var(--gold)', marginRight: 4 }}>MC</span>Рыбы 22°
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-mute)' }}>
            <span style={{ color: 'var(--gold)', marginRight: 4 }}>☉</span>Лев 19°
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
          <button className="btn outline block" onClick={onRecreate}>Пересоздать карту</button>
        </div>
      </div>
    </div>
  );
}
window.NatalChartScreen = NatalChartScreen;

/* Empty natal (offer to create) */
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
        <h2 className="h-display" style={{ fontSize: 28 }}>КАРТА ЕЩЁ НЕ СОЗДАНА</h2>
        <p className="poetic mt-12" style={{ maxWidth: 260, margin: '12px auto 0' }}>
          Натальная карта — отпечаток неба в момент твоего рождения. Создаётся один раз.
        </p>
        <div className="mt-32">
          <button className="btn primary" onClick={onCreate}>Создать карту</button>
        </div>
      </div>
    </div>
  );
}
window.NatalEmptyScreen = NatalEmptyScreen;

/* ════════════════════════════════════════════════════════════════
   SCREEN 8: CALENDAR (Days)
   ═══════════════════════════════════════════════════════════════ */
const WD = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ'];
const MONTHS = ['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
const MOON_SIGNS = ['Деве','Весах','Скорпионе','Стрельце','Козероге','Водолее','Рыбах','Овне','Тельце','Близнецах','Раке','Льве'];

function generateDays() {
  // start Tue 12 May 2026, 30 days
  const start = new Date(2026, 4, 12);
  let seed = 42;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const moods = ['up','tension','calm','up','down','calm','up','tension','up','calm','tension','calm'];
  const leads = [
    'Утро открытое, разговоры легки — ловите слова, которые давно ждали.',
    'День внутреннего напряжения: лучше слушать, чем решать.',
    'Тихий ровный день — для дел, требующих терпения.',
    'Венера улыбается — день для нежного слова и старого письма.',
    'Меркурий ретроградный задевает связь — перечитайте дважды.',
    'Луна в Деве просит порядка — разберите одну полку.',
    'День золотой: бери начатое и доводи до точки.',
    'Марс задевает Солнце — следи за тоном после полудня.',
    'Импульс силён — но направь его на одно дело, не на десять.',
    'Тишина — лучший советник этого дня.',
    'Ретроградность сгущает старые темы. Не торопитесь отвечать.',
    'Лунные часы — для воды, ванны, медленных дел.',
  ];
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const r = rnd();
    const mood = moods[i % moods.length];
    const markers = [];
    if (r > 0.7) markers.push('opp');
    if (r > 0.85) markers.push('tension');
    if ([3, 11, 22].includes(i)) markers.push('merc');
    if ([5, 14, 26].includes(i)) markers.push('moon');
    return {
      date: d, mood,
      lead: leads[i % leads.length],
      moonSign: MOON_SIGNS[i % MOON_SIGNS.length],
      markers,
    };
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
        <h1 className="h-display" style={{ fontSize: 36 }}>КАЛЕНДАРЬ</h1>
        <p className="poetic mt-6">Тридцать дней — тридцать состояний неба</p>
      </div>
      <GlyphDivider/>
      {/* legend */}
      <div className="chips" style={{ paddingBottom: 10 }}>
        <span className="chip"><span className="dot-marker up"/> Возможность</span>
        <span className="chip"><span className="dot-marker tension"/> Напряжение</span>
        <span className="chip"><span className="dot-marker merc"/> Меркурий рх</span>
        {hasNatal && <span className="chip"><span className="dot-marker moon"/> Луна задевает</span>}
      </div>
      {/* filter chips */}
      <div className="chips mt-10 mb-16">
        {[['all','Все'],['opp','Возможности'],['tension','Напряжение'],['peaks','Пики']].map(([id, lab]) => (
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
                         color: 'var(--text-mute)', textTransform: 'uppercase' }}>
            {WD[d.getDay()]}
          </span>
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
        <div className="f-corm" style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.45 }}>
          {day.lead}
        </div>
        <div className="mt-6" style={{ fontSize: 11, color: 'var(--text-faint)' }}>
          ☽ Луна в {day.moonSign}
        </div>
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
          <div className="section-label">{WD[d.getDay()]}, {d.getDate()} {MONTHS[d.getMonth()]}</div>
          <div className="f-corm mt-8" style={{ fontSize: 22, color: 'var(--gold-soft)', lineHeight: 1.35 }}>
            {day.lead}
          </div>
        </div>
        <div className="mt-16" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {day.markers.includes('opp')     && <span className="chip active" style={{ borderColor: 'var(--success)', color: 'var(--success-soft)' }}>▲ Возможность</span>}
          {day.markers.includes('tension') && <span className="chip" style={{ borderColor: 'var(--tension)', color: 'var(--tension)' }}>✕ Напряжение</span>}
          {day.markers.includes('merc')    && <span className="chip" style={{ borderColor: 'var(--merc)', color: 'var(--merc)' }}>◆ Меркурий рх</span>}
          {hasNatal && day.markers.includes('moon') && <span className="chip" style={{ borderColor: 'var(--moon)', color: 'var(--moon)' }}>○ Луна задевает</span>}
        </div>
        <div className="mt-20 glass">
          <div className="section-label mb-8" style={{ color: 'var(--success-soft)' }}>БЛАГОПРИЯТНО ДЛЯ</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
            Тихих разговоров, договоров на бумаге, прогулок у воды, длинных писем тем, кого давно не слышали.
          </div>
        </div>
        <div className="mt-10 glass">
          <div className="section-label mb-8" style={{ color: 'var(--danger)' }}>ЛУЧШЕ ИЗБЕГАТЬ</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
            Резких заявлений после 19:00, новых финансовых обязательств, споров о прошлом.
          </div>
        </div>
        <div className="mt-10 glass">
          <div className="section-label mb-8">ЗАМЕТКА</div>
          <div className="f-corm" style={{ fontSize: 14, color: 'var(--text-mute)', lineHeight: 1.6 }}>
            Луна в {day.moonSign} — день, когда мелочи говорят громче главного.
          </div>
        </div>
        <div className="mt-20"><button className="btn outline block" onClick={onClose}>Закрыть</button></div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   SCREEN 9 & 10: ORACLE (Tarot)
   ═══════════════════════════════════════════════════════════════ */
const TAROT_DECK = [
  { id: 0,  nm: 'ШУТ',                  meaning: 'Прыжок в неизвестность. Сегодня день верить интуиции.' },
  { id: 1,  nm: 'МАГ',                  meaning: 'Инструменты собраны. Действуй — небо благосклонно.' },
  { id: 2,  nm: 'ВЕРХОВНАЯ ЖРИЦА',      meaning: 'Тайна стучится в дверь. Слушай тишину — она говорит правду.' },
  { id: 3,  nm: 'ИМПЕРАТРИЦА',          meaning: 'Земля плодородна. Что бы ты ни посадил — взойдёт.' },
  { id: 4,  nm: 'ИМПЕРАТОР',            meaning: 'День структуры и решений. Поставь рамку — внутри будет свобода.' },
  { id: 5,  nm: 'ИЕРОФАНТ',             meaning: 'Старая мудрость — твой проводник. Спроси у того, кто прошёл.' },
  { id: 6,  nm: 'ВЛЮБЛЁННЫЕ',           meaning: 'Выбор сердца. Между двумя путями — тот, что светится теплее.' },
  { id: 7,  nm: 'КОЛЕСНИЦА',            meaning: 'Движение неотвратимо. Держи поводья крепче — езжай быстрее.' },
  { id: 8,  nm: 'СИЛА',                 meaning: 'Не борьба, а укрощение. Твоя мягкость — твоя сила.' },
  { id: 9,  nm: 'ОТШЕЛЬНИК',            meaning: 'День тишины и фонаря. Иди вглубь — там твой ответ.' },
  { id: 10, nm: 'КОЛЕСО ФОРТУНЫ',       meaning: 'Поворот. То, что было низом, поднимется к свету.' },
  { id: 11, nm: 'СПРАВЕДЛИВОСТЬ',       meaning: 'Весы качаются. Будь честен — особенно с собой.' },
  { id: 12, nm: 'ПОВЕШЕННЫЙ',           meaning: 'Перевернись — увидишь иначе. День взгляда сверху.' },
  { id: 13, nm: 'СМЕРТЬ',               meaning: 'Не конец — пересборка. Что-то должно уйти, чтобы пришло новое.' },
  { id: 14, nm: 'УМЕРЕННОСТЬ',          meaning: 'Капля к капле. Алхимия дня — в смешивании, а не в выборе.' },
  { id: 15, nm: 'ДЬЯВОЛ',               meaning: 'Цепи, которые ты сам надел. Сегодня — день увидеть это.' },
  { id: 16, nm: 'БАШНЯ',                meaning: 'Старая стена дрогнет. Это освобождение, замаскированное под потерю.' },
  { id: 17, nm: 'ЗВЕЗДА',               meaning: 'Надежда возвращается. Налей кому-нибудь воды.' },
  { id: 18, nm: 'ЛУНА',                 meaning: 'Туман не врёт — он показывает. Доверяй снам этой ночи.' },
  { id: 19, nm: 'СОЛНЦЕ',               meaning: 'День чистый. Все маски можно снять.' },
  { id: 20, nm: 'СУД',                  meaning: 'Голос зовёт пересмотреть. Что-то старое просит прощения.' },
  { id: 21, nm: 'МИР',                  meaning: 'Круг замкнулся. Поздравь себя — потом начни новый.' },
];

function OracleHomeScreen({ onPickCard, onSpread }) {
  return (
    <div className="page-pad" style={{ paddingTop: 8 }}>
      <div className="stagger">
        <div style={{ textAlign: 'center' }}>
          <h1 className="h-display" style={{ fontSize: 36 }}>ОРАКУЛ</h1>
          <p className="poetic mt-6">Карта дня и расклады</p>
        </div>
        <GlyphDivider/>
        <button className="glass tap" onClick={onPickCard} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 18 }}>
          <div className="tcard back" style={{ width: 70, aspectRatio: '0.66', borderRadius: 10 }}>
            <div className="core" style={{ width: '70%' }}>
              <span style={{ fontFamily: 'Forum', fontSize: 18, color: 'var(--gold)' }}>☽</span>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div className="section-label" style={{ fontSize: 11 }}>КАРТА ДНЯ</div>
            <div className="f-corm mt-6" style={{ fontSize: 17, color: 'var(--gold-soft)' }}>
              Что небо хочет сказать тебе сегодня
            </div>
            <div className="mt-6 muted" style={{ fontSize: 11 }}>Тапни любую рубашку из 22-х</div>
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
            <div className="section-label" style={{ fontSize: 11 }}>РАСКЛАД НА 3 КАРТЫ</div>
            <div className="f-corm mt-6" style={{ fontSize: 17, color: 'var(--gold-soft)' }}>
              Прошлое · Настоящее · Будущее
            </div>
            <div className="mt-6 muted" style={{ fontSize: 11 }}>Задай вопрос — и вытяни три</div>
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
    setTimeout(() => {
      setPicked(idx);
      setFlipping(false);
    }, 600);
  };

  const card = picked !== null ? TAROT_DECK[picked % 22] : null;

  return (
    <>
      <PageHeader crumb="Карта дня" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {!card && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingBottom: 8 }}>
              <h2 className="h-display" style={{ fontSize: 28 }}>ВЫБЕРИ ОДНУ</h2>
              <p className="poetic mt-6">Закрой глаза, прислушайся, тапни</p>
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
                АРКАН {String(card.id).padStart(2, '0')}{reversed && ' · ПЕРЕВЁРНУТА'}
              </div>
              <h2 className="h-display mt-8" style={{ fontSize: 26 }}>{card.nm}</h2>
            </div>
            <div className="glass mt-16" style={{ textAlign: 'left' }}>
              <div className="f-corm" style={{ fontSize: 17, color: 'var(--gold-soft)', lineHeight: 1.45 }}>
                {card.meaning}
              </div>
              <p className="mt-14" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-mute)' }}>
                {reversed
                  ? 'В перевёрнутом положении карта зовёт замедлиться: то, что обычно делаешь снаружи — сегодня сделай внутри. День интроверсии и пересборки.'
                  : 'Карта говорит прямо: то, что чувствуешь сегодня — не случайность. Это направление. Не сворачивай — но и не торопись.'}
              </p>
            </div>
            <div className="mt-20" style={{ display: 'flex', gap: 10 }}>
              <button className="btn outline flex1" onClick={() => setPicked(null)}>Ещё одна</button>
              <button className="btn primary flex1" onClick={onBack}>Сохранить день</button>
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
      width: w, aspectRatio: '0.66',
      borderRadius: 14,
      background:
        'radial-gradient(circle at 50% 30%, rgba(232,210,158,0.18), transparent 60%), ' +
        'linear-gradient(180deg, #1a1424 0%, #0d0a18 100%)',
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
        {reversed && (
          <span style={{ color: 'var(--gold)', fontSize: large ? 16 : 9, transform: 'rotate(180deg)' }}>↻</span>
        )}
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TarotIllustration id={card.id} size={large ? 110 : 38}/>
      </div>
      <div style={{ fontFamily: 'Forum', fontSize: large ? 13 : 7, color: 'var(--gold-soft)',
                    letterSpacing: '0.18em', textAlign: 'center', textTransform: 'uppercase' }}>
        {card.nm}
      </div>
    </div>
  );
}
window.TarotCardFace = TarotCardFace;

/* Abstract tarot illustration — gold linework on dark; deliberately schematic */
function TarotIllustration({ id, size }) {
  const c = size / 2;
  const stroke = 'rgba(232,210,158,0.85)';
  const dim = 'rgba(201,168,106,0.45)';
  const common = {
    stroke, strokeWidth: 0.9, fill: 'none', strokeLinecap: 'round',
  };
  return (
    <svg width={size} height={size * 1.35} viewBox={`0 0 ${size} ${size * 1.35}`}>
      {/* outer frame */}
      <rect x="6" y="6" width={size - 12} height={size * 1.35 - 12}
            stroke={dim} strokeWidth="0.6" fill="none" rx="4"/>
      {/* glyph in center based on card id */}
      <g transform={`translate(${c}, ${size * 0.65})`}>
        {id === 2 && (
          <>
            <circle r={size * 0.22} {...common}/>
            <path d={`M -${size*0.22} 0 A ${size*0.22} ${size*0.22} 0 0 1 ${size*0.22} 0`} stroke={stroke} fill={stroke} opacity="0.4"/>
            <line x1="0" y1={-size * 0.32} x2="0" y2={size * 0.32} {...common}/>
          </>
        )}
        {id === 18 && (
          <>
            <path d={`M ${-size*0.2} 0 A ${size*0.2} ${size*0.2} 0 0 0 ${size*0.2} 0`} {...common}/>
            <circle cx="0" cy={-size * 0.08} r={size * 0.18} stroke={stroke} fill="none" strokeWidth="0.9"/>
            <circle cx={size * 0.08} cy={-size * 0.1} r={size * 0.15} fill="#070711"/>
          </>
        )}
        {id === 19 && (
          <>
            <circle r={size * 0.18} fill={stroke} opacity="0.5"/>
            {Array.from({length: 12}).map((_, i) => {
              const a = i * Math.PI * 2 / 12;
              return <line key={i} x1={Math.cos(a) * size * 0.22} y1={Math.sin(a) * size * 0.22}
                           x2={Math.cos(a) * size * 0.34} y2={Math.sin(a) * size * 0.34} {...common}/>;
            })}
          </>
        )}
        {id === 17 && (
          <>
            <path d={`M 0 ${-size*0.3} L ${size*0.08} ${-size*0.08} L ${size*0.3} 0 L ${size*0.08} ${size*0.08} L 0 ${size*0.3} L ${-size*0.08} ${size*0.08} L ${-size*0.3} 0 L ${-size*0.08} ${-size*0.08} Z`}
                  fill={stroke} opacity="0.6"/>
          </>
        )}
        {id === 13 && (
          <>
            <path d={`M ${-size*0.28} ${-size*0.28} L ${size*0.28} ${size*0.28} M ${-size*0.28} ${size*0.28} L ${size*0.28} ${-size*0.28}`} {...common}/>
            <circle r={size * 0.06} fill={stroke}/>
          </>
        )}
        {id === 8 && (
          <>
            <path d={`M ${-size*0.3} 0 Q 0 ${-size*0.32} ${size*0.3} 0 Q 0 ${size*0.32} ${-size*0.3} 0 Z`} {...common}/>
            <path d="M -3 -2 L 3 -2 M -3 2 L 3 2" stroke={stroke} strokeWidth="1.2"/>
          </>
        )}
        {![2,8,13,17,18,19].includes(id) && (
          <>
            <circle r={size * 0.22} {...common}/>
            <path d={`M 0 ${-size*0.3} L ${size*0.05} ${-size*0.05} L ${size*0.3} 0 L ${size*0.05} ${size*0.05} L 0 ${size*0.3} L ${-size*0.05} ${size*0.05} L ${-size*0.3} 0 L ${-size*0.05} ${-size*0.05} Z`}
                  stroke={stroke} strokeWidth="0.7" fill="none"/>
          </>
        )}
      </g>
    </svg>
  );
}

function SpreadScreen({ onBack }) {
  const [question, setQuestion] = useState('');
  const [step, setStep] = useState(0); // 0=ask 1=pick1 2=pick2 3=pick3 4=reveal
  const [picks, setPicks] = useState([]);

  const start = () => { if (question.trim()) setStep(1); };
  const handlePick = (i) => {
    if (picks.includes(i)) return;
    const np = [...picks, i];
    setPicks(np);
    if (np.length >= 3) setTimeout(() => setStep(4), 400);
    else setStep(step + 1);
  };

  const positions = ['ПРОШЛОЕ', 'НАСТОЯЩЕЕ', 'БУДУЩЕЕ'];

  return (
    <>
      <PageHeader crumb="Расклад на 3 карты" onBack={onBack}/>
      <div className="page-pad" style={{ paddingTop: 4 }}>
        {step === 0 && (
          <div className="stagger">
            <div style={{ textAlign: 'center', paddingTop: 16 }}>
              <h2 className="h-display" style={{ fontSize: 26 }}>ЗАДАЙ ВОПРОС</h2>
              <p className="poetic mt-8">Сформулируй то, что важно сейчас</p>
            </div>
            <div className="mt-24">
              <div className="field-label">ВОПРОС</div>
              <textarea className="input" rows={3}
                placeholder="Например — стоит ли мне сейчас..."
                value={question} onChange={e => setQuestion(e.target.value)}/>
            </div>
            <button className="btn primary block mt-20" onClick={start}>Спросить</button>
          </div>
        )}
        {step >= 1 && step <= 3 && (
          <>
            <div className="glass" style={{ padding: 14, marginBottom: 14 }}>
              <div className="section-label" style={{ fontSize: 10 }}>ВОПРОС</div>
              <div className="f-corm mt-4" style={{ fontSize: 15, color: 'var(--gold-soft)' }}>{question}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="section-label" style={{ fontSize: 11 }}>ВЫТЯНИ КАРТУ {step} ИЗ 3</div>
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
              <div className="section-label" style={{ fontSize: 10 }}>ВОПРОС</div>
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
            <button className="btn outline block mt-20" onClick={onBack}>К Оракулу</button>
          </div>
        )}
      </div>
    </>
  );
}
window.SpreadScreen = SpreadScreen;
