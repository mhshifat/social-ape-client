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
import { registerUserAction } from "../store/actions/userActions";

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

const Register = React.memo(({ classes, ui, history, registerUserAction }) => {
  const { loading, errors } = ui;
  const { state, handleFormInputChange } = useForm({
    email: "",
    password: "",
    passwordConfirm: "",
    handle: ""
  });

  const handleLoginFormSubmit = e => {
    e.preventDefault();
    registerUserAction(state, history);
  };

  return (
    <Grid container className={classes.formContainer}>
      <Grid item sm></Grid>
      <Grid item sm>
        <img src="/icon.png" alt="monkey" className={classes.image} />
        <Typography variant="h4" className={classes.pageTitle}>
          Register
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

          <TextField
            type="password"
            name="passwordConfirm"
            label="Confirm Password"
            value={state.passwordConfirm}
            className={classes.textField}
            onChange={handleFormInputChange}
            fullWidth
            helperText={errors.passwordConfirm}
            error={!!errors.passwordConfirm}
          />

          <TextField
            type="text"
            name="handle"
            label="Handle"
            value={state.handle}
            className={classes.textField}
            onChange={handleFormInputChange}
            fullWidth
            helperText={errors.handle}
            error={!!errors.handle}
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
            Register
            {loading && (
              <CircularProgress
                size={15}
                color="inherit"
                className={classes.loading}
              />
            )}
          </Button>
          <small className={classes.notice}>
            Already have an account ? login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
});

const mapStateToProps = ({ user, ui }) => ({ user, ui });

const mapDispatchToProps = {
  registerUserAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Register)));
