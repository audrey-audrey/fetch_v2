import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Container, Image, Button } from "semantic-ui-react";
import ellaMed from "../images/ellaMed.png"


// import Button from "./Button";

export default function Homepage(props) {
  return (
    <Router>
      <Container textAlign='center'>
        <Image
          src={ellaMed}
          circular
          // size='large'
          fluid
        />
        <Button.Group>
          <Button size="huge" as={Link} to="/login">
            Log In
          </Button>
          <Button.Or />
          <Button size="huge" as={Link} to="/register">
            Sign Up
          </Button>
        </Button.Group>
      </Container>
    </Router>
  );
}
