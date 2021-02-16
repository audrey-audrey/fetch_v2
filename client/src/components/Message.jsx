import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import history from "../history";

import "./Login.css";

import Button from "./Button";

export default function Message(props) {
  const [state, setState] = useState({
    messages: [],
  });
  useEffect(() => {
    const params = { conversation_id: 2, user_id: 1 };
    axios
      .get(`/api/conversations/${params.conversation_id}/messages`, { params })
      .then((res) => {
        setState({ messages: res.data });
      });
  }, []);

  const displayMessages;

  return <div>Message</div>;
}
