import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getCurrentUser } from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoute";
import Movies from "./components/movies";
// import Customers from "./components/customers";
import Login from "./components/login";
import Logout from "./components/logout";
import SignUp from "./components/signUp";
import MovieForm from "./components/movieform";
// import Home from "./components/home";
import NotFound from "./components/notfound";
import Nav from "./components/common/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/scss/main.scss";

import "./App.css";
require("dotenv").config();

class App extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <Nav user={user} />
        <main className="container">
          <Switch>
            <Route path="/signUp" exact={true} component={SignUp}></Route>
            <Route path="/login" exact={true} component={Login}></Route>
            <Route path="/logout" exact={true} component={Logout}></Route>
            {/* <Route path="/customers" exact={true} component={Customers}></Route> */}
            <ProtectedRoute
              path="/movies/:id"
              exact={true}
              component={MovieForm}
            />

            <Route
              path="/movies"
              exact={true}
              render={(parameter) => <Movies {...parameter} user={user} />}
            ></Route>

            {/* <Route path="/home" exact={true} component={Home}></Route> */}
            <Route path="/" exact={true}>
              <Redirect to="/movies" />
            </Route>
            <Route path="/" component={NotFound}></Route>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
//to pass additional properties to router we need render attribute
//route props passing in history, matches,location to children component inside their this.props/props
//render attribute has history, match what react that inject when using routing
export default App;
