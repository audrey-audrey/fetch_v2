import React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { Input, Button, Icon } from "semantic-ui-react";
import history from "../history";

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
    <Router>
      <div className="login-container">
        <form action="/login" method="POST" onSubmit={handleSubmit}>
          {state.errorMessage && (
            <h3 className="error">
              Oops! That email already exists. Try again.
            </h3>
          )}
          <div className="email-credential">
            <label htmlFor="email">Email</label>
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
          <div className="password-credential">
            <label htmlFor="password">Password</label>
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
          <div className="password-credential">
            <label htmlFor="password-confirm">Confirm Password</label>
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
          <Button type="submit" icon>
            <Icon name="paw"></Icon> Sign Up
          </Button>
        </form>
      </div>
    </Router>
  );
}
