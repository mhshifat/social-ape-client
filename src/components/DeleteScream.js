import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
  withStyles
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteScreamAction } from "../store/actions/userActions";

const styles = {
  deleteBtn: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};

const DeleteScream = React.memo(({ classes, screamId, deleteScreamAction }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Delete scream" placement="top">
        <IconButton onClick={() => setOpen(true)} className={classes.deleteBtn}>
          <DeleteOutline color="secondary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              deleteScreamAction(screamId);
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

const mapDispatchToProps = {
  deleteScreamAction
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(DeleteScream));
