import React from "react";
import { Link } from "react-router-dom";
import { Container, Image, Button } from "semantic-ui-react";
import ella from "../images/ella.png";

// import Button from "./Button";

export default function Homepage(props) {
  return (
    <Container textAlign="center">
      <Image width="50%" height="50%" src={ella} circular centered />
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
  );
}
