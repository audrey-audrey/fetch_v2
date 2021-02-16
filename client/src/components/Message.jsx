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
    user_info: [],
  });
  const [message, setMessage] = useState("");
  const conversation_id = useLocation().pathname.split("/")[2];
  useEffect(() => {
    const params = { conversation_id: conversation_id, user_id: 1 }; //useLocation + localStorage
    axios
      .get(`/api/conversations/${params.conversation_id}/messages`, { params })
      .then((res) => {
        setState({
          messages: res.data.messages,
          user_info: res.data.user_info,
        });
      });
    setLoading(false);
  }, []);

  const displayMessages = function () {
    const arr = [];
    if (!loading) {
      for (const item of state.user_info) {
        arr.push(
          <li key={item.id}>
            <h4>{item.name}</h4>
            <p>{item.content}</p>
          </li>
        );
      }
    }
    return arr.reverse();
  };

  const messages = displayMessages();

  const handleSubmit = function (event) {
    event.preventDefault();
    console.log(message);
  };

  return (
    <div>
      Messages
      <div>{loading ? <span>Loading</span> : <ul>{messages}</ul>}</div>
      <form action="/messages" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="message">New Message:</label>
        <input
          type="text"
          id="message"
          name="message"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
