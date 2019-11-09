import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  withStyles
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateUserDetailsAction } from "../store/actions/userActions";

const styles = {
  button: {
    float: "right"
  },
  TextField: {
    marginBottom: 25
  }
};

const EditDetails = React.memo(({ classes, user, updateUserDetailsAction }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ ...user.credentials });

  useEffect(() => {
    setState(user.credentials);
  }, [user]);

  return (
    <>
      <Tooltip title="Edit details" placement="top">
        <IconButton onClick={() => setOpen(true)} className={classes.button}>
          <Edit color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form autoComplete="off" noValidate>
            <TextField
              type="text"
              name="bio"
              label="Bio"
              multiline
              rows={3}
              placeholder="A short bio about yourself"
              className={classes.TextField}
              value={state.bio}
              onChange={e =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              fullWidth
            />

            <TextField
              type="text"
              name="website"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.TextField}
              value={state.website}
              onChange={e =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              fullWidth
            />

            <TextField
              type="text"
              name="location"
              label="Location"
              placeholder="Your location"
              className={classes.TextField}
              value={state.location}
              onChange={e =>
                setState({ ...state, [e.target.name]: e.target.value })
              }
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setState({ ...user.credentials });
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              updateUserDetailsAction(state);
              setOpen(false);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

const mapStateToProps = ({ ui, user }) => ({ ui, user });

const mapDispatchToProps = {
  updateUserDetailsAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDetails));
