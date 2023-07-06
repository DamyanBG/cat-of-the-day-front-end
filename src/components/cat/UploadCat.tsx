import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import FormGroupRow from "../common/FormGroupRow";
import { HOST_URL } from "../common/urls";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CatExistsContext } from "../context/CatExistsContext";
import NonLoggedInMessage from "../common/NonLoggedInMessage";

interface CatInfo {
    name: string;
    passport_id: string;
    microchip_id: string;
    photo: string;
    breed: string;
}

interface CatPostData extends CatInfo {
  uploader_pk: number | undefined
}

const initialCatInfoState: CatInfo = {
    name: "",
    passport_id: "",
    microchip_id: "",
    photo: "",
    breed: ""
}

const UploadCat: React.FC = () => {
  const [catInfo, setCatInfo] = useState<CatInfo>(initialCatInfoState);
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const { user } = useContext(UserContext)
  const { setCatExists } = useContext(CatExistsContext)
  const navigate = useNavigate()

  const postCat = () => {
    setIsUploading(true)
    const catPostData: CatPostData = {
      ...catInfo,
      uploader_pk: user.user_pk
    }
    fetch(`${HOST_URL}/cat`, {
      method: "POST",
      body: JSON.stringify(catPostData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error()
        }
        return resp.json()
      })
      .then(json => {
        console.log(json)
        setCatExists(true)
        localStorage.setItem("catExist", "true");
        navigate("/cat-review")
      })
      .catch(() => alert("Problem occured during uploading the photo!"))
      .finally(() => setIsUploading(false))
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "photo") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCatInfo({
            ...catInfo,
            [e.target.name]: reader.result as string,
          });
        };
        if (e.target.files) {
          reader.readAsDataURL(e.target.files[0]);
        }
      } else {
        setCatInfo({
          ...catInfo,
          [e.target.name]: e.target.value,
        });
      }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postCat();
  };

  return (
    user.token ? (
      <Container className="mt-4 mb-4 pt-4 pb-4 bg-secondary">
      <Row className="justify-content-center text-center">
        <Col md={6}>
          <Form onSubmit={handleOnSubmit}>
            <h3 className="text-center text-black mb-4">Add a New Cat</h3>

            {/* Cat name field */}
            <FormGroupRow
              controlId="catName"
              labelText="Cat Name"
              inputType="text"
              inputPlaceholder="Enter cat name"
              inputValue={catInfo.name}
              inputName="name"
              handleOnChange={handleOnChange}
            />

            {/* Cat name field */}
            <FormGroupRow
              controlId="catBreed"
              labelText="Cat Breed"
              inputType="text"
              inputPlaceholder="Enter cat breed"
              inputValue={catInfo.breed}
              inputName="breed"
              handleOnChange={handleOnChange}
            />

            {/* Cat passport id field */}
            <FormGroupRow
              controlId="catPassportId"
              labelText="Passport ID"
              inputType="text"
              inputPlaceholder="Enter cat passport ID"
              inputValue={catInfo.passport_id}
              inputName="passport_id"
              handleOnChange={handleOnChange}
            />

            {/* Cat microchip id field */}
            <FormGroupRow
              controlId="catMicrochipId"
              labelText="Microchip ID"
              inputType="text"
              inputPlaceholder="Enter cat microchip ID"
              inputValue={catInfo.microchip_id}
              inputName="microchip_id"
              handleOnChange={handleOnChange}
            />

            {/* Photo upload field */}
            <Form.Group controlId="photo">
              <Form.Label className="text-black">Photo</Form.Label>
              <Form.Control
                type="file"
                placeholder="Choose a photo"
                name="photo"
                onChange={handleOnChange}
                as="input"
              />
            </Form.Group>

            <Button disabled={isUploading} className="w-100 mt-4" variant="dark" type="submit">
              Add Cat
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    ) : (
      <NonLoggedInMessage />
    )
  );
};

export default UploadCat;
