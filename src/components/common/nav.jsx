import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Nav extends Component {
  state = {};
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li> */}
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signUp">
                    SignUp
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </React.Fragment>
            )}

            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
