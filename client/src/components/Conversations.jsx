import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import history from "../history";

import "./Login.css";

import Button from "./Button";

export default function Conversations(props) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    conversations: [],
    initiators: [],
    recipients: [],
  });

  useEffect(() => {
    const params = { id: 1 };
    axios.get(`/api/conversations`, { params }).then((res) => {
      console.log(res);
      setState({
        conversations: res.data.conversations,
        initiators: res.data.initiators,
        recipients: res.data.recipients,
      });
    });
    setLoading(false);
  }, []);

  let filterRecipients = function (arr) {
    let myId = 1;
    return arr.filter((item) => item.id !== myId);
  };

  let filterInitiators = function (arr) {
    let myId = 1;
    return arr.filter((item) => item.id !== myId);
  };

  const displayRecipients = function () {
    if (!loading) {
      let filteredRecipients = filterRecipients(state.recipients);
      for (const item of filteredRecipients) {
        return <li>{item.name}</li>;
      }
    }
  };

  const displayInitiators = function () {
    if (!loading) {
      let filteredInitiators = filterInitiators(state.initiators);
      for (const item of filteredInitiators) {
        return <li>{item.name}</li>;
      }
    }
  };

  let recipients = displayRecipients();
  let initiators = displayInitiators();
  return (
    <Router>
      <div>
        Conversations
        <div>
          {loading ? (
            <span>Loading</span>
          ) : (
            <ul>
              {recipients}
              {initiators}
            </ul>
          )}
        </div>
      </div>
    </Router>
  );
}
