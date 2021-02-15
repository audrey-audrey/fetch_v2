import React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { Input, Button, Icon } from "semantic-ui-react";
import history from "../history";

// import Button from "./Button";

import "./Login.css";

export default function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    errorMessage: "",
  });

  const handleSubmit = function (event) {
    event.preventDefault();

    const params = { email: state.email, password: state.password };

    return axios
      .post(`/api/login`, params)
      .then((res) => {
        if (state.email !== res.data[0].email) {
          return;
        }
        localStorage.setItem("token", "hi"); // <-- adds navbar
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        setState({ errorMessage: err.message });
      });
  };
  //CSS content : instead of having : on label

  return (
    <Router>
      <div className="login-container">
        <p>Log In To Find New Friends!</p>
        <form action="/login" method="POST" onSubmit={handleSubmit}>
          {state.errorMessage && (
            <h3 className="error">
              Oops! That email does not exist. Try again.
            </h3>
          )}
          <div className="login-credential">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              id="email"
              name="email"
              required
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
          <Button type="submit" icon>
            <Icon name="paw"></Icon> Login
          </Button>
        </form>
      </div>
    </Router>
  );
}
