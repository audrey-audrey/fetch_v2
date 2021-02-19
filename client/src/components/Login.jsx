import React from "react";
import { useState } from "react";
import axios from "axios";
import { Input, Button, Icon, Container, Image, Header } from "semantic-ui-react";
import history from "../history";
import rupert from "../images/rupert.png";

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
        console.log(res);
        if (state.email !== res.data[0].email) {
          return;
        }
        localStorage.setItem("user_id", res.data[0].id); // <-- adds navbar
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        setState({ errorMessage: err.message });
      });
  };
  //CSS content : instead of having : on label

  return (
    <Container>
      <Image size="medium" src={rupert} circular floated="right" />
      <div className="login-container">
        <Header as='h1'>You're Going to Have a Ball!</Header>
        <Header as='h3'>Log In Here: </Header>
        <form action="/login" method="POST" onSubmit={handleSubmit}>
          {state.errorMessage && (
            <Header as="h4" className="error">Oops! We haven't met you yet. Sign up or Try again!</Header>
            // <h3 className="error">
            //   Oops! We haven't met you yet. Sign up or Try again!
            // </h3>
          )}
          <br />
          <div className="login-credential">
            <label htmlFor="email">Email: </label>
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
          <br />
          <div className="password-credential">
            <label htmlFor="password">Password: </label>
            <Input
              type="password"
              id="password"
              required
              name="password"
              placeholder="Please enter password"
              onChange={(event) => {
                setState({ ...state, password: event.target.value });
              }}
            />
          </div>
          <br />
          <Button type="submit" icon>
            <Icon name="paw"></Icon> Login
          </Button>
        </form>
      </div>
    </Container>
  );
}
