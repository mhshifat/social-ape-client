import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
import { Chat, Favorite, FavoriteBorder } from "@material-ui/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  likeScreamAction,
  unlikeScreamAction
} from "../../store/actions/userActions";
import DeleteScream from "../DeleteScream";
import ScreamDialog from "../ScreamDialog";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative"
  },
  image: {
    minWidth: 180
  },
  content: {
    padding: 20,
    objectFit: "cover",
    flex: 1
  }
};

const ScreamCard = React.memo(props => {
  dayjs.extend(relativeTime);
  const {
    classes,
    userImage,
    userHandle,
    createdAt,
    body,
    likeCount,
    commentCount,
    screamId,
    user: { isAuthenticated, likes, credentials },
    likeScreamAction,
    unlikeScreamAction
  } = props;

  const isLikedThisScream = screamId =>
    !!likes.find(like => like.screamId === screamId);

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} className={classes.image} />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="primary"
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        {isAuthenticated && userHandle === credentials.handle && (
          <DeleteScream screamId={screamId} />
        )}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {!isAuthenticated ? (
          <Tooltip title="Like Scream" placement="top">
            <IconButton>
              <Link to="/login">
                <FavoriteBorder color="primary" />
              </Link>
            </IconButton>
          </Tooltip>
        ) : isLikedThisScream(screamId) ? (
          <Tooltip title="Unlike Scream" placement="top">
            <IconButton onClick={() => unlikeScreamAction(screamId)}>
              <Favorite color="primary" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Like Scream" placement="top">
            <IconButton onClick={() => likeScreamAction(screamId)}>
              <FavoriteBorder color="primary" />
            </IconButton>
          </Tooltip>
        )}
        <span>{likeCount} likes</span>
        <Tooltip title="Comments" placement="top">
          <IconButton>
            <Chat color="primary" />
          </IconButton>
        </Tooltip>
        <span>{commentCount} comments</span>
        <ScreamDialog screamId={screamId} />
      </CardContent>
    </Card>
  );
});

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  likeScreamAction,
  unlikeScreamAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScreamCard));
