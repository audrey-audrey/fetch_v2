import { Route, Switch } from "react-router";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MapContainer from "./components/MapContainer";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          Homepage!
          <MapContainer />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
