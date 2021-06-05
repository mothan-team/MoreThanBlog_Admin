import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layouts } from "./layouts";
import Categories from "./pages/categories";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";

function App() {
  return (
    <Router>
      <Layouts>
        <Switch>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Layouts>
    </Router>
  );
}

export default App;
