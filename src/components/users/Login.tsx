import { useContext, useState } from "react";
import { Form, Button, Container, Row, Col, FormGroup } from "react-bootstrap";
import { HOST_URL } from "../common/urls";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import FormGroupRow from "../common/FormGroupRow";
import { Field } from "../../types/types";

const PARTICIPANT_PATH = "/uploader/login";
const VOTER_PATH = "/voter/login";

interface Credentials {
  email: string;
  password: string;
  [key: string]: string;
}

const initialCredentialsState: Credentials = {
  password: "",
  email: "",
};

const loginFields: Array<Field> = [
  {
    controlId: "formBasicEmail",
    labelText: "Email address",
    inputPlaceholder: "Enter email",
    inputType: "email",
    inputName: "email",
  },
  {
    controlId: "formBasicPassword",
    labelText: "Password",
    inputPlaceholder: "Enter password",
    inputType: "password",
    inputName: "password",
  },
];

const LoginVoter: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>(
    initialCredentialsState
  );
  const [isParticipant, setIsParticipant] = useState<boolean>(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const login = () => {
    const path = isParticipant ? PARTICIPANT_PATH : VOTER_PATH
    fetch(`${HOST_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((json) => {
        console.log(json);
        if (json.token) {
          localStorage.setItem("user", JSON.stringify(json));
          setUser(json);
          navigate("/");
        }
      });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  const handleOnAsParticipantChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsParticipant(e.target.checked);
  };

  return (
    <Container className="mt-4 mb-4 pt-4 pb-4 bg-secondary">
      <Row className="justify-content-center text-center">
        <Col md={6}>
          <Form onSubmit={handleOnSubmit}>
            <h3 className="text-center text-black mb-4">Login</h3>

            {loginFields.map((lf: Field) => (
              <FormGroupRow
                key={`key-${lf.controlId}`}
                controlId={lf.controlId}
                labelText={lf.labelText}
                inputType={lf.inputType}
                inputPlaceholder={lf.inputPlaceholder}
                inputValue={credentials[lf.inputName]}
                inputName={lf.inputName}
                handleOnChange={handleOnChange}
              />
            ))}

            
            <FormGroup controlId="isParticipant">
              <Form.Label className="text-black">Login as participant</Form.Label>
              <Form.Check
                type="checkbox"
                name="isParticipant"
                checked={isParticipant}
                onChange={handleOnAsParticipantChange}
              />
            </FormGroup>

            <Button className="w-100 mt-4" variant="dark" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginVoter;
