import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Brand
        className="app-name text-uppercase ms-4 me-4"
        href="/"
        style={{ fontFamily: "Montserrat", color: "#ccc" }}
      >
        <span className="pe-4">Cat of the day</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ps-4 me-auto">
          <Nav.Link>Vote</Nav.Link>
          <Nav.Link as={Link} to="/upload-cat">
            Upload your cat
          </Nav.Link>
          <Nav.Link>Rules</Nav.Link>
        </Nav>
        <Nav className="ms-auto me-4">
          {user.token ? (
            <>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/logout">
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
