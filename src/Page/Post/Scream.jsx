import React, { useState, useEffect } from "react";
import ScreamCard from "../../component/ScreamCard";
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
import {
  apiPostCommentBegan,
  apiPutRetweetBegan,
  apiPutUnLikeBegan,
  apiPutLikeBegan,
} from "../../store/actions";
import ScreamHeader from "../../component/ScreamHeader";

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
  const scream = props.scream;
  const [open, setOpen] = useState(false);
  const [open_full, setOpen_full] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


  const handleDeleteOpen = () => {setOpenDelete(true);};
  const handleDeleteClose = () => {setOpenDelete(false);};
  const handleClickOpen = () =>  {setOpen(true)};
  const handleClickClose = () => {setOpen(false);};
  const handleCloseFull = () => {setOpen_full(false);};
  const handleClickOpenFull = () => {setOpen_full(true);};

  const like = (_id) => {props.putLikePost(`./api/users/like/${_id}`);};
  const unLike = (_id) => {props.putUnLikePost(`./api/users/unlike/${_id}`);};

  const retweet = () => {
    const userData = {
      body: "retweet" + scream._id,
    };
    props.postComment("./api/screams", userData);
    try {
      setTimeout(() => {
        const retweet_id = getComment();
        const userData = {
          retweet_id: retweet_id,
          retweeted_id: scream._id,
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
        scream={scream}
        isComment={props.isComment}
        isRetweet={props.isRetweet}
      />
    </div>
  ) : (
    <Button className={classes.fullScreen_button} 
    disabled={props.authenticated?false:true}
    onClick={handleClickOpenFull}>
      <ScreamCard
        scream={scream}
        isComment={props.isComment}
        isRetweet={props.isRetweet}
      />
    </Button>
  );
  return (
    <div>
      <Card className={classes.root}>
      
        <ScreamHeader scream={scream} />
        {screamCard}
        <Buttons
          scream={scream}
          handleClickOpen={handleClickOpen}
          openDelete={openDelete}
          handleDeleteOpen={handleDeleteOpen}
          handleDeleteClose={handleDeleteClose}
          retweet={retweet}
          like={like}
          unLike={unLike}
        />
        <Comment
          open={open}
          handleClose={handleClickClose}
          scream={scream}
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
          scream={scream}
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

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  authenticated:state.user.authenticated,
  user: state.user.user,
  auth: state.user.authenticated,
});

const mapActionsToProps = (dispatch) => {
  return {
    postComment: (url, userData, handle) =>
      dispatch(apiPostCommentBegan({ url, userData, handle })),
    putRetweetDetail: (url, userData) =>
      dispatch(apiPutRetweetBegan({ url, userData })),
    putLikePost: (url) => dispatch(apiPutLikeBegan({ url })),
    putUnLikePost: (url) => dispatch(apiPutUnLikeBegan({ url }))
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Scream);
