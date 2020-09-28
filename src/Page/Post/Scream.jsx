import React, { useState } from "react";
import ScreamCard from "../../component/ScreamCard";
import PropTypes from "prop-types";
import DeleteScream from "../../component/deleteScream";
import Comment from "../../component/comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getComment } from "../../store/helpers";
import ScreamCardDetail from "../../component/ScreamCardDetail";
import Buttons from "../../component/Buttons";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

// Redux
import { connect } from "react-redux";
import { apiPostCommentBegan, apiPutRetweetBegan } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 512,
    margin: "0 auto",
    padding: 0,
    boxShadow: "none",
    borderBottom: "1px dotted #cccccc",
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
    marginTop: "4rem",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Scream = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);

  const [open, setOpen] = useState(false);
  const [open_full, setOpen_full] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { author, _id } = props.scream;

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

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
    // props.postScream("./api/screams", userData);
    props.postComment("./api/screams", userData);

    try {
      setTimeout(() => {
        const retweet_id = getComment();

        const userData = {
          retweet_id: retweet_id,
          retweeted_id: _id,
        };

        props.putRetweetDetail(`./api/screams/retweet`, userData);
      }, 1000);
    } catch (err) {
      alert("internet error, fail to retweet");
    }
  };

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

        <Buttons
          scream={props.scream}
          handleClickOpen={handleClickOpen}
          openDelete={openDelete}
          handleDeleteOpen={handleDeleteOpen}
          handleDeleteClose={handleDeleteClose}
          retweet={retweet}
        />
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
        <ScreamCardDetail
          handleCloseFull={handleCloseFull}
          scream={props.scream}
          handleClickOpen={handleClickOpen}
          openDelete={openDelete}
          handleDeleteOpen={handleDeleteOpen}
          handleDeleteClose={handleDeleteClose}
          retweet={retweet}
        />
      </Dialog>
    </div>
  );
};

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  putRetweetDetail: PropTypes.func.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapActionsToProps = (dispatch) => {
  return {
    postComment: (url, userData, handle) =>
      dispatch(apiPostCommentBegan({ url, userData, handle })),
    putRetweetDetail: (url, userData) =>
      dispatch(apiPutRetweetBegan({ url, userData })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Scream);
