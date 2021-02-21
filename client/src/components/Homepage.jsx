import React from "react";
import { Link } from "react-router-dom";
import { Container, Image, Button } from "semantic-ui-react";
import ella from "../images/ella.png";
import logo from "../images/icons/logo.svg";

import "./Homepage.scss";

export default function Homepage(props) {
  return (
    <Container textAlign="center">
      <Image src={logo} centered />
      <Image src={ella} circular centered />
      <Button.Group color="orange" size="massive">
        <Button as={Link} to="/login">
          Log In
        </Button>
        <Button.Or />
        <Button as={Link} to="/register">
          Sign Up
        </Button>
      </Button.Group>
    </Container>
  );
}
