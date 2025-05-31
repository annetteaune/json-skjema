import React from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export const TextareaField: React.FC<Props> = ({
  id,
  label,
  value,
  placeholder,
  required,
  onChange,
}) => (
  <div className="textarea-field">
    <label htmlFor={id}>{label}</label>
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
