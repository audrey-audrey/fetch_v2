import { React, useState, useEffect, useLocation } from "react";
import axios from "axios";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { Image, Icon } from "semantic-ui-react";

import "./App.css";
import history from "./history";
import Login from "./components/Login";
import Register from "./components/Register";
// import Profile from "./components/Profile";
import Conversations from "./components/Conversations";
import Message from "./components/Message";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Favourites from "./components/Favourites";
import MapContainer from "./components/MapContainer";
import Homepage from "./components/Homepage";

import { slide as Menu } from "react-burger-menu";

import appLogo from "./images/icons/logo.png";

import "./BurgerMenu.css";

import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State
  const [state, setState] = useState({
    users: [],
    user: {},
    unreads: 0,
  });

  // setStates
  const setUsers = (users) => setState((prev) => ({ ...prev, users }));
  const setUser = (user) => setState((prev) => ({ ...prev, user }));
  const setUnreads = (unreads) => setState((prev) => ({ ...prev, unreads }));

  // fetch users data from backend
  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);
  useEffect(() => {
    const params = { id: localStorage.getItem("user_id") };
    axios.get(`/api/conversations`, { params }).then((res) => {
      let unreads = 0;
      for (const item of res.data.total_unreads) {
        if (item.read === false) {
          unreads += 1;
        }
      }
      setUnreads(unreads);
    });
  }, []);
  const handleLogout = function (event) {
    localStorage.removeItem("user_id");

    history.push("/");
    window.location.reload();
  };

  // fetch current user data
  useEffect(() => {
    const currentUserId = localStorage.getItem("user_id");
    axios.get(`/api/users/${currentUserId}`).then((res) => {
      setUser(res.data[0]);
    });
  }, []);

  return (
    <div id="outer-container">
      {localStorage.getItem("user_id") ? (
        <Menu
          reveal
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        >
          <Image id="profile-img" src={state.user.primary_image} avatar />
          <Link
            id="profile"
            className="menu-item"
            to={`/user/${localStorage.getItem("user_id")}`}
          >
            <Icon name="user" />
            Profile
          </Link>
          <Link id="conversations" className="menu-item" to="/conversations">
            <Icon name="mail outline" />
            Conversations <small>{state.unreads}</small>
          </Link>
          <Link id="favorites" className="menu-item" to="/favourites">
            <Icon name="favorite" />
            Favourites
          </Link>
          <Link
            id="logout"
            className="menu-item"
            onClick={handleLogout}
            to="/homepage"
          >
            <Icon name="log out" />
            Logout
          </Link>
        </Menu>
      ) : null}
      <main id="page-wrap">
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
            <Route path="/messages/:id">
              <Message />
            </Route>
            <Route path="/conversations">
              <Conversations />
            </Route>
            <Route path="/favourites">
              <Favourites />
            </Route>
            <Route path="/">
              Homepage!
              {localStorage.getItem("user_id") ? (
                <MapContainer users={state.users} user={state.user} />
              ) : (
                <Homepage />
              )}
            </Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

export default App;
