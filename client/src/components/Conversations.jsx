import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
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
    const myId = Number(localStorage.getItem("user_id"));
    return arr.filter((item) => item.recipient_id !== myId);
  };

  let filterInitiators = function (arr) {
    const myId = Number(localStorage.getItem("user_id"));
    return arr.filter((item) => item.initiator_id !== myId);
  };

  const displayRecipients = function () {
    const arr = [];
    if (!loading) {
      let filteredRecipients = filterRecipients(state.recipients);
      for (const item of filteredRecipients) {
        for (const convo of state.conversations) {
          if (item.recipient_id === convo.recipient_id) {
            arr.push(
              <li>
                <Link to={`/messages/${convo.id}`}>{item.name}</Link>
              </li>
            );
          }
        }
      }
    }
    return arr;
  };

  const displayInitiators = function () {
    const arr = [];
    if (!loading) {
      let filteredInitiators = filterInitiators(state.initiators);
      for (const item of filteredInitiators) {
        for (const convo of state.conversations) {
          if (item.initiator_id === convo.initiator_id) {
            const path = `/messages/${convo.id}`;
            arr.push(
              <li>
                <Link to={`/messages/${convo.id}`}>{item.name}</Link>
              </li>
            );
          }
        }
      }
    }
    return arr;
  };

  let recipients = displayRecipients();
  let initiators = displayInitiators();
  return (
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
  );
}
