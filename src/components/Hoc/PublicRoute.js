import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../layouts/Navbar";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Navbar />
          <div className="container">
            <Component {...props} />
          </div>
        </>
      )}
    />
  );
};

export default PublicRoute;
