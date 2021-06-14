import React from "react";
import { lazy } from "react";
import { Suspense } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import PrimaryLayout from "../layouts/PrimaryLayout";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Categories = lazy(() => import("../pages/categories"));
const Users = lazy(() => import("../pages/users"));

const PrimaryRoutes = () => {
  let match = useRouteMatch();
  return (
    <PrimaryLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
          <Route path={`${match.url}/dashboard`} component={Dashboard} />
          <Route path={`${match.url}/categories`} component={Categories} />
          <Route path={`${match.url}/users`} component={Users} />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </PrimaryLayout>
  );
};

export default PrimaryRoutes;
