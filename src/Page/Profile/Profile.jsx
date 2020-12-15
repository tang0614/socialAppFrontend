import React, { useEffect, useState } from "react";
import ProfileHeader from "../../component/ProfileHeader";
import ProfileCard from "../../component/ProfileCard";
import { makeStyles } from "@material-ui/core/styles";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PostCard from "../../component/PostCard";
import EditImage from "../../component/EditImage";
import MyTweet from "./MyTweet";
import { Route } from "react-router-dom";
import MyLike from "./MyLike";
import MyComment from "./MyComment";
import Fab from "@material-ui/core/Fab";
import Admin from "../Auth/Admin";
// Redux
import { connect } from "react-redux";
const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },

  addIcon: {
    position: "fixed",
    color: "#1DA1F2",

    top: "30rem",
    right: "3rem",
  },
  editImage: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    position: "absolute",
  },
  popover: {
    pointerEvents: "none",
  },
});

const Profile = (props) => {
  const classes = useStyles(props);
  //open for new tweet
  const [open, setOpen] = useState(false);
  const [handleId, setHandleId] = useState(null);

  useEffect(()=>{
    setHandleId(props.match.params.id)
   
  
   
  },[])

  //handle new tweet
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  
  const paper = props.user.handle==='user10' && props.user._id===handleId? <Admin />:(
    <div>
    <ProfileCard handleId={handleId}/>
    <EditImage handleId={handleId}/>
    
    <Route path={`/profile/:id/mytweet`} component={MyTweet} />
    <Route path={`/profile/:id/mycomment`} component={MyComment} />
    <Route path={`/profile/:id/mylike`} component={MyLike} />
  
    <Fab
      color="primary"
      size="medium"
      className={classes.addIcon}
      onClick={handleClickOpen}
    >
      <AddCircleOutlineIcon fontSize="large" />
    </Fab>


    <PostCard open={open} handleClose={handleClose} {...props} /></div>)

  return (
    <div className={classes.root}>
      <ProfileHeader {...props} />
      {paper}
    </div>
  );
};

//connect subscribe/unsubscribe the redux store



//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Profile);

