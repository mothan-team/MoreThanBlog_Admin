import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const AuthenticateRoutes = lazy(() => import("./AuthenticateRoutes"));
const PrimaryRoutes = lazy(() => import("./PrimaryRoutes"));

const Routes = () => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/admin" />
          <Route path="/authenticate" component={AuthenticateRoutes} />
          <Route path="/admin" component={PrimaryRoutes} />
          <Redirect to="/error" />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
