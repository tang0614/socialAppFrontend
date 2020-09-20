import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Auth from "./Page/Auth/Auth";
import Home from "./Page/Home/Home";
import NotFound from "./component/NotFound";
import SignUp from "./Page/Auth/SignUp";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Switch>
          <Route path="/home" exact={true} component={Home}></Route>
          <Route path="/auth" exact={true} component={Auth}></Route>
          <Route path="/signup" exact={true} component={SignUp}></Route>
          <Route path="/" exact={true}>
            <Redirect to="/home" />
          </Route>
          <Route path="/" component={NotFound}></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
