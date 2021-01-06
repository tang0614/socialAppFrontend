import React from "react";
import Joi from "joi";
import Form from "./common/form";
import { register, loginWithJwt } from "../services/userService";

class SignUp extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    error: {},
  };

  schema = {
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  };

  handleServer = async () => {
    try {
      const response = await register(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
      //do full reload of the app, from the componentDidMount stage
      window.location = "/home";
    } catch (ex) {
      console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.email = ex.response.data;

        this.setState({ error });
      }
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>SignUp</h1>
          {this.renderInput("username", "Username", "text")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("SignUp")}
        </form>
      </div>
    );
  }
}

export default SignUp;
