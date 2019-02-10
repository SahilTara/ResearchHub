import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NewStudy from "./components/NewStudy";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/newstudy" Component={NewStudy} />
      </Switch>
    );
  }
}

export default App;

{
  /* <Switch>
<Route exact path="/" Component={Login} />
<Route path="/dashboard" Component={Dashboard} />
<Route path="/newstudy" Component={NewStudy} />
</Switch> */
}
