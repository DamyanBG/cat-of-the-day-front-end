export type InputType = "text" | "password" | "number" | "email" | "file";

export interface Field {
  controlId: string;
  labelText: string;
  inputPlaceholder: string;
  inputType: InputType;
  inputName: string;
}
