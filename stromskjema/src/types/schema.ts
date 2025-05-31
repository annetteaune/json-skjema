export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "dropdown"
  | "textarea"
  | "checkbox"
  | "group"
  | "auto-address";

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

export interface GroupField extends BaseField {
  type: "group" | "auto-address";
  fields: Field[];
}

export type Field =
  | TextField
  | OptionField
  | TextareaField
  | CheckboxField
  | GroupField;

export interface Step {
  id: string;
  type: FieldType; // Simplified - removed the union since FieldType now includes group and auto-address
  label: string;
  fields?: Field[]; // for group/auto-address
  options?: string[]; // for dropdown
  placeholder?: string; // for textarea
  required?: boolean;
}

export interface Schema {
  formType: string;
  steps: Step[];
}
