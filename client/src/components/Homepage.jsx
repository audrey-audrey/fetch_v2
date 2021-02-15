import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, BrowserRouter as Router } from "react-router-dom";
import history from "../history";
import { Container, Image, Button } from "semantic-ui-react";


// import Button from "./Button";

export default function Homepage(props) {
  return (
    <Router>
      <Container textAlign='center'>
        <Image
          src="https://thehappypuppysite.com/wp-content/uploads/2019/02/Australian-Shepherd-Temperament-long.jpg"
          circular
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
