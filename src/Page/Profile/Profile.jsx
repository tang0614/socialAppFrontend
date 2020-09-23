import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import AvatarImage from "../Home/AvatarImage";
import Button from "@material-ui/core/Button";
import EditLocationOutlinedIcon from "@material-ui/icons/EditLocationOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

//redux
import { connect } from "react-redux";
import { apiPutUserBegan, apiGetUserBegan } from "../../store/actions";
import PostCard from "../Post/PostCard";

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
});

const Profile = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const increasePost = () => {
    setTotal(total + 1);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("profileImage");
    fileInput.click();
  };

  const handleImageChange = (event) => {
    const formData = new FormData();

    formData.append("profileImage", event.target.files[0]);
    props.update("./api/users/image", formData);
  };

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
      <div className={classes.editImage}>
        <AvatarImage />
        <div>
          <Button className={classes.icon}>
            <input
              type="file"
              id="profileImage"
              hidden="hidden"
              onChange={handleImageChange}
            />
          </Button>
          <Button
            tip="Edit profile picture"
            onClick={handleEditPicture}
            btnClassName="button"
            className="editIcon"
          >
            <EditLocationOutlinedIcon />
          </Button>
        </div>
      </div>

      <Button className={classes.addIcon} onClick={handleClickOpen}>
        <AddCircleOutlineIcon fontSize="large" />
      </Button>

      <PostCard
        open={open}
        handleClose={handleClose}
        increasePost={increasePost}
        {...props}
      />
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
