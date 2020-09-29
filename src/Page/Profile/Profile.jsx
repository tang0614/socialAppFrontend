import React, { useState } from "react";
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

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },

  addIcon: {
    position: "fixed",
    color: "#1DA1F2",
    right: 0,
    bottom: 0,
    padding: "2rem",
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

  //handle new tweet
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ProfileHeader {...props} />
      <ProfileCard />
      <EditImage />
      <Button className={classes.addIcon} onClick={handleClickOpen}>
        <AddCircleOutlineIcon fontSize="large" />
      </Button>

      <Route path={"/profile/mytweet"} component={MyTweet} />
      <Route path={"/profile/mycomment"} component={MyComment} />
      <Route path={"/profile/mylike"} component={MyLike} />

      <PostCard open={open} handleClose={handleClose} {...props} />
    </div>
  );
};

//connect subscribe/unsubscribe the redux store
export default Profile;
