import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import history from "../history";
import { Comment, Icon, Message, Button } from "semantic-ui-react";

import "./Conversations.scss";

export default function Conversations(props) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    conversations: [],
    initiators: [],
    recipients: [],
  });

  useEffect(() => {
    const params = { id: localStorage.getItem("user_id") };
    axios.get(`/api/conversations`, { params }).then((res) => {
      setState({
        conversations: res.data.conversations,
        initiators: res.data.initiators,
        recipients: res.data.recipients,
        unreads: res.data.unreads,
      });
    });
    setLoading(false);
  }, []);

  let filterRecipients = function (arr) {
    const myId = Number(localStorage.getItem("user_id"));
    return arr.filter(
      (item) => item.recipient_id !== myId && item.initiator_id === myId
    );
  };

  let filterInitiators = function (arr) {
    const myId = Number(localStorage.getItem("user_id"));
    return arr.filter(
      (item) => item.initiator_id !== myId && item.recipient_id === myId
    );
  };

  const findUnreads = function (conversation_id) {
    for (const item of state.unreads) {
      if (conversation_id === item.conversation_id) {
        return item.unread;
      }
    }
  };

  const handleClick = function (conversation_id) {
    history.push(`/messages/${conversation_id}`);
  };

  const displayRecipients = function () {
    const arr = [];
    if (!loading) {
      let filteredRecipients = filterRecipients(state.recipients);
      for (const item of filteredRecipients) {
        for (const convo of state.conversations) {
          if (
            item.recipient_id === convo.recipient_id &&
            item.initiator_id === convo.initiator_id
          ) {
            arr.push(
              <Button
                fluid
                className="conversation-item"
                onClick={() => handleClick(convo.id)}
              >
                <span className="conversation-name">{item.name}</span>
                <span className="unreads">
                  {findUnreads(convo.id) ? findUnreads(convo.id) : 0}
                </span>
              </Button>
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
          if (
            item.recipient_id === convo.recipient_id &&
            item.initiator_id === convo.initiator_id
          ) {
            arr.push(
              <Button
                fluid
                className="conversation-item"
                onClick={() => handleClick(convo.id)}
              >
                <span className="conversation-name">{item.name}</span>
                <span className="unreads">
                  {findUnreads(convo.id) ? findUnreads(convo.id) : 0}
                </span>
              </Button>
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
    <div className="conversation-container">
      <h1>Conversations</h1>
      {loading ? (
        <span>Loading</span>
      ) : (
        <div>
          {recipients}
          {initiators}
        </div>
      )}
    </div>
  );
}
