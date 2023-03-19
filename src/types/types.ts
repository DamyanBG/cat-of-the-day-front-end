export type InputType = "text" | "password" | "number" | "email";

export interface Field {
  controlId: string;
  labelText: string;
  inputPlaceholder: string;
  inputType: InputType;
  inputName: string;
}
