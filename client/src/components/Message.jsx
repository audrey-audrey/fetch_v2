import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import history from "../history";
import { Comment, Icon, Segment, Button } from "semantic-ui-react";
import Moment from "react-moment";
import Loading from "./Loading";

import "./Message.scss";

export default function Message(props) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    messages: [],
    user_info: [],
  });
  const [message, setMessage] = useState("");
  const conversation_id = useLocation().pathname.split("/")[2];
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    const params = { conversation_id: conversation_id, user_id: user_id }; //useLocation + localStorage
    axios
      .get(`/api/conversations/${params.conversation_id}/messages`, { params })
      .then((res) => {
        console.log(res.data);
        setState({
          user_info: res.data.user_info,
        });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const displayMessages = function () {
    const arr = [];

    if (!loading) {
      for (const item of state.user_info) {
        arr.push(
          // <div key={item.id}>
          //   <h5>
          //     {item.user.name}
          //     {"                         "}
          //     <small className="message-date">
          //       {new Date(item.created_at).toDateString()}
          //     </small>
          //   </h5>
          //   <p>{item.content}</p>
          // </div>
          <Comment.Group>
            <Comment>
              <Comment.Avatar
                src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${
                  item.user.name.split(" ")[0]
                }+${item.user.name.split(" ")[1]}`}
              />
              <Comment.Content>
                <Comment.Author>{item.user.name}</Comment.Author>
                <Comment.Metadata>
                  <Moment fromNow>{new Date(item.created_at)}</Moment>
                </Comment.Metadata>
                <Comment.Text>{item.content}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        );
      }
    }
    return arr;
  };

  const messages = displayMessages();

  const handleSubmit = function (event) {
    // const name = state.user_info[1].name;
    event.preventDefault();
    const params = {
      content: message,
      conversation_id: conversation_id,
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .post(`/api/conversations/${conversation_id}/messages/`, params)
      .then((res) => {
        setState((state) => ({
          ...state,
          user_info: [...state.user_info, res.data],
        }));
      })
      .catch((e) => console.log(e));
  };

  const timeSince = function (time) {};

  return (
    <div className="container" id="message-container">
      <h1>Messages</h1>
      <Segment className="message-container">
        {loading ? <Loading /> : <div>{messages}</div>}
      </Segment>
      <form className="new-message" onSubmit={handleSubmit}>
        <label htmlFor="message">New Message:</label>
        <input
          rows="1"
          columns="50"
          wrap="physical"
          className="input-group-text"
          type="text"
          id="message"
          name="message"
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <Button className="btn btn-primary" type="submit" color="orange">
          <Icon name="send"/>
          Send Message
        </Button>
      </form>
    </div>
  );
}
