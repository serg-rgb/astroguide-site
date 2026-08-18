/* Minimal production replacements for the prototype editor controls. */
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((keyOrEdits, value) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits
      : { [keyOrEdits]: value };
    setValues((previous) => ({ ...previous, ...edits }));
  }, []);
  return [values, setTweak];
}

function TweaksPanel() { return null; }
function TweakSection() { return null; }
function TweakSlider() { return null; }
function TweakToggle() { return null; }
function TweakSelect() { return null; }
function TweakText() { return null; }
function TweakButton() { return null; }
