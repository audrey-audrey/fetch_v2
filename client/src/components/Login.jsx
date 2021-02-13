import React from "react";
import { useState } from "react";

import Button from "./Button";

export default function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = { username: state.username, password: state.password };
    console.log(params);
  };

  return (
    <div>
      Login
      <form>
        <label for="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Please enter username"
          onChange={(event) => {
            setState({ ...state, username: event.target.value });
          }}
        />
        <br></br>
        <label for="password">Password:</label>
        <input
          type="text"
          name="password"
          placeholder="Please enter password"
          onChange={(event) => {
            setState({ ...state, password: event.target.value });
          }}
        />
        <br></br>
        <Button onClick={(event) => handleSubmit(event)}>Login</Button>
      </form>
    </div>
  );
}
