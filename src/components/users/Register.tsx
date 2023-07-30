import { useContext } from "react";
import { HOST_URL } from "../common/urls";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { checkObjForProfanity } from "../../utils/profanity";

const PARTICIPANT_PATH = "/uploader/register";
const VOTER_PATH = "/voter/register";

interface RegisterInfo {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  as_participant?: boolean;
}

const initialRegisterState: RegisterInfo = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  as_participant: false,
};

const EMAIL_REGEX: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX: RegExp = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;

const validateNames = (value: string) =>
  value.length > 2 && value.length < 256
    ? null
    : "The name have to be between 3 and 255 chars!";
const validateEmail = (value: string) =>
  EMAIL_REGEX.test(value) ? null : "Please, enter valid email!";
const validatePassword = (value: string) =>
  PASSWORD_REGEX.test(value)
    ? null
    : "Password must be at least 6 characters long and include at least 1 capital letter and 1 digit!";

const Register: React.FC = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const postUser = (values: RegisterInfo) => {
    const path = values.as_participant ? PARTICIPANT_PATH : VOTER_PATH;
    delete values.as_participant;
    fetch(`${HOST_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 201) {
          alert("error!");
        }
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

  const handleOnSubmit = (values: RegisterInfo) => {
    if (checkObjForProfanity(values)) return;
    postUser(values);
  };

  return (
    <div className="text-center" data-testid="q-da-vidim">
      <Form
        onSubmit={handleOnSubmit}
        initialValues={initialRegisterState}
        render={({ handleSubmit, submitting, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <article>
              <Field
                data-testid="first_name"
                name="first_name"
                component="input"
                type="text"
                placeholder="First Name"
                validate={validateNames}
              />
              {errors?.first_name && touched?.first_name && (
                <p className="text-danger">{errors?.first_name}</p>
              )}
            </article>

            <label>Last Name</label>
            <article>
              <Field
                data-testid="last_name"
                name="last_name"
                component="input"
                type="text"
                placeholder="Last Name"
                validate={validateNames}
              />
              {errors?.last_name && touched?.last_name && (
                <p className="text-danger">{errors?.last_name}</p>
              )}
            </article>

            <label>Email</label>
            <article>
              <Field
                data-testid="email"
                name="email"
                component="input"
                type="email"
                placeholder="Enter email"
                validate={validateEmail}
              />
              {errors?.email && touched?.email && (
                <p className="text-danger">{errors?.email}</p>
              )}
            </article>

            <label>Password</label>
            <article>
              <Field
                data-testid="password"
                name="password"
                component="input"
                type="password"
                placeholder="Enter password"
                validate={validatePassword}
              />
              {errors?.password && touched?.password && (
                <p className="text-danger">{errors?.password}</p>
              )}
            </article>

            <label>Register as participant</label>
            <article>
              <Field name="as_participant" component="input" type="checkbox" />
            </article>

            <button
              type="submit"
              disabled={submitting}
              data-testid="submit-button"
            >
              Submit
            </button>
          </form>
        )}
      />
    </div>
  );
};

export default Register;
