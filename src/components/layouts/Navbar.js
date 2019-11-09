import {
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  withStyles
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Notifications } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PostScream from "../PostScream";

const styles = {
  navItem: {
    marginLeft: "auto"
  }
};

const Navbar = React.memo(({ classes, ui, user }) => (
  <AppBar>
    <Toolbar variant="dense" className="nav-container">
      <div>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
      </div>
      <div className={classes.navItem}>
        {ui.loading ? (
          <CircularProgress size={15} color="inherit" />
        ) : user.isAuthenticated ? (
          <>
            <PostScream />

            <Tooltip title="Notifications" placement="top">
              <IconButton color="inherit">
                <Notifications color="inherit" />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </div>
    </Toolbar>
  </AppBar>
));

const mapStateToProps = ({ ui, user }) => ({ ui, user });

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
