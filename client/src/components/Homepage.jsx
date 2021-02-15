import React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import history from "../history";
import { Container, Image, Button, Link, Icon } from "semantic-ui-react";

// import Button from "./Button";

export default function Homepage(props) {
  return (
    <Router>
      <Container textAlign='center'>
        <Image
          src="https://thehappypuppysite.com/wp-content/uploads/2019/02/Australian-Shepherd-Temperament-long.jpg"
          // size="large"
          circular
          fluid
        />
        <Button.Group>
          <Button size="huge">
            Log In
          </Button>
          <Button.Or />
          <Button size="huge">
            Sign Up
          </Button>
        </Button.Group>
      </Container>
    </Router>
  );
}
