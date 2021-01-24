import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../AuthorImage";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AvatarImage from "../AvatarImage";
// Redux
// Redux
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  headerItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
}));

const ScreamCardAuthor = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);

  const { body, author_details, author } = props.scream;

  const paperInHeader =
    author === props._id ? (
      <div className={classes.headerItem}>
        <AvatarImage isTweet={true} />
        <MuiLink component={Link} to={`/profile/${author}`} color="textPrimary">
          @{props.handle}
        </MuiLink>
      </div>
    ) : (
      <div className={classes.headerItem}>
        <AuthorImage imageUrl={author_details[0].imageUrl} />
        <MuiLink component={Link} to={`/profile/${author}`} color="textPrimary">
          @{author_details[0].handle}
        </MuiLink>
      </div>
    );

  const header = body.startsWith("retweet") ? "" : paperInHeader;
  return <div>{header}</div>;
  }

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  _id: state.user.user._id,
  handle: state.user.user.handle,
  screams: state.data.screams,
});
export default connect(mapStateToProps)(ScreamCardAuthor);
