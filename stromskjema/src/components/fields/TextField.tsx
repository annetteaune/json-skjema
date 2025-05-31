import React from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const TextField: React.FC<Props> = ({
  id,
  label,
  value,
  required,
  placeholder,
  onChange,
}) => {
  return (
    <div className="text-field">
      <label htmlFor={id}> {label}</label>
      <input
        id={id}
        type="text"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
