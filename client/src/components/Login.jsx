import React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import history from "../history";

import Button from "./Button";

import "./Login.css";

export default function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });



  const handleSubmit = function (event) {
    event.preventDefault();
    // if (state.username === "" || state.password === "") {
    //   console.log("Missing username or password"); //Change later
    //   return;
    // }
    const params = { username: state.username, password: state.password };
    console.log(params);    
    localStorage.setItem('token', 'hi'); // <-- adds navbar

    history.push("/");
    window.location.reload()
    // return axios.post(`/api/login`, params).then((res) => {
    //   if (res.data.code === 200) {
    //     <Redirect to="/login" />;
    //   } else {
    //     return;
    //   }
    // });


  };
  //CSS content : instead of having : on label

  return (
    <Router>
      <div className="login-container">
        <form action="/login" method="POST" onSubmit={handleSubmit}>
          <div className="login-credential">
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
          <button type="submit">Login</button>
        </form>
      </div>
    </Router>
  );
}
