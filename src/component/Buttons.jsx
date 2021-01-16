import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DeleteScream from "./deleteScream";
//Material UI
import Button from "@material-ui/core/Button";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";
// Redux
import { connect } from "react-redux";
import { getComment } from "../store/helpers";
import {
  apiPutRetweetBegan,
  apiPutUnLikeBegan,
  apiPutLikeBegan,
  apiPostCommentBegan
} from "../store/actions";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  disabled: {
    color: "#cccccc",
    cursor: "none",
  },
  liked: {
    color: "#1DA1F2",
  },
}));

const Buttons = (props) => {
  const classes = useStyles(props);
  const {
    scream,
    handleClickOpen,
  } = props;
 
  useEffect(() => {
    const re = props.user.like
      ? props.user.like.filter((element) => {
          return element._id === scream._id;
        })
      : "";
    setLikePost(re.length > 0);
  }, [props.user.like]);


  const [likePost, setLikePost] = useState("");
  const [openDelete, setOpenDelete] = useState(false); // delete scream window
  
  const handleDeleteOpen = () => {setOpenDelete(true);};
  const handleDeleteClose = () => {setOpenDelete(false);};
  const like = (_id) => {props.putLikePost(`./api/users/like/${_id}`);};
  const unLike = (_id) => {props.putUnLikePost(`./api/users/unlike/${_id}`);};
  const handleLikePost = () => {
    if (likePost) {
      unLike(scream._id);
      setLikePost(false);
    } else {
      like(scream._id);
      setLikePost(true);
    }
  };

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
  
 
  const buttons = scream.body.startsWith("retweet") ? (
    ""
  ) : (
    <div className={classes.buttons}>
      <Tooltip onClick={handleClickOpen} title={"comment"}>
        <Button  disabled={props.authenticated?false:true}>
          {scream.comments.length}
          <ChatBubbleOutlineIcon />
        </Button>
      </Tooltip>

      <Tooltip onClick={retweet} title={"retweet"}>
        <Button  disabled={props.authenticated?false:true}>
          {scream.retweets.length}
          <RoundedCornerIcon />
        </Button>
      </Tooltip>

      <Tooltip onClick={handleLikePost} title={"save"}>
        <Button className={likePost ? classes.liked : classes.unLiked}  disabled={props.authenticated?false:true}>
          <SaveOutlinedIcon />
        </Button>
      </Tooltip>

      {scream.author === props.user._id||props.user.isAdmin ? (
        <DeleteScream
          scream={scream}
          handleOpen={handleDeleteOpen}
          handleClose={handleDeleteClose}
          open={openDelete}
        
        />
      ) : (
        <Tooltip title={"delete disabled"} className={classes.disabled}>
          <DeleteOutline disabled />
        </Tooltip>
      )}
    </div>
  );
  return <div>{buttons}</div>;
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  authenticated:state.user.authenticated
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

export default connect(mapStateToProps, mapActionsToProps)(Buttons);
