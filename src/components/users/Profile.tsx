import React, { useContext, useState } from "react";
import { HOST_URL } from "../common/urls";
import { UserContext } from "../context/UserContext";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import FormGroupRow from "../common/FormGroupRow";

interface ProfileInfo {
  first_name: string;
  last_name: string;
}

const profileInfoInitState = {
  first_name: "",
  last_name: "",
};

const Profile: React.FC = () => {
  const [profileInfo, setProfileInfo] =
    useState<ProfileInfo>(profileInfoInitState);
  const [isChangingInfo, setIsChangingInfo] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const getProfileInfo = () => {
    fetch(`${HOST_URL}/user-info`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((resp) => resp.json())
      .then((json) => setProfileInfo(json));
  };

  const handleOnProfileInfoClick = () => {
    setIsChangingInfo(true)
    getProfileInfo();
  };

  const handleOnProfileInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnProfileInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsChangingInfo(false)
  };

  return (
    <div>
      <h1>Profile</h1>
      <h3>On that page you can edit your profile</h3>
      <section className="mt-4 mb-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOnProfileInfoClick}
        >
          Change profile information
        </button>
        {isChangingInfo && (
          <Container className="mt-4 mb-4 pt-4 pb-4 bg-secondary">
            <Form onSubmit={handleOnProfileInfoSubmit}>
              <h4>Change your profile info!</h4>
              <FormGroupRow
                controlId="firstName"
                labelText="First Name"
                inputType="text"
                inputPlaceholder="Enter your first name"
                inputValue={profileInfo.first_name}
                inputName="first_name"
                handleOnChange={handleOnProfileInfoChange}
              />
              <FormGroupRow
                controlId="lastName"
                labelText="Last Name"
                inputType="text"
                inputPlaceholder="Enter your last name"
                inputValue={profileInfo.last_name}
                inputName="last_name"
                handleOnChange={handleOnProfileInfoChange}
              />
              <Button className="w-100 mt-4" variant="dark" type="submit">
                Save info
              </Button>
            </Form>
          </Container>
        )}
      </section>
      <section className="mb-4">
        <button type="button" className="btn btn-primary">
          Become voter/participant
        </button>
      </section>
      <section className="mb-4">
        <button type="button" className="btn btn-primary">
          Change password
        </button>
      </section>
    </div>
  );
};

export default Profile;
