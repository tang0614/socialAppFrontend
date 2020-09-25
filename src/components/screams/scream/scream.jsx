import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./scream.module.css";
import DeleteScream from "../../deleteScream";
import LikeButton from "../../likeButton";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { connect } from "react-redux";
import CommentButton from "../../commentButton";

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      body,
      createdAt,
      userImage,
      userHandle,
      likeCount,
      screamId,
      commentCount,
    } = this.props.scream;

    const deleteButton =
      this.props.user.authenticated &&
      userHandle === this.props.user.credentials.handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    return (
      <Card className={classes.Card}>
        <CardMedia
          image={userImage}
          title="ProfileImage"
          className={classes.Image}
        ></CardMedia>
        <CardContent className={classes.Content}>
          <Typography
            color="primary"
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>

          <LikeButton screamId={screamId} />
          <span>{likeCount} </span>
          <CommentButton
            body={body}
            createdAt={createdAt}
            userImage={userImage}
            userHandle={userHandle}
            screamId={screamId}
          />
          <span>{commentCount} </span>
        </CardContent>
      </Card>
    );
  }
}

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Scream);
