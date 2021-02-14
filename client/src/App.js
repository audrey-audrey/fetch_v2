import { Route, Switch } from "react-router";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import history from "./history";

import { slide as Menu } from "react-burger-menu";

import "./BurgerMenu.css";

function App() {
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/user">
            <Profile />
          </Route>
          <Route path="/">Homepage!</Route>
        </Switch>
      </div>

    </div>
  );
}

export default App;
