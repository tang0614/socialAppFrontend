import React, { useState, useEffect } from "react";
import ScreamCard from "../../component/ScreamCard";
import PropTypes from "prop-types";
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
import Tooltip from "@material-ui/core/Tooltip";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import EmojiNatureTwoToneIcon from "@material-ui/icons/EmojiNatureTwoTone";
// Redux
import { connect } from "react-redux";
import {
  apiPostCommentBegan,
  apiPutRetweetBegan,
  apiPutUnLikeBegan,
  apiPutLikeBegan,
  apiPutUnFollowBegan,
  apiPutFollowBegan,
} from "../../store/actions";

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
  follow: {
    color: "#1DA1F2",
  },
  add: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
    padding: 0,
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
  const [follow, setFollow] = useState("");

  useEffect(() => {
    const re = props.user.following
      ? props.user.following.filter((element) => {
          return element === scream.author;
        })
      : "";

    setFollow(re.length > 0);
  }, [props.user.following]);

  const followHandler = () => {
    if (follow) {
      props.putUnFollow(`./api/users/unfollow/${scream.author}`);
      setFollow(false);
    } else {
      props.putFollow(`./api/users/follow/${scream.author}`);
      setFollow(true);
    }
  };

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
    const userData = {
      body: "retweet" + scream._id,
    };
    // props.postScream("./api/screams", userData);
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

  const like = (_id) => {
    props.putLikePost(`./api/users/like/${_id}`);
  };

  const unLike = (_id) => {
    props.putUnLikePost(`./api/users/unlike/${_id}`);
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
        <div className={classes.add}>
          <Button  disabled={props.authenticated?false:true}>
            <EmojiNatureTwoToneIcon />
          </Button>
          {scream.author === props.user._id || props.isRetweet ? (
            ""
          ) : ( 
            <Tooltip
              title={follow ? `unfollow ${scream.author_details[0].handle}` : `follow ${scream.author_details[0].handle}`}
              className={follow ? classes.follow : ""}
              onClick={followHandler}
            >
              <Button  disabled={props.authenticated?false:true}>
                <GroupAddIcon />
              </Button>
            </Tooltip>
          )}
        </div>
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
          handleClose={handleClose}
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

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  putRetweetDetail: PropTypes.func.isRequired,
  putLikePost: PropTypes.func.isRequired,
  putUnLikePost: PropTypes.func.isRequired,
  putFollow: PropTypes.func.isRequired,
  putUnFollow: PropTypes.func.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  authenticated:state.user.authenticated,
  user: state.user.user,
});

const mapActionsToProps = (dispatch) => {
  return {
    postComment: (url, userData, handle) =>
      dispatch(apiPostCommentBegan({ url, userData, handle })),
    putRetweetDetail: (url, userData) =>
      dispatch(apiPutRetweetBegan({ url, userData })),
    putLikePost: (url) => dispatch(apiPutLikeBegan({ url })),
    putUnLikePost: (url) => dispatch(apiPutUnLikeBegan({ url })),
    putFollow: (url) => dispatch(apiPutFollowBegan({ url })),
    putUnFollow: (url) => dispatch(apiPutUnFollowBegan({ url })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Scream);
