import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthorImage from "./AuthorImage";
import { getCurrentUser } from "../../store/helpers";
import AvatarImage from "../Home/AvatarImage";
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
    margin: "0 1rem",

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

const ScreamCard = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);

  const { createdAt, _id, body, author_details, author } = props.scream;
  const { isComment } = props;

  const currentUser = getCurrentUser();

  const paper =
    author === currentUser._id ? (
      <div className={classes.headerItem}>
        <AvatarImage />
        <MuiLink component={Link} to={`/profile/${_id}`} color="textPrimary">
          @{props.user.user.handle}
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
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ScreamCard);
