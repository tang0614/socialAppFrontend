// @flow
import * as React from "react";
import { getCurrentUser } from "../../services/userService";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ path, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
