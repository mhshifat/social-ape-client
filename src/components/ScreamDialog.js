import {
  CircularProgress,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import { UnfoldMore } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getScreamAction } from "../store/actions/userActions";

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  profileImage: {
    maxWidth: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover"
  },
  expendBtn: {
    position: "absolute",
    left: "90%"
  }
};

const ScreamDialog = React.memo(
  ({ classes, screamId, data, getScreamAction }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
      <>
        <Tooltip title="Scream details" placement="top">
          <IconButton
            className={classes.expendBtn}
            onClick={() => {
              setLoading(true);
              setOpen(true);
              getScreamAction(screamId)
                .then(() => {
                  setLoading(false);
                })
                .catch(() => {
                  setLoading(false);
                });
            }}
          >
            <UnfoldMore color="primary" />
          </IconButton>
        </Tooltip>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogContent className={classes.dialogContent}>
            {loading ? (
              <div>
                <CircularProgress size={50} thickness={2} />
              </div>
            ) : (
              <Grid container spacing={2}>
                <Grid
                  item
                  sm={5}
                  style={{
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={data.scream.userImage}
                    className={classes.profileImage}
                    alt="user"
                  />
                </Grid>

                <Grid
                  item
                  sm={7}
                  style={{
                    overflow: "hidden"
                  }}
                >
                  <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${data.scream.userHandle}`}
                  >
                    @{data.scream.userHandle}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(data.scream.createdAt).format(
                      "h:mm a, MMMM DD YYYY"
                    )}
                  </Typography>
                  <hr className={classes.invisibleSeparator} />
                  <Typography variant="body1">{data.scream.body}</Typography>
                </Grid>
              </Grid>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = {
  getScreamAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScreamDialog));
