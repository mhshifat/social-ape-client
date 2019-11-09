import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Navbar from "../layouts/Navbar";

const AuthRoute = ({
  component: Component,
  user: { isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <>
            <Navbar />
            <div className="container">
              <Component {...props} />
            </div>
          </>
        )
      }
    />
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AuthRoute);
