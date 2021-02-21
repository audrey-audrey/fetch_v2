import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import history from "../history";
import { Comment, Icon, Segment } from "semantic-ui-react";
import Moment from "react-moment";

import loading from "../images/paws-animation.gif";
import "./Loading.scss";

export default function Loading(props) {
  return (
    <div className="loading-item">
      <h1 className="loading-title">Fetching your floofy friends!</h1>
      <img src={loading} alt="loading..." />
    </div>
  );
}
