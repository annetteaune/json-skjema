interface Props {
  id: string;
  label: string;
  value: string;
  options: string[];
  required?: boolean;
  onChange: (value: string) => void;
}

export const DropdownField: React.FC<Props> = ({
  id,
  label,
  value,
  options,
  required,
  onChange,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">-- Velg --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
