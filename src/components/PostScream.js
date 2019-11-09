import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  withStyles
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { postScreamAction } from "../store/actions/userActions";

const styles = {
  textField: {
    marginBottom: 25
  },
  loading: {
    marginLeft: 10
  },
  submitBtn: {
    marginBottom: 20
  }
};

const PostScream = React.memo(({ classes, ui, postScreamAction }) => {
  const { errors } = ui;
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Tooltip title="Add scream" placement="top">
        <IconButton color="inherit" onClick={() => setOpen(true)}>
          <Add color="inherit" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Post a new Scream</DialogTitle>
        <DialogContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              setLoading(true);
              postScreamAction({ body })
                .then(() => {
                  setLoading(false);
                  setOpen(false);
                  setBody("");
                })
                .catch(() => {
                  setLoading(false);
                });
            }}
            autoComplete="off"
            noValidate
          >
            <TextField
              name="body"
              type="text"
              label="Scream!!"
              multiline
              rows={3}
              placeholder="Scream at your fellow apes"
              error={!!errors.body}
              helperText={errors.body}
              className={classes.textField}
              onChange={e => setBody(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              disabled={loading}
              fullWidth
            >
              Submit{" "}
              {loading && (
                <CircularProgress
                  size={15}
                  color="inherit"
                  className={classes.loading}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
});

const mapStateToProps = ({ ui }) => ({ ui });

const mapDispatchToProps = {
  postScreamAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostScream));
