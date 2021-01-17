import React from "react";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";

// Redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  notes: {
  
    textAlign: "start",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const ScreamCardCaptain = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);

  const { body, author_details, isComment } = props;
  return (
      <div className={classes.notes}>
        {isComment ? (
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.icon}
          >
            <ChatBubbleOutlineSharpIcon />
            {(author_details?author_details[0].handle:props.user.handle) + " replying"}
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
            {(author_details?author_details[0].handle:props.user.handle)+ " retweet"}
          </Typography>
        ) : (
          ""
        )}
      </div>
  );
  }
//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user.user,
  screams: state.data.screams,
});
export default connect(mapStateToProps)(ScreamCardCaptain);
