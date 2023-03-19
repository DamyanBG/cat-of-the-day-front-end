import React from 'react'
import { Form } from "react-bootstrap";
import { InputType } from '../../types/types';

type Props = {
  controlId: string,
  labelText: string,
  inputType: InputType,
  inputPlaceholder: string,
  inputValue: string,
  inputName: string,
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormGroupRow: React.FC<Props> = ({
  controlId,
  labelText,
  inputType,
  inputPlaceholder,
  inputValue,
  inputName,
  handleOnChange,
}) => (
  <Form.Group controlId={controlId}>
    <Form.Label className="text-black">{labelText}</Form.Label>
    <Form.Control
      type={inputType}
      placeholder={inputPlaceholder}
      value={inputValue || ""}
      name={inputName}
      onChange={handleOnChange}
      as="input"
    />
  </Form.Group>
);

export default FormGroupRow;
