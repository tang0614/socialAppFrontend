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
  unliked: {},
}));

const Buttons = (props) => {
  const classes = useStyles(props);
  const [likePost, setLikePost] = useState("");

  useEffect(() => {
    const re = props.user.like
      ? props.user.like.filter((element) => {
          return element._id === scream._id;
        })
      : "";
    setLikePost(re.length > 0);
  }, [props.user.like]);

  const {
    scream,
    handleClickOpen,
    openDelete,
    handleDeleteOpen,
    handleDeleteClose,
    retweet,
    like,
    unLike
  } = props;

  const handleLikePost = () => {


    if (likePost) {
      unLike(scream._id);
      setLikePost(false);
    } else {
      like(scream._id);
      setLikePost(true);
    }
    //here like post is false because setLikePost is async call
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

Buttons.propTypes = {
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  authenticated:state.user.authenticated
});

export default connect(mapStateToProps)(Buttons);
