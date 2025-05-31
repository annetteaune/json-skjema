import React from "react";

interface Props {
  id: string;
  label: string;
  checked: boolean;
  required?: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxField: React.FC<Props> = ({
  id,
  label,
  checked,
  required,
  onChange,
}) => (
  <div className="checkbox-field">
    <label htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        required={required}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  </div>
);
