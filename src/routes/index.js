import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Error from "../pages/error";
import SetPassword from "../pages/set-password";
import ForgotPass from "../pages/set-password/ForgotPass";

const AuthenticateRoutes = lazy(() => import("./AuthenticateRoutes"));
const PrimaryRoutes = lazy(() => import("./PrimaryRoutes"));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/authenticate/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/admin" />
          <PrivateRoute path="/admin" component={PrimaryRoutes} />
          <Route path="/authenticate" component={AuthenticateRoutes} />
          <Route path="/error" exact component={Error} />
          <Route path="/me/set-pass/:email/:otp" component={SetPassword} />
          <Route path="/forgot-pass" component={ForgotPass} />
          <Redirect to="/error" />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
