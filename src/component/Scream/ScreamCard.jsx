import React from "react";
import Scream from "../../Page/Post/Scream";
import Buttons from "./Buttons";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Redux
import { connect } from "react-redux";
import ScreamCardAuthor from "./ScreamCardAuthor";
import ScreamCardCaptain from "./ScreamCardCaptain";
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
  content: {
    width: "250px",
    textAlign: "start",
    padding: "1rem 0 ",
  },
}));

const ScreamCard = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);

  const { createdAt, body, author_details } = props.scream;
  const {isComment, isNested, scream, handleClickOpen} = props;

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

  return (
    <Card className={classes.root}>

      <ScreamCardCaptain body={body} author_details={author_details} isComment={isComment} />

      <div className={classes.header}>
        <ScreamCardAuthor scream={props.scream}/>
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
      {isNested ? 
        <Buttons
          scream={scream}
          handleClickOpen={handleClickOpen}
        />:""}
      </Card>
  );
  }

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user.user,
  screams: state.data.screams,
});
export default connect(mapStateToProps)(ScreamCard);
