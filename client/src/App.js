import { React, useState, useEffect } from 'react';
import axios from 'axios'
import { Route, Switch } from "react-router";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
// import Profile from "./components/Profile";
import history from "./history";
import MapContainer from "./components/MapContainer";
import Homepage from "./components/Homepage"

import { slide as Menu } from "react-burger-menu";

import "./BurgerMenu.css";

import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  // State
  const [ state, setState ] = useState({
    users: []
  });

  // setState for users
  const setUsers = users => setState(prev => ({...prev, users}));

  // fetch users data from backend
  useEffect(() => {
    axios.get('api/users')
    .then(res => setUsers(res.data))
  },[])

  const handleLogout = function (event) {
    localStorage.removeItem('token') 

    history.push('/')
    window.location.reload()
  };

  return (
    <div>
      { localStorage.getItem('token') ? (
        <Menu noOverlay>

          <img id="profile-img" src="https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png" />

          <a id="profile" className="menu-item" href="/profile">
            Profile
          </a>
          <a id="messages" className="menu-item" href="/messages">
            About
          </a>
          <a id="favorites" className="menu-item" href="/favorites">
            Contact
          </a>
          <a id="logout" className="menu-item" onClick={handleLogout}>
            logout
          </a>
        </Menu>
      ) : null }

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
          <Route path="/user">
            {/* <Profile /> */}
          </Route>
          <Route path="/">
            Homepage!
            <MapContainer users={state.users}/>
          </Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
