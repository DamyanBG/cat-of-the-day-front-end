import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-primary text-light mt-auto pb-4 pt-2">
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <h4>About Us</h4>
          <p>We are a group of developers passionate about creating great software.</p>
        </Col>
        <Col xs={12} md={4}>
          <h4>Contact Us</h4>
          <p>Email: inspirationalcode@gmail.com</p>
          <p>Phone: 123-456-7890</p>
        </Col>
        <Col xs={12} md={4}>
          <h4>Follow Us</h4>
          <p>Twitter: @example</p>
          <p>Facebook: /example</p>
          <p>Instagram: @example</p>
        </Col>
      </Row>
      <hr />
      <p className="text-center">&copy; 2023 Cat of the day app</p>
    </Container>
  </footer>
);

export default Footer;