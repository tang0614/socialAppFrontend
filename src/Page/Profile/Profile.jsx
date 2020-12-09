import React, { useEffect, useState } from "react";
import ProfileHeader from "../../component/ProfileHeader";
import ProfileCard from "../../component/ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PostCard from "../../component/PostCard";
import EditImage from "../../component/EditImage";
import MyTweet from "./MyTweet";
import { Route } from "react-router-dom";
import MyLike from "./MyLike";
import MyComment from "./MyComment";
import Fab from "@material-ui/core/Fab";
import Admin from "../Auth/Admin";

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
  const [handleName, setHandleName] = useState('');

  useEffect(()=>{
    setHandleName(props.match.params.handle)
   
   
  },[])

  //handle new tweet
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const paper = handleName==='user10'? <Admin />:(
    <div>
  <ProfileCard />
    <EditImage />
    
    <Route path={`/profile/:handle/mytweet`} component={MyTweet} />
    <Route path={`/profile/:handle/mycomment`} component={MyComment} />
    <Route path={`/profile/:handle/mylike`} component={MyLike} />
  
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
export default Profile;
