import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Auth from "./Page/Auth/Auth";
import Home from "./Page/Home/Home";
import NotFound from "./Page/NotFound";
import ProtectedRoute from "./component/common/protectedRoute";
//redux

import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <ProtectedRoute
              path="/home"
              exact={true}
              component={Home}
            ></ProtectedRoute>
            <Route path="/auth" exact={true} component={Auth}></Route>
            <Route path="/" exact={true}>
              <Redirect to="/auth" />
            </Route>
            <Route path="/" component={NotFound}></Route>
          </Switch>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
