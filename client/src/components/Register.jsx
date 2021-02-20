import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Icon,
  Container,
  Image,
  Header,
  Form,
} from "semantic-ui-react";
import history from "../history";
import dogpile from "../images/dogpile.png";
import logo from "../images/icons/logo.png";
import "./Register.css";

export default function Register(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    errorMessage: "",
  });

  const handleSubmit = function (event) {
    event.preventDefault();
    if (state.password !== state.passwordConfirm) {
      console.log("Passwords do not match");
      return;
    }
    const params = {
      email: state.email,
      password: state.password,
    };

    return axios
      .post(`/api/register`, params)
      .then((res) => {
        if (res.status !== 200) {
          return;
        }
        history.push("/profile");
      })
      .catch((err) => {
        setState({ errorMessage: err.message });
      });
  };

  return (
    <Container>
      <Image src={logo} size="medium" className="logo" />
      <Image size="medium" src={dogpile} circular floated="right" />
      <div className="login-container">
        <Header as="h1">
          Join the Pack!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        </Header>
        <Header as="h3">Sign Up Here: </Header>
        <Form
          action="/login"
          method="POST"
          onSubmit={handleSubmit}
          widths="equal"
        >
          {state.errorMessage && (
            <Header as="h4" className="error">
              Oops! That email already exists. Try again.
            </Header>
          )}
          <div className="email-credential">
            <Form.Field>
              <label htmlFor="email">Email: </label>
              <Form.Input
                type="text"
                id="email"
                name="email"
                required
                placeholder="Please enter email"
                onChange={(event) => {
                  setState({ ...state, email: event.target.value });
                }}
              />
            </Form.Field>
          </div>
          <div className="password-credential">
            <Form.Field>
              <label htmlFor="password">Password: </label>
              <Form.Input
                type="password"
                id="password"
                required
                name="password"
                placeholder="Please enter password"
                onChange={(event) => {
                  setState({ ...state, password: event.target.value });
                }}
              />
            </Form.Field>
          </div>
          <div className="password-credential">
            <Form.Field>
              <label htmlFor="password-confirm">Confirm Password: </label>
              <Form.Input
                type="password"
                id="password-confirm"
                required
                name="password-confirm"
                placeholder="Please enter password again"
                onChange={(event) => {
                  setState({ ...state, passwordConfirm: event.target.value });
                }}
              />
            </Form.Field>
          </div>
          <Button type="submit" icon icon color="orange">
            <Icon name="paw"></Icon> Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
}
