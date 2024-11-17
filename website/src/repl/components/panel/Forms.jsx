import cx from '@src/cx.mjs';
import { useRef, useEffect, useCallback, useId } from 'react';

export function Checkbox({ label, value, onChange, disabled = false }) {
  return (
    <label>
      <input disabled={disabled} type="checkbox" checked={value} onChange={onChange} />
      {' ' + label}
    </label>
  );
}

export function NumberSlider({ value, onChange, step = 1, ...rest }) {
  return (
    <div className="flex space-x-2 gap-1">
      <input
        className="p-2 grow"
        type="range"
        value={value}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        {...rest}
      />
      <input
        type="number"
        value={value}
        step={step}
        className="w-16 bg-background rounded-md"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function ButtonGroup({ label, value, onChange, items }) {
  const id = useId();

  const groupRef = useRef();

  const focusKey = useCallback((key) => {
    if (groupRef.current) {
      groupRef.current.querySelector(`[data-key=${key}]`)?.focus();
    }
  }, []);

  useEffect(() => {
    let itemKeys = Object.keys(items);

    const keypressHandler = (event) => {
      let change;

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        change = -1;
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        change = 1;
      }

      if (change) {
        let newKey = itemKeys[(itemKeys.indexOf(value) + change + itemKeys.length) % itemKeys.length];
        focusKey(newKey);
        onChange(newKey);
        event.preventDefault();
      }
    };

    groupRef.current?.addEventListener('keydown', keypressHandler);

    return () => {
      groupRef.current?.removeEventListener('keydown', keypressHandler);
    };
  }, [items, value]);

  return (
    <>
      <label
        id={id}
        onClick={() => {
          focusKey(value);
        }}
      >
        {label}
      </label>
      <div role="radiogroup" ref={groupRef} aria-labelledby={id} className="flex max-w-lg">
        {Object.entries(items).map(([key, label], i, arr) => (
          <button
            role="radio"
            key={key}
            data-key={key}
            onClick={() => onChange(key)}
            tabIndex={value === key ? 0 : -1}
            aria-checked={value === key}
            className={cx(
              'px-2 border-b h-8 whitespace-nowrap',
              // i === 0 && 'rounded-l-md',
              // i === arr.length - 1 && 'rounded-r-md',
              // value === key ? 'bg-background' : 'bg-lineHighlight',
              value === key ? 'border-foreground' : 'border-transparent',
              'focus:border-transparent focus:ring-blue-500 focus:ring-2 focus:outline-none',
            )}
          >
            {label.toLowerCase()}
          </button>
        ))}
      </div>
    </>
  );
}

//      label: string, value: ?ID, options: Map<ID, any>, onChange: ID => null, onClick: event => void, isDisabled: boolean
export function SelectInput({ label, value, options, onChange, onClick, isDisabled, message }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className=" flex flex-col gap-1">
        <select
          id={id}
          disabled={isDisabled}
          onClick={onClick}
          className="p-2 bg-background rounded-md text-foreground"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.size == 0 && <option value={value}>{`${value ?? 'select an option'}`}</option>}
          {Object.entries(options).map(([k, label]) => (
            <option key={k} className="bg-background" value={k}>
              {label}
            </option>
          ))}
        </select>
        {message}
      </div>
    </>
  );
}
