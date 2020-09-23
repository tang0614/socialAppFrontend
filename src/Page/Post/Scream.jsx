import React from "react";

import DeleteScream from "./deleteScream";

// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { connect } from "react-redux";
import AvatarImage from "../Home/AvatarImage";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

const Scream = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);
  const {
    likeBy,
    body,
    createdAt,
    comments,
    commentOn,
    authorName,
    _id,
  } = props.scream;

  const deleteButton =
    props.user.authenticated && authorName === props.user.user.handle ? (
      <DeleteScream _id={_id} />
    ) : null;

  return (
    <Card className={classes.root}>
      <AvatarImage />
      {/* <CardMedia
        image={userImage}
        title="ProfileImage"
        className={classes.Image}
      ></CardMedia> */}
      <CardContent className={classes.content}>
        {/* <Typography
          color="primary"
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography> */}
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>

        {/* <LikeButton screamId={screamId} />
        <span>{likeCount} </span>
        <CommentButton
          body={body}
          createdAt={createdAt}
          userImage={userImage}
          userHandle={userHandle}
          screamId={screamId}
        />
        <span>{commentCount} </span> */}
      </CardContent>
    </Card>
  );
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Scream);
