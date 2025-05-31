export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "dropdown"
  | "textarea"
  | "checkbox"
  | "group"
  | "auto-address"
  | "checkboxes"
  | "radio";

export interface BaseField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
}

export interface OptionField extends BaseField {
  type: "dropdown";
  options: string[];
}

export interface TextField extends BaseField {
  type: "text" | "email" | "tel";
  auto?: boolean;
}

export interface TextareaField extends BaseField {
  type: "textarea";
  placeholder?: string;
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
}

export interface CheckboxesField extends BaseField {
  type: "checkboxes";
  options: string[];
}

export interface GroupField extends BaseField {
  type: "group" | "auto-address";
  fields: Field[];
}

export interface ConditionalField extends BaseField {
  showIf: { value: string };
  placeholder?: string;
}

export interface RadioField extends BaseField {
  type: "radio";
  options: string[];
  conditionalFields?: ConditionalField[];
}

export type Field =
  | TextField
  | OptionField
  | TextareaField
  | CheckboxField
  | CheckboxesField
  | GroupField
  | RadioField
  | ConditionalField;

export interface Step {
  id: string;
  type: FieldType;
  label: string;
  fields?: Field[];
  options?: string[];
  placeholder?: string;
  required?: boolean;
  conditional?: {
    field: string;
    value: string;
  };
  conditionalFields?: ConditionalField[];
}

export interface Schema {
  formType: string;
  steps: Step[];
}
