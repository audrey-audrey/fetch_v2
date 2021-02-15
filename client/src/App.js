import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import history from "./history";
import Login from "./components/Login";
import Register from "./components/Register";
// import Profile from "./components/Profile";
import Conversations from "./components/Conversations";
import Message from "./components/Message";

import { slide as Menu } from "react-burger-menu";

import "./BurgerMenu.css";

function App() {
  const handleLogout = function (event) {
    localStorage.removeItem("token");

    history.push("/");
    window.location.reload();
  };

  return (
    <div>
      {localStorage.getItem("token") ? (
        <Menu noOverlay>
          <img
            id="profile-img"
            src="https://cdn2.iconfinder.com/data/icons/4web-3/139/header-account-image-line-512.png"
          />

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
      ) : null}

      <Router>
        <div className="main-component">
          <Switch>
            <Route exact path="/">
              Homepage!
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/user">{/* <Profile /> */}</Route>
            <Route path="/conversations">
              <Conversations />
            </Route>
            <Route path="/messages/:id">
              <Message />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
