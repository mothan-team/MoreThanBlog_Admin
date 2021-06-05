import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Categories from "./pages/categories";
import Home from "./pages/home";
import Users from "./pages/users";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
