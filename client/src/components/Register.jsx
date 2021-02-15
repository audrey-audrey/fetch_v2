import React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import history from "../history";

import Button from "./Button";

export default function Register(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
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
    console.log(params);
    
    return axios.post(`/api/register`, params).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
       history.push("/"); 
      } else {
        return;
      }
    }).catch((err) => {throw err});
  };

  return (
    <Router>
      <div className="login-container">
        <form action="/login" method="POST" onSubmit={handleSubmit}>
          {/* <div className="login-credential">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Please enter username"
              onChange={(event) => {
                setState({ ...state, username: event.target.value });
              }}
            />
          </div> */}
          <div className="email-credential">
            <label htmlFor="email">Email</label>
            <input
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
            <input
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
            <input
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
          <button type="submit">Register</button>
        </form>
      </div>
    </Router>
  );
}
