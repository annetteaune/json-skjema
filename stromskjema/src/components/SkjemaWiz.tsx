import React, { useState } from "react";
import type { Schema, Step } from "../types/schema";
import { TextField } from "./fields/TextField";
import { DropdownField } from "./fields/DropdownField";
import { TextareaField } from "./fields/TextAreaField";
import { CheckboxField } from "./fields/CheckboxField";

interface Props {
  schema: Schema;
}

export const SkjemaWiz: React.FC<Props> = ({ schema }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const currentStep: Step = schema.steps[stepIndex];

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const renderField = (step: Step) => {
    switch (step.type) {
      case "text":
      case "email":
      case "tel":
        return (
          <TextField
            id={step.id}
            label={step.label}
            value={formData[step.id] || ""}
            required={step.required}
            onChange={(value) => handleChange(step.id, value)}
          />
        );
      case "dropdown":
        return (
          <DropdownField
            id={step.id}
            label={step.label}
            value={formData[step.id] || ""}
            options={step.options || []}
            required={step.required}
            onChange={(val) => handleChange(step.id, val)}
          />
        );
      case "textarea":
        return (
          <TextareaField
            id={step.id}
            label={step.label}
            value={formData[step.id] || ""}
            placeholder={step.placeholder}
            required={step.required}
            onChange={(value) => handleChange(step.id, value)}
          />
        );
      case "checkbox":
        return (
          <CheckboxField
            id={step.id}
            label={step.label}
            checked={formData[step.id] || false}
            required={step.required}
            onChange={(checked) => handleChange(step.id, checked)}
          />
        );

      case "group":
      case "auto-address":
        return (
          <div>
            <h3>{step.label}</h3>
            {step.fields?.map((field) => (
              <div key={field.id}>
                {field.type === "text" ||
                field.type === "email" ||
                field.type === "tel" ? (
                  <TextField
                    id={field.id}
                    label={field.label}
                    value={formData[field.id] || ""}
                    required={field.required}
                    onChange={(value) => handleChange(field.id, value)}
                  />
                ) : field.type === "dropdown" && "options" in field ? (
                  <DropdownField
                    id={field.id}
                    label={field.label}
                    value={formData[field.id] || ""}
                    options={field.options || []}
                    required={field.required}
                    onChange={(val) => handleChange(field.id, val)}
                  />
                ) : null}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const nextStep = () => setStepIndex((i) => i + 1);
  const prevStep = () => setStepIndex((i) => i - 1);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {renderField(currentStep)}
      <div>
        {stepIndex > 0 && (
          <button type="button" onClick={prevStep}>
            Tilbake
          </button>
        )}
        {stepIndex < schema.steps.length - 1 ? (
          <button type="button" onClick={nextStep}>
            Neste
          </button>
        ) : (
          <button type="submit" onClick={() => console.log("Submit", formData)}>
            Send inn
          </button>
        )}
      </div>
    </form>
  );
};
