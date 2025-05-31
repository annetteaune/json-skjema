import React, { useState } from "react";
import type { Schema, Step } from "../types/schema";
import { TextField } from "./fields/TextField";
import { DropdownField } from "./fields/DropdownField";
import { TextareaField } from "./fields/TextAreaField";
import { CheckboxField } from "./fields/CheckboxField";
import { CheckboxesField } from "./fields/CheckboxesField";
import { RadioButtonField } from "./fields/RadioButtonField";

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
          <div>
            <TextareaField
              id={step.id}
              label={step.label}
              value={formData[step.id] || ""}
              placeholder={step.placeholder}
              required={step.required}
              onChange={(value) => handleChange(step.id, value)}
            />
            {step.fields?.map((field) => (
              <div key={field.id}>
                {field.type === "checkbox" ? (
                  <CheckboxField
                    id={field.id}
                    label={field.label}
                    checked={formData[field.id] || false}
                    required={field.required}
                    onChange={(checked) => handleChange(field.id, checked)}
                  />
                ) : null}
              </div>
            ))}
          </div>
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
      case "checkboxes":
        return (
          <CheckboxesField
            id={step.id}
            label={step.label}
            options={step.options || []}
            value={formData[step.id] || []}
            required={step.required}
            onChange={(val) => handleChange(step.id, val)}
          />
        );
      case "radio":
        return (
          <RadioButtonField
            id={step.id}
            label={step.label}
            options={step.options || []}
            value={formData[step.id] || ""}
            required={step.required}
            onChange={(val) => handleChange(step.id, val)}
            conditionalFields={step.conditionalFields}
            conditionalValues={formData}
            onConditionalChange={(id, val) => handleChange(id, val)}
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

  const goToNextStep = () => setStepIndex((i) => i + 1);
  const goToPrevStep = () => setStepIndex((i) => i - 1);
  const nextStep = schema.steps[stepIndex + 1];
  let showNextConditional = false;
  if (
    nextStep &&
    nextStep.conditional &&
    formData[nextStep.conditional.field] === nextStep.conditional.value
  ) {
    showNextConditional = true;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="skjema-wiz">
      {renderField(currentStep)}
      {showNextConditional && renderField(nextStep)}
      <div className="skjema-wiz-buttons">
        {stepIndex > 0 && (
          <button
            type="button"
            className="btn tilbake-btn"
            onClick={goToPrevStep}
          >
            Tilbake
          </button>
        )}
        {stepIndex < schema.steps.length - 1 ? (
          <button
            type="button"
            className="btn neste-btn"
            onClick={goToNextStep}
          >
            Neste
          </button>
        ) : (
          <button
            type="submit"
            className="btn submit-btn"
            onClick={() => console.log("Submit", formData)}
          >
            Send inn
          </button>
        )}
      </div>
    </form>
  );
};
