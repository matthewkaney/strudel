import { useId } from 'react';
//      label: string, value: ?ID, options: Map<ID, any>, onChange: ID => null, onClick: event => void, isDisabled: boolean
export function SelectInput({ label, value, options, onChange, onClick, isDisabled }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        disabled={isDisabled}
        onClick={onClick}
        className="p-2 bg-background rounded-md text-foreground"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.size == 0 && <option value={value}>{`${value ?? 'select an option'}`}</option>}
        {Array.from(options.keys()).map((id) => (
          <option key={id} className="bg-background" value={id}>
            {options.get(id)}
          </option>
        ))}
      </select>
    </>
  );
}
