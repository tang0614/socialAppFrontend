import React from "react";
import { Link } from "react-router-dom";
import DeleteScream from "./deleteScream";
import AvatarImage from "../Home/AvatarImage";
// MUI Stuff

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";

// Redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 545,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {
    display: "block",
    width: "95%",
    minHeight: "5rem",

    textAlign: "start",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "1em",
  },
  headerItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    padding: "1rem",
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
      <div className={classes.header}>
        <div className={classes.headerItem}>
          <AvatarImage />
          <MuiLink component={Link} to={`/profile/${_id}`} color="textPrimary">
            @{props.user.user.handle}
          </MuiLink>
        </div>
        <div>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.headerItem}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
        </div>
      </div>
      <CardContent className={classes.content}>
        <Typography variant="body1">{body}</Typography>
      </CardContent>

      <div className={classes.buttons}>
        <ChatBubbleOutlineIcon />
        <RoundedCornerIcon />
        <FavoriteBorderIcon />
        {deleteButton}
      </div>
    </Card>
  );
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Scream);
