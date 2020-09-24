import React from "react";
import ScreamCard from "../../component/ScreamCard";
import Comment from "../../component/comment";
import PropTypes from "prop-types";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import DeleteScream from "../../component/deleteScream";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

// Redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 545,
    margin: 0,
    padding: 0,
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
  fullScreen_button: {
    color: "transparent",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    padding: "1rem",
  },
  fullScreenScreamCard: {
    marginTop: "3rem",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    author,
    _id,
  } = props.scream;

  const [open, setOpen] = React.useState(false);
  const [open_full, setOpen_full] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFull = () => {
    setOpen_full(false);
  };

  const handleClickOpenFull = () => {
    setOpen_full(true);
  };

  return (
    <div>
      <Card className={classes.root}>
        <Button
          className={classes.fullScreen_button}
          onClick={handleClickOpenFull}
        >
          <ScreamCard scream={props.scream} isComment={props.isComment} />
        </Button>

        <div className={classes.buttons}>
          <Button onClick={handleClickOpen}>
            <ChatBubbleOutlineIcon />
          </Button>
          <RoundedCornerIcon />
          <FavoriteBorderIcon />

          {author === props.user._id ? <DeleteScream _id={_id} /> : ""}
        </div>

        <Comment
          open={open}
          handleClose={handleClose}
          scream={props.scream}
          {...props}
        />
      </Card>

      <Dialog
        fullScreen
        open={open_full}
        onClose={handleCloseFull}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFull}
              aria-label="close"
            >
              <KeyboardBackspaceOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.fullScreenScreamCard}>
          <ScreamCard scream={props.scream} />
        </div>

        <div className={classes.buttons}>
          <Button onClick={handleClickOpen}>
            <ChatBubbleOutlineIcon />
          </Button>
          <RoundedCornerIcon />
          <FavoriteBorderIcon />
          {author === props.user._id ? <DeleteScream _id={_id} /> : ""}
        </div>
      </Dialog>
    </div>
  );
};

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  isComment: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Scream);
