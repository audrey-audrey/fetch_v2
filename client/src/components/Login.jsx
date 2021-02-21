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
import rupert from "../images/rupert.png";
import logo from "../images/icons/logo.svg";
import Loading from "./Loading";

import "./Login.css";

export default function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    errorMessage: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = function (event) {
    event.preventDefault();
    setLoading(true);

    const params = { email: state.email, password: state.password };
    return axios
      .post(`/api/login`, params)
      .then((res) => {
        if (state.email !== res.data[0].email) {
          return;
        }
        localStorage.setItem("user_id", res.data[0].id); // <-- adds navbar
        setTimeout(() => {
          history.push("/");
          window.location.reload();
        }, 4000);
      })
      .catch((err) => {
        setState({ errorMessage: err.message });
        setLoading(false);
      });
  };
  //CSS content : instead of having : on label

  return (
    <Container>
      {loading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <div>
          <Image src={logo} size="medium" className="logo" />
          <Image size="medium" src={rupert} circular floated="right" />
          <div className="login-container">
            <Header as="h1">You're Going to Have a Ball!</Header>
            <Header as="h3">Log In Here: </Header>
            <Form action="/login" method="POST" onSubmit={handleSubmit}>
              {state.errorMessage && (
                <Header as="h4" className="error">
                  Oops! We haven't met you yet. Sign up or Try again!
                </Header>
              )}
              <div className="login-credential">
                <Form.Field>
                  <label htmlFor="email">Email: </label>
                  <Form.Input
                    type="text"
                    id="email"
                    name="email"
                    required
                    placeholder="Please enter email"
                    width="10"
                    onChange={(event) => {
                      setState({ ...state, email: event.target.value });
                    }}
                  />
                </Form.Field>
              </div>
              <br />
              <div className="password-credential">
                <Form.Field>
                  <label htmlFor="password">Password: </label>
                  <Form.Input
                    type="password"
                    id="password"
                    required
                    name="password"
                    placeholder="Please enter password"
                    width="10"
                    onChange={(event) => {
                      setState({ ...state, password: event.target.value });
                    }}
                  />
                </Form.Field>
              </div>
              <br />
              <Button type="submit" icon color="orange">
                <Icon name="paw"></Icon> Login
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Container>
  );
}
