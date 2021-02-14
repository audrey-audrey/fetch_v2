import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import axios from "axios";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import MapContainer from "./components/MapContainer";

function App() {
  const [ state, setState ] = useState({
    users: []
  });

  // setState for users
  const setUsers = users => setState(prev => ({...prev, users}));

  useEffect(() => {
    axios.get('api/users')
    .then(res => setUsers(res.data))
  },[])

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
          <MapContainer users={state.users}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
