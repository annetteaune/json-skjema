import React from "react";
import { TextField } from "./TextField";

interface ConditionalField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  showIf: { value: string };
}

interface Props {
  id: string;
  label: string;
  options: string[];
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
  conditionalFields?: ConditionalField[];
  conditionalValues?: Record<string, any>;
  onConditionalChange?: (id: string, value: any) => void;
}

export const RadioButtonField: React.FC<Props> = ({
  id,
  label,
  options,
  value,
  required,
  onChange,
  conditionalFields = [],
  conditionalValues = {},
  onConditionalChange = () => {},
}) => (
  <div className="radio-field">
    <label>
      {label}
      {required}
    </label>
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={id}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            required={required}
          />
          {option}
        </label>
      ))}
    </div>
    {conditionalFields
      .filter((f) => value === f.showIf.value)
      .map((f) => (
        <div key={f.id}>
          {f.type === "text" && (
            <TextField
              id={f.id}
              label={f.label}
              value={conditionalValues[f.id] || ""}
              required={f.required}
              placeholder={f.placeholder}
              onChange={(val) => onConditionalChange(f.id, val)}
            />
          )}
        </div>
      ))}
  </div>
);
