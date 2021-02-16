import { React, useState, useEffect } from "react";
import axios from "axios";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Favourites from "./components/Favourites";

import history from "./history";
import MapContainer from "./components/MapContainer";
import Homepage from "./components/Homepage";

import { slide as Menu } from "react-burger-menu";

import "./BurgerMenu.css";

import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State
  const [state, setState] = useState({
    users: [],
    user: {}
  });

  // setState for users
  const setUsers = (users) => setState((prev) => ({ ...prev, users }));

  // fetch users data from backend
  useEffect(() => {
    axios.get("api/users")
    .then((res) => setUsers(res.data));
  }, []);

  const handleLogout = function (event) {
    localStorage.removeItem("user_id");

    history.push("/");
    window.location.reload();
  };

  const user_id = { user_id: localStorage.getItem('user_id') };

  // fetch current user data
  useEffect(() => {
    axios.get(`api/users/${user_id}`)
    .then((res) => console.log(res))
  }, [localStorage])

  return (
    <div>
      {localStorage.getItem("user_id") ? (
        <Menu noOverlay>
          <img
            id="profile-img"
            src="https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png"
          />
          <Link id="profile" className="menu-item" to={`/user/${localStorage.getItem('user_id')}`}>
            Profile
          </Link>

          <Link id="messages" className="menu-item" to="/messages">
            Messages
          </Link>
          <Link id="favorites" className="menu-item" to="/favourites">
            Favourties
          </Link>
          <Link id="logout" className="menu-item" onClick={handleLogout}>
            Logout
          </Link>
        </Menu>
      ) : null}
      {/* <Router> */}
      <div className="main-component">
        <Switch>
          <Route path="/homepage">
            <Homepage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/user/:id">
            <Profile />
          </Route>
          <Route path="/edit-user">
            <EditProfile />
          </Route>
          <Route path="/favourites">
            <Favourites />
          </Route>
          <Route path="/">
            Homepage!
            <MapContainer users={state.users} />
          </Route>
        </Switch>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default App;
