import { Container, Card } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="mb-4 pt-4 pb-4 bg-secondary">
      <Card className="my-5 p-5">
        <Card.Title>Welcome to Cat of the day!</Card.Title>
        <Card.Text>A plaform for real cat lovers!</Card.Text>
      </Card>
    </Container>
  );
};

export default HomePage;
