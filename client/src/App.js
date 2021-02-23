import { React, useState, useEffect } from "react";
import axios from "axios";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";
import { Image, Icon, Label } from "semantic-ui-react";

import "./App.scss";
import history from "./history";
import Login from "./components/Login";
import Register from "./components/Register";
import Conversations from "./components/Conversations";
import Message from "./components/Message";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Favourites from "./components/Favourites";
import MapContainer from "./components/MapContainer";
import Homepage from "./components/Homepage";
import Loading from "./components/Loading";

import appLogo from "./images/icons/logo.svg";

import { slide as Menu } from "react-burger-menu";
import "./BurgerMenu.css";

import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // State
  const [state, setState] = useState({
    users: [],
    user: {},
    unreads: 1,
    menuOpen: false,
  });
  const [loading, setLoading] = useState(true);

  // setStates
  const setUsers = (users) => setState((prev) => ({ ...prev, users }));
  const setUser = (user) => setState((prev) => ({ ...prev, user }));
  const setUnreads = (unreads) => setState((prev) => ({ ...prev, unreads }));
  const closeMenu = () => setState((prev) => ({ ...prev, menuOpen: false }));
  const handleStateChange = () =>
    setState((prev) => ({ ...prev, menuOpen: state.isOpen }));

  // fetch users data from backend
  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
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
    const currentUserId = localStorage.getItem("user_id");
    axios.get(`/api/users/${currentUserId}`).then((res) => {
      setUser(res.data[0]);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, [state]);

  const handleLogout = function (event) {
    localStorage.removeItem("user_id");

    history.push("/homepage");
    window.location.reload();
  };

  // fetch current user data

  return (
    <div className="App">
      {localStorage.getItem("user_id") ? (
        <>
          <div className="logo-top">
            <Link to="/">
              <img
                src={appLogo}
                // onClick={closeMenu}
              />
            </Link>
          </div>
          <Menu
            pageWrapId={"page-wrap"}
            outerContainerId={"App"}
            isOpen={state.menuOpen}
            onStateChange={handleStateChange}
          >
            <div className="menu-profile">
              <Image id="profile-img" src={state.user.primary_image} avatar />
              <p id="profile-name">{state.user.name}</p>
            </div>
            <Link id="map" className="menu-item" to="/" onClick={closeMenu}>
              <Icon name="globe" />
              Back to Map
            </Link>
            <Link
              id="profile"
              className="menu-item"
              to={`/user/1`}
              onClick={() => {
                closeMenu();
                history.push("/user/1");
                window.location.reload();
              }}
            >
              <Icon name="user" />
              Profile
            </Link>
            <Link
              id="conversations"
              className="menu-item"
              to="/conversations"
              onClick={closeMenu}
            >
              <Icon name="mail" />
              <span>Conversations {state.unreads > 0 && state.unreads}</span>
            </Link>
            <Link
              id="favorites"
              className="menu-item"
              to="/favourites"
              onClick={closeMenu}
            >
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
        </>
      ) : null}
      <div id="page-wrap">
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
          <Route exact path="/user/1">
            <Profile />
          </Route>
          <Route path="/user/:id" children={<Profile />}>
            <Profile />
          </Route>
          <Route path="/edit-user">
            <EditProfile user={state.user} />
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
            {loading ? (
              <div className="loading-container">
                <Loading />
              </div>
            ) : localStorage.getItem("user_id") ? (
              <MapContainer users={state.users} user={state.user} />
            ) : (
              <div>failed to load</div>
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
