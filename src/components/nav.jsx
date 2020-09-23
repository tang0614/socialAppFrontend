import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { logoutUser } from "../store/actions";

class Nav extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          {this.props.authenticated ? null : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          {this.props.authenticated ? null : (
            <Button color="inherit" component={Link} to="/signup">
              SignUp
            </Button>
          )}
          {this.props.authenticated ? (
            <Button color="inherit" onClick={() => this.props.logout()}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Nav);
