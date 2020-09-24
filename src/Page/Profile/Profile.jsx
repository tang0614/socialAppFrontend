import React, { useState } from "react";
import ProfileHeader from "../../component/ProfileHeader";
import ProfileCard from "../../component/ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import PostCard from "../../component/PostCard";
//redux
import { connect } from "react-redux";
import { apiPutUserBegan, apiGetUserBegan } from "../../store/actions";
import EditImage from "../../component/EditImage";

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

      <PostCard open={open} handleClose={handleClose} {...props} />
    </div>
  );
};

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    getUser: (url) => dispatch(apiGetUserBegan({ url })),
    update: (url, userData) => dispatch(apiPutUserBegan({ url, userData })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(null, mapActionsToProps)(Profile);
