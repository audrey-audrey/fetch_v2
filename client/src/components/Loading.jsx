import React, { useState, useEffect, forceUpdate } from "react";
import axios from "axios";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import history from "../history";
import { Comment, Icon, Segment } from "semantic-ui-react";
import Moment from "react-moment";

import loading from "../images/paws-animation.gif";

export default function Loading(props) {
  return (
    <div>
      <img src={loading} alt="loading..." />
    </div>
  );
}
