import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthorImage from "./AuthorImage";
import Scream from "../Page/Post/Scream";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";
// Redux
import { connect } from "react-redux";
import AvatarImage from "./AvatarImage";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    width: "250px",
    margin: "0 auto",
  },
  notes: {
    textAlign: "start",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  content: {
    width: "250px",
    textAlign: "start",
    padding: "1rem 0 ",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const ScreamCard = (props) => {
  const classes = useStyles(props);

  dayjs.extend(relativeTime);

  const { createdAt, _id, body, author_details, author } = props.scream;
  const { isComment } = props;

  let bodyScream;
  if (body.startsWith("retweet")) {
    const scream_id = body.split("retweet")[1];

    const commentedScream = props.screams.find(
      (scream) => scream._id === scream_id
    );

    bodyScream = <Scream scream={commentedScream} isRetweet={true} />;
  } else {
    bodyScream = <Typography variant="body2">{body}</Typography>;
  }

  const paperInHeader =
    author === props.user._id ? (
      <div className={classes.headerItem}>
        <AvatarImage isTweet={true} />

        <MuiLink component={Link} to={`/profile/${_id}`} color="textPrimary">
          @{props.user.handle}
        </MuiLink>
      </div>
    ) : (
      <div className={classes.headerItem}>
        <AuthorImage imageUrl={author_details[0].imageUrl} />

        <MuiLink component={Link} to={`/profile/${_id}`} color="textPrimary">
          @{author_details[0].handle}
        </MuiLink>
      </div>
    );

  const header = body.startsWith("retweet") ? "" : paperInHeader;
  return (
    <Card className={classes.root}>
      <div className={classes.notes}>
        {isComment ? (
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.icon}
          >
            <ChatBubbleOutlineSharpIcon />
            {props.user.handle + " replying"}
          </Typography>
        ) : (
          ""
        )}

        {body.startsWith("retweet") ? (
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.icon}
          >
            <RoundedCornerIcon />
            {props.user.handle + " retweet"}
          </Typography>
        ) : (
          ""
        )}
      </div>

      <div className={classes.header}>
        {header}

        <div>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.headerItem}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
        </div>
      </div>

      <div className={classes.content}>{bodyScream}</div>
    </Card>
  );
};

ScreamCard.propTypes = {
  user: PropTypes.string.isRequired,
  screams: PropTypes.string.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user.user,
  screams: state.data.screams,
});

export default connect(mapStateToProps)(ScreamCard);