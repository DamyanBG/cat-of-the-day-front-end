import { Container, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { HOST_URL } from "../common/urls";

const CatOfTheDayComponent = () => {
  const [photoUrl, setPhotoUrl] = useState()

  const getCatOfTheDayPhoto = () => {
    fetch(`${HOST_URL}/cat-of-the-day-photo`)
      .then((resp) => resp.json())
      .then((json) => setPhotoUrl(json))
  }

  useEffect(getCatOfTheDayPhoto, [])

  return (
    <Card className="p-5" style={{ background: "linear-gradient(40deg, #2096ff, #05ffa3)" }}>
      <Card.Title>The cat of the day!</Card.Title>
      <Card.Img src={photoUrl} alt="Cat of the day!" width="100%" />
    </Card>
  )

} 

const HomePage = () => {
  return (
    <Container className="mb-4 pt-4 pb-4 bg-secondary">
      <Card className="my-5 p-5">
        <Card.Title>Welcome to Cat of the day!</Card.Title>
        <Card.Text>A plaform for real cat lovers!</Card.Text>
      </Card>
      <CatOfTheDayComponent />
    </Container>
  );
};

export default HomePage;
