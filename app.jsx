/* global React, ReactDOM */
const { useState, useEffect } = React;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "startScreen": "horoscope",
  "hasNatal": true,
  "selectedSign": "leo",
  "userName": "Сергей",
  "starCount": 26,
  "dropCap": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  // Scale the 393×852 phone to fit any viewport with 32px margin.
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const m = 32;
      const s = Math.min(
        (window.innerWidth - m) / 393,
        (window.innerHeight - m) / 852,
        1.2,
      );
      setScale(Math.max(0.3, s));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  const __params = new URLSearchParams(location.search);
  const __initTab = __params.get('screen') || t.startScreen;
  const __initSub = __params.get('sub');
  const __initWelcome = __params.get('welcome') === '1';
  const __initPromo = __params.get('promo') === '1';
  const __initPicker = __params.get('picker');           // 'own' | 'other' (presence opens it)
  const __initHasNatal = __params.has('hasNatal')
    ? __params.get('hasNatal') === '1'
    : t.hasNatal;
  const [route, setRoute] = useState(
    __initSub
      ? { type: 'sub', sub: __initSub, parentTab: __initTab, period: __params.get('period') || 'day', sign: __params.get('sign') || t.selectedSign }
      : { type: 'tab', tab: __initTab }
  ); // tab | sub
  const [showWelcome, setShowWelcome] = useState(__initWelcome);
  const [showNatalPromo, setShowNatalPromo] = useState(__initPromo);
  const [showSignPicker, setShowSignPicker] = useState(!!__initPicker);
  const [pickerMode, setPickerMode] = useState(__initPicker === 'other' ? 'other' : 'own'); // own | other
  const [journalEntries, setJournalEntries] = useState([
    { date: new Date(2026, 4, 11), prompt: 'Что ты хочешь впустить в свою жизнь?',
      text: 'Тишину по утрам. Чтобы час перед всеми разговорами принадлежал только мне.' },
    { date: new Date(2026, 4, 8), prompt: 'От чего пора освободиться?',
      text: 'От ожидания одобрения. От привычки переспрашивать у других — правильно ли я чувствую.' },
    { date: new Date(2026, 4, 3), prompt: 'Где сегодня живёт твоя сила?',
      text: 'В способности молчать, когда хочется оправдаться.' },
  ]);
  const [otherSign, setOtherSign] = useState(null);

  // URL hasNatal override wins for the first render (used by landing-tour iframes).
  const [hasNatalOverride, setHasNatalOverride] = useState(
    __params.has('hasNatal') ? __initHasNatal : null
  );
  const hasNatal = hasNatalOverride !== null ? hasNatalOverride : t.hasNatal;
  const setHasNatal = (v) => { setHasNatalOverride(null); setTweak('hasNatal', v); };
  const selectedSign = t.selectedSign;
  const setSelectedSign = (v) => setTweak('selectedSign', v);
  // URL name override wins for first render (used by landing iframes to swap the RU default).
  const [nameOverride, setNameOverride] = useState(__params.get('name'));
  const name = nameOverride || t.userName;
  const setName = (v) => { setNameOverride(null); setTweak('userName', v); };

  // navigation helpers
  const goTab = (tab) => setRoute({ type: 'tab', tab });
  const goSub = (sub, params = {}) => setRoute({ type: 'sub', sub, ...params });
  const back = () => {
    if (route.type === 'sub' && route.parentTab) goTab(route.parentTab);
    else goTab(t.startScreen);
  };

  const startCreateNatal = () => goSub('natalCreate', { parentTab: route.tab || 'horoscope' });
  const finishCreateNatal = (n) => {
    setName(n);
    setHasNatal(true);
    goTab('natal');
  };

  const tab = route.type === 'tab' ? route.tab : null;
  const __embed = __params.has('embed');

  return (
    <div className={__embed ? 'stage stage--embed' : 'stage'}>
      <div className="phone-wrap" style={__embed ? { transform: 'none' } : { transform: `scale(${scale})` }}>
      <div className={__embed ? 'phone phone--embed' : 'phone'}>
        <div className="phone-screen">
          <Starfield count={t.starCount} seed={3}/>

          {showWelcome && (
            <WelcomeScreen onContinue={() => { setShowWelcome(false); setShowNatalPromo(true); }}/>
          )}

          {!showWelcome && showNatalPromo && (
            <NatalPromoScreen
              onCreate={() => { setShowNatalPromo(false); goSub('natalCreate', { parentTab: 'horoscope' }); }}
              onSkip={() => setShowNatalPromo(false)}/>
          )}

          {!showWelcome && !showNatalPromo && (
            <>
              <StatusBar/>

              {route.type === 'tab' && tab === 'horoscope' && (
                <div className="page">
                  <HoroscopeScreen
                    hasNatal={hasNatal}
                    name={name}
                    selectedSign={hasNatal ? null : selectedSign}
                    onPickSign={(id) => setSelectedSign(id)}
                    onChangeSign={() => { setPickerMode('own'); setShowSignPicker(true); }}
                    onCreateNatal={startCreateNatal}
                    onOpenPeriod={(p) => goSub('forecast', { period: p, parentTab: 'horoscope', sign: selectedSign })}
                    onOpenJournal={() => goSub('journal', { parentTab: 'horoscope' })}
                    onOpenSynastry={() => goSub('synastry', { parentTab: 'horoscope' })}
                    onOpenOtherSign={() => { setPickerMode('other'); setShowSignPicker(true); }}/>
                </div>
              )}

              {route.type === 'tab' && tab === 'natal' && (
                <div className="page">
                  {hasNatal
                    ? <NatalChartScreen name={name} onRecreate={startCreateNatal}/>
                    : <NatalEmptyScreen onCreate={startCreateNatal}/>}
                </div>
              )}

              {route.type === 'tab' && tab === 'days' && (
                <div className="page">
                  <CalendarScreen hasNatal={hasNatal}/>
                </div>
              )}

              {route.type === 'tab' && tab === 'oracle' && (
                <div className="page">
                  <OracleHomeScreen
                    onPickCard={() => goSub('cardOfDay', { parentTab: 'oracle' })}
                    onSpread={() => goSub('spread', { parentTab: 'oracle' })}/>
                </div>
              )}

              {route.type === 'tab' && tab === 'profile' && (
                <div className="page">
                  <ProfileScreen
                    name={name} hasNatal={hasNatal}
                    onResetWelcome={() => setShowWelcome(true)}
                    onToggleNatal={() => hasNatal ? setHasNatal(false) : startCreateNatal()}/>
                </div>
              )}

              {/* Sub-screens (use full page area — they have their own header) */}
              {route.type === 'sub' && (
                <div className="page full">
                  {route.sub === 'forecast' && (
                    <ForecastScreen
                      period={route.period} sign={otherSign || route.sign || selectedSign}
                      name={name} hasNatal={hasNatal && !otherSign}
                      onBack={() => { setOtherSign(null); back(); }}/>
                  )}
                  {route.sub === 'journal' && (
                    <MoonJournalScreen
                      entries={journalEntries}
                      onSave={(e) => setJournalEntries([...journalEntries, e])}
                      onBack={back}
                      onHistory={() => setRoute({ type: 'sub', sub: 'journalHistory', parentTab: route.parentTab })}/>
                  )}
                  {route.sub === 'journalHistory' && (
                    <JournalHistoryScreen entries={journalEntries}
                      onBack={() => setRoute({ type: 'sub', sub: 'journal', parentTab: route.parentTab })}/>
                  )}
                  {route.sub === 'synastry' && (
                    <SynastryScreen onBack={back}/>
                  )}
                  {route.sub === 'cardOfDay' && (
                    <CardOfDayScreen onBack={back}/>
                  )}
                  {route.sub === 'spread' && (
                    <SpreadScreen onBack={back}/>
                  )}
                  {route.sub === 'natalCreate' && (
                    <NatalCreateScreen name={name} onBack={back} onCreate={finishCreateNatal}/>
                  )}
                </div>
              )}

              {showSignPicker && (
                <SignPickerSheet
                  current={pickerMode === 'own' ? selectedSign : otherSign}
                  title={pickerMode === 'own' ? 'Выбери знак' : 'Прогноз для какого знака?'}
                  onPick={(id) => {
                    if (pickerMode === 'own') setSelectedSign(id);
                    else {
                      setOtherSign(id);
                      goSub('forecast', { period: 'day', parentTab: 'horoscope', sign: id });
                    }
                  }}
                  onClose={() => setShowSignPicker(false)}/>
              )}

              <BottomNav active={tab || route.parentTab || 'horoscope'} onChange={(id) => {
                setOtherSign(null);
                goTab(id);
              }}/>
            </>
          )}
        </div>
      </div>

      </div>

      <TweaksPanel>
        <TweakSection title="Запуск">
          <TweakButton onClick={() => setShowWelcome(true)}>Показать Welcome</TweakButton>
          <TweakButton onClick={() => setShowNatalPromo(true)}>Показать промо натала</TweakButton>
        </TweakSection>
        <TweakSection title="Профиль">
          <TweakToggle label="Натальная карта создана" value={t.hasNatal} onChange={v => setTweak('hasNatal', v)}/>
          <TweakText label="Имя" value={t.userName} onChange={v => setTweak('userName', v)}/>
          <TweakSelect label="Знак (без натала)" value={t.selectedSign}
            options={SIGNS.map(s => [s.id, `${s.sym}  ${s.full}`])}
            onChange={v => setTweak('selectedSign', v)}/>
        </TweakSection>
        <TweakSection title="Атмосфера">
          <TweakSlider label="Звёзды на фоне" value={t.starCount} min={0} max={80} step={2}
            onChange={v => setTweak('starCount', v)}/>
        </TweakSection>
        <TweakSection title="Быстрая навигация">
          <TweakButton onClick={() => goSub('forecast', { period: 'day', parentTab: 'horoscope', sign: selectedSign })}>Прогноз на день</TweakButton>
          <TweakButton onClick={() => goSub('forecast', { period: 'week', parentTab: 'horoscope', sign: selectedSign })}>Прогноз на неделю</TweakButton>
          <TweakButton onClick={() => goSub('forecast', { period: 'month', parentTab: 'horoscope', sign: selectedSign })}>Прогноз на месяц</TweakButton>
          <TweakButton onClick={() => goSub('journal', { parentTab: 'horoscope' })}>Лунный дневник</TweakButton>
          <TweakButton onClick={() => setRoute({ type: 'sub', sub: 'journalHistory', parentTab: 'horoscope' })}>История дневника</TweakButton>
          <TweakButton onClick={() => goSub('synastry', { parentTab: 'horoscope' })}>Совместимость</TweakButton>
          <TweakButton onClick={() => goSub('cardOfDay', { parentTab: 'oracle' })}>Карта дня</TweakButton>
          <TweakButton onClick={() => goSub('spread', { parentTab: 'oracle' })}>Расклад на 3 карты</TweakButton>
          <TweakButton onClick={() => goSub('natalCreate', { parentTab: 'natal' })}>Создание натала</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
