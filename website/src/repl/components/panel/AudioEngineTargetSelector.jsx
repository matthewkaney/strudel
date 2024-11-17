import { audioEngineTargets } from '../../../settings.mjs';
import { SelectInput } from './Forms';

// Allows the user to select an audio interface for Strudel to play through
export function AudioEngineTargetSelector({ target, onChange, isDisabled }) {
  const onTargetChange = (target) => {
    onChange(target);
  };
  const options = {
    [audioEngineTargets.webaudio]: audioEngineTargets.webaudio,
    [audioEngineTargets.osc]: audioEngineTargets.osc,
  };
  return (
    <SelectInput
      label="Audio Engine Target"
      isDisabled={isDisabled}
      options={options}
      value={target}
      onChange={onTargetChange}
      message={
        target === audioEngineTargets.osc && (
          <div>
            <p className="text-sm italic">
              ⚠ All events routed to OSC, audio is silenced! See{' '}
              <a className="text-blue-500" href="https://strudel.cc/learn/input-output/">
                Docs
              </a>
            </p>
          </div>
        )
      }
    />
  );
}
