import React from "react";
import { useState } from "react";
import axios from "axios";
import { Input, Button, Icon, Container, Image } from "semantic-ui-react";
import history from "../history";
import dogpile from "../images/dogpile.png";

// import Button from "./Button";

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

        history.push("/");
      })
      .catch((err) => {
        setState({ errorMessage: err.message });
      });
  };

  return (
    <Container>
      <Image size='medium' src={ dogpile } circular floated='right'/>
        <div className="login-container">

        <h1>Join the Fun! Sign Up Now!</h1>
        <form action="/login" method="POST" onSubmit={handleSubmit}>
          {state.errorMessage && (
            <h3 className="error">
              Oops! That email already exists. Try again.
            </h3>
          )}
          <br/>
          <div className="email-credential">
            <label htmlFor="email">Email: </label>
            <Input
              type="text"
              id="email"
              required
              name="email"
              placeholder="Please enter email"
              onChange={(event) => {
                setState({ ...state, email: event.target.value });
              }}
            />
          </div>
          <br/>
          <div className="password-credential">
            <label htmlFor="password">Password: </label>
            <Input
              type="text"
              id="password"
              required
              name="password"
              placeholder="Please enter password"
              onChange={(event) => {
                setState({ ...state, password: event.target.value });
              }}
            />
          </div>
          <br/>
          <div className="password-credential">
            <label htmlFor="password-confirm">Confirm Password: </label>
            <Input
              type="text"
              id="password-confirm"
              required
              name="password-confirm"
              placeholder="Please enter password again"
              onChange={(event) => {
                setState({ ...state, passwordConfirm: event.target.value });
              }}
            />
          </div>
          <br/>
          <Button type="submit" icon>
            <Icon name="paw"></Icon> Sign Up
          </Button>
        </form>
      </div>
      </Container>
  );
}
