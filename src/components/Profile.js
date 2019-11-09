import {
  Button,
  IconButton,
  Link as MuiLink,
  Paper,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  CalendarToday,
  Edit,
  KeyboardReturn,
  Link as LinkIcon,
  LocationOn
} from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  logoutUserAction,
  uploadImageAction
} from "../store/actions/userActions";
import EditDetails from "./EditDetails";

const styles = {
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};

const Profile = React.memo(
  ({ classes, user, ui, uploadImageAction, logoutUserAction }) => {
    const { loading } = ui;
    const {
      isAuthenticated,
      credentials: { handle, createdAt, imageUrl, bio, website, location }
    } = user;

    const handleEditPicture = () => {
      document.querySelector("#imageInput").click();
    };

    const handleImageChange = e => {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image, image.name);
      uploadImageAction(formData);
    };

    return loading ? (
      "Loading..."
    ) : !isAuthenticated ? (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden
              onChange={handleImageChange}
            />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton className="button" onClick={handleEditPicture}>
                <Edit color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <Tooltip title="Logout" placement="top">
            <IconButton onClick={logoutUserAction}>
              <KeyboardReturn color="primary" />
            </IconButton>
          </Tooltip>
          <EditDetails />
        </div>
      </Paper>
    );
  }
);

const mapStateToProps = ({ user, ui }) => ({ user, ui });

const mapDispatchToProps = {
  uploadImageAction,
  logoutUserAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
