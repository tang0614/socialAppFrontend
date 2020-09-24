import React from "react";
import ScreamCard from "./ScreamCard";
import Comment from "../../component/comment";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import DeleteScream from "./deleteScream";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";
import Button from "@material-ui/core/Button";
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
    author_details,
    _id,
  } = props.scream;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <ScreamCard
        author_details={author_details[0]}
        createdAt={createdAt}
        _id={_id}
        body={body}
      />

      <div className={classes.buttons}>
        {author_details.handle === props.user.user.handle ? (
          <DeleteScream _id={_id} />
        ) : (
          ""
        )}

        <Button onClick={handleClickOpen}>
          <ChatBubbleOutlineIcon />
        </Button>
        <RoundedCornerIcon />
        <FavoriteBorderIcon />
      </div>

      <Comment
        open={open}
        handleClose={handleClose}
        author_details={author_details[0]}
        createdAt={createdAt}
        _id={_id}
        body={body}
        {...props}
      />
    </Card>
  );
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Scream);
