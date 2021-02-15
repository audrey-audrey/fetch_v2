import React from "react";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import history from "../history";

import Button from "./Button";

import "./Login.css";

export default function Conversations(props) {
  const getConversations = function () {
    const current_user = { id: localStorage.getItem("token") };
    axios
      .get("/api/conversations", current_user)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <Router>
      <div></div>
    </Router>
  );
}
