import React from "react";
import { Switch } from "react-router-dom";
import AuthRoute from "../components/Hoc/AuthRoute";
import PublicRoute from "../components/Hoc/PublicRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => (
  <Switch>
    <PublicRoute exact path="/" component={Home} />
    <AuthRoute path="/login" component={Login} />
    <AuthRoute path="/register" component={Register} />
  </Switch>
);

export default Routes;
