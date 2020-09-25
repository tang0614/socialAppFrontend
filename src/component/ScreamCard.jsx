import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthorImage from "./AuthorImage";
import AvatarImage from "./AvatarImage";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { connect } from "react-redux";
import Scream from "../Page/Post/Scream";

const useStyles = makeStyles((theme) => ({
  root: { boxShadow: "none" },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  isComment: {
    textAlign: "start",
  },

  content: {
    position: "relative",
    margin: "0 auto",
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
    padding: "0.5rem",
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

  const paper =
    author === props.user._id ? (
      <div className={classes.headerItem}>
        <AvatarImage />
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

  return (
    <Card className={classes.root}>
      <div className={classes.isComment}>
        {isComment ? (
          <Typography variant="body2" color="textSecondary">
            {" "}
            replying{" "}
          </Typography>
        ) : (
          ""
        )}

        {body.startsWith("retweet") ? (
          <Typography variant="body2" color="textSecondary">
            {" "}
            retweet{" "}
          </Typography>
        ) : (
          ""
        )}
      </div>
      <div className={classes.header}>
        {paper}

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
        <Typography variant="body2" color="textSecondary" component="p">
          {bodyScream}
        </Typography>
      </CardContent>
    </Card>
  );
};

ScreamCard.propTypes = {
  user: PropTypes.object.isRequired,
  screams: PropTypes.object.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user.user,
  screams: state.data.screams,
});

export default connect(mapStateToProps)(ScreamCard);
