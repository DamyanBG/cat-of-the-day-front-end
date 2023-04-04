import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const Rules = () => {
  return (
    <Container className="mt-4 mb-4 pt-4 pb-4 bg-secondary">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h2>Rules!!!</h2>
            </Card.Header>
            <Card.Body>
              <p>Here are the rules:</p>
              <ListGroup>
                <ListGroup.Item>
                  The cat of the day is the cat that received the most likes
                  excluding dislikes from the previous day!
                </ListGroup.Item>
                <ListGroup.Item>
                  When you upload a cat, voting for it starts from the next day,
                  ensuring that every cat has equal time for voting!
                </ListGroup.Item>
                <ListGroup.Item>
                  Only registered participants can upload cats, and they must
                  accept the terms and conditions before being able to
                  participate in the game!
                </ListGroup.Item>
                <ListGroup.Item>
                  Once a cat is uploaded, the information cannot be changed!
                </ListGroup.Item>
                <ListGroup.Item>
                  The voting is reset every day, and a new round of voting
                  begins!
                </ListGroup.Item>
                <ListGroup.Item>
                  For now there is no prize for the winners, 
                  but in future we are thinking to have!
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Rules;
