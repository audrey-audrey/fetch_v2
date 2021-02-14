import React from "react";
import { Router } from "react-router";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import history from "./history";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
