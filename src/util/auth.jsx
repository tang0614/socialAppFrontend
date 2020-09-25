import React from "react";
import { Route, Redirect } from "react-router-dom";

function Auth({ component: C, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/home" /> : <C {...props} />
      }
    />
  );
}

export default Auth;

//The render prop function has access to all the same route props (match, location and history) as the component render prop.
