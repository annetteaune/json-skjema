import React from "react";

interface Props {
  id: string;
  label: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export const TextField: React.FC<Props> = ({
  id,
  label,
  value,
  required,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id}> {label}</label>
      <input
        id={id}
        type="text"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
