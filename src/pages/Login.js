import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { useForm } from "../hooks";
import { loginUserAction } from "../store/actions/userActions";

const styles = {
  formContainer: {
    textAlign: "center"
  },
  image: {},
  form: {
    marginTop: 25
  },
  textField: {
    marginBottom: 25
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginBottom: 20
  },
  notice: {
    display: "inline-block",
    marginTop: 20
  },
  loading: {
    marginLeft: 10
  }
};

const Login = React.memo(({ classes, ui, history, loginUserAction }) => {
  const { loading, errors } = ui;
  const { state, handleFormInputChange } = useForm({
    email: "",
    password: ""
  });

  const handleLoginFormSubmit = e => {
    e.preventDefault();
    loginUserAction(state, history);
  };

  return (
    <Grid container className={classes.formContainer}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src="/icon.png" alt="monkey" className={classes.image} />
        <Typography variant="h4" className={classes.pageTitle}>
          Login
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleLoginFormSubmit}
          className={classes.form}
        >
          <TextField
            type="email"
            name="email"
            label="Email"
            value={state.email}
            className={classes.textField}
            onChange={handleFormInputChange}
            fullWidth
            helperText={errors.email}
            error={!!errors.email}
          />

          <TextField
            type="password"
            name="password"
            label="Password"
            value={state.password}
            className={classes.textField}
            onChange={handleFormInputChange}
            fullWidth
            helperText={errors.password}
            error={!!errors.password}
          />

          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}

          <Button
            disabled={loading}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
          >
            Login
            {loading && (
              <CircularProgress
                size={15}
                color="inherit"
                className={classes.loading}
              />
            )}
          </Button>
          <small className={classes.notice}>
            Don't have an account ? sign up <Link to="/register">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
});

const mapStateToProps = ({ ui }) => ({ ui });

const mapDispatchToProps = {
  loginUserAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Login)));
