import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import history from "../history";

import "./Login.css";

import Button from "./Button";

export default function Message(props) {
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  }, []);

  const displayMessages = function () {
    if (!loading) {
      for (const item of state.messages) {
        if (item.content) {
          return (
            <li>
              <h4>{item.user_id}</h4>
              <p>{item.content}</p>
            </li>
          );
        }
      }
    }
  };

  const messages = displayMessages();

  return (
    <div>
      Messages
      <div>{loading ? <span>Loading</span> : <ul>{messages}</ul>}</div>
    </div>
  );
}
