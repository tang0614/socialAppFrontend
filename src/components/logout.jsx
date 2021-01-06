import { Component } from "react";
import { logout } from "../services/userService";

class Logout extends Component {
  componentDidMount() {
    logout();
    window.location.href = "/home";
  }

  render() {
    return null;
  }
}

export default Logout;
