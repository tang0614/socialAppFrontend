import React from "react";
import ScreamCard from "../../component/ScreamCard";
import PropTypes from "prop-types";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DeleteScream from "../../component/deleteScream";
import Comment from "../../component/comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";
import Tooltip from "@material-ui/core/Tooltip";
// Redux
import { connect } from "react-redux";
import { apiPostScreamBegan } from "../../store/actions";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 512,
    margin: "0 auto",
    padding: 0,
  },

  disabled: {
    color: "#cccccc",
    cursor: "none",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  retweet_buttons: {
    width: 250,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  const { author, _id } = props.scream;

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

  const retweet = () => {
    console.log("retweeting");
    const userData = {
      body: "retweet" + props.scream._id,
    };
    props.postScream("./api/screams", userData);
  };

  const buttons = props.isRetweet ? (
    <div className={classes.retweet_buttons}>
      <Tooltip onClick={handleClickOpen} title={"comment"}>
        <Button>
          <ChatBubbleOutlineIcon />
        </Button>
      </Tooltip>

      <Tooltip onClick={retweet} title={"retweet"}>
        <Button>
          <RoundedCornerIcon />
        </Button>
      </Tooltip>

      <FavoriteBorderIcon />
    </div>
  ) : (
    <div className={classes.buttons}>
      <Tooltip onClick={handleClickOpen} title={"comment"}>
        <Button>
          <ChatBubbleOutlineIcon />
        </Button>
      </Tooltip>

      <Tooltip onClick={retweet} title={"retweet"}>
        <Button>
          <RoundedCornerIcon />
        </Button>
      </Tooltip>

      <FavoriteBorderIcon />

      {author === props.user._id ? (
        <DeleteScream _id={_id} />
      ) : (
        <Tooltip title={"delete disabled"} className={classes.disabled}>
          <DeleteOutline disabled />
        </Tooltip>
      )}
    </div>
  );

  const screamCard = props.isRetweet ? (
    <div className={classes.retweet_card}>
      <ScreamCard
        scream={props.scream}
        isComment={props.isComment}
        isRetweet={props.isRetweet}
      />
    </div>
  ) : (
    <Button className={classes.fullScreen_button} onClick={handleClickOpenFull}>
      <ScreamCard
        scream={props.scream}
        isComment={props.isComment}
        isRetweet={props.isRetweet}
      />
    </Button>
  );

  return (
    <div>
      <Card className={classes.root}>
        {screamCard}

        {buttons}
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

        {buttons}
      </Dialog>
    </div>
  );
};

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  isComment: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapActionsToProps = (dispatch) => {
  return {
    postScream: (url, userData, handle) =>
      dispatch(apiPostScreamBegan({ url, userData, handle })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Scream);
