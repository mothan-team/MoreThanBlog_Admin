import React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import AuthenticateLayout from "../layouts/AuthenticateLayout";
import Login from "../pages/login";

const AuthenticateRoutes = () => {
  let match = useRouteMatch();

  return (
    <AuthenticateLayout>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
        <Route path={`${match.url}/login`} component={Login} />
        <Redirect to="/error" />
      </Switch>
    </AuthenticateLayout>
  );
};

export default AuthenticateRoutes;
