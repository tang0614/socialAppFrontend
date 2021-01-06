import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { login, getCurrentUser } from "../services/userService";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    error: {},
  };

  schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  };

  handleServer = async () => {
    try {
      await login(this.state.data);
      const { state } = this.props.location;

      //do full reload of the app, from the componentDidMount stage
      window.location = state ? state.fragmentDirective.pathname : "/movies";
    } catch (ex) {
      console.log(ex.response && ex.response.status === 400);
      const error = { ...this.state.error };
      error.email = ex.response.data;
      this.setState({ error });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("LogIn")}
        </form>
      </div>
    );
  }
}

export default Login;
