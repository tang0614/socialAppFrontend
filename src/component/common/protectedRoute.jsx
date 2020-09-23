import * as React from "react";
import { getCurrentUser } from "../../store/helpers";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ path, component: Component, render, ...rest }) {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/auth", state: { from: props.location } }}
            />
          );
        return Component ? (
          <Component currentUser={getCurrentUser()} {...props} />
        ) : (
          render(props)
        );
      }}
    />
  );
}

export default ProtectedRoute;
