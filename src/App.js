import React, { useEffect} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Auth from "./Page/Auth/Auth";
import Home from "./Page/Home/Home";
import Search from "./Page/Search/Search";
import NotFound from "./Page/NotFound";
import ProtectedRoute from "./component/common/protectedRoute";
import { getCurrentUser } from "./store/helpers";
import Profile from "./Page/Profile/Profile";

//redux
import { Provider } from "react-redux";
import store from "./store/store";

import {
  logoutUser,
  apiCallSuccess,
  apiGetUserBegan,

} from "./store/actions";
import { checkExpiration } from "./store/helpers";


function App() {
  useEffect(() => {
    const token = localStorage.getItem("IdToken");
    if (token) {
      const currentUser = getCurrentUser();
      if (checkExpiration()) return store.dispatch(logoutUser());
      //still login in ....
      store.dispatch(apiCallSuccess(token));
      store.dispatch(apiGetUserBegan({ url: `/api/users/${currentUser._id}` }));
      // store.dispatch(apiGetScreamBegan({ url: `./api/screams` }));
    }
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <ProtectedRoute path="/home" exact={true} component={Home} />
            <ProtectedRoute path="/profile/:id" component={Profile} />

            <Route path="/auth" exact={true} component={Auth} />
            <Route path="/search" exact={true} component={Search} />
            <Route path="/search/:query" exact={true} component={Search} />

            <Route path="/" exact={true}>
              <Redirect to="/search" />
            </Route>
           
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
