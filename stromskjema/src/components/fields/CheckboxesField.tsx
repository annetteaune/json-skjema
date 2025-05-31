import React from "react";

interface Props {
  id: string;
  label: string;
  options: string[];
  value: string[];
  required?: boolean;
  onChange: (value: string[]) => void;
}

export const CheckboxesField: React.FC<Props> = ({
  id,
  label,
  options,
  value,
  required,
  onChange,
}) => {
  const handleChange = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="checkboxes-field">
      <label>
        {label}
        {required}
      </label>
      <div className="checkboxes-field-options">
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              name={id}
              value={option}
              checked={value.includes(option)}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};
