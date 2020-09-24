import React, { useEffect, useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import AvatarImage from "../../component/AvatarImage";
import Button from "@material-ui/core/Button";
import EditLocationOutlinedIcon from "@material-ui/icons/EditLocationOutlined";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import PostCard from "../../component/PostCard";
//redux
import { connect } from "react-redux";
import { apiPutUserBegan, apiGetUserBegan } from "../../store/actions";

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
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);

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
            aria-owns={openPop ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <EditLocationOutlinedIcon />
          </Button>
        </div>
        <div>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            open={openPop}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>Edit Image (within 1024*1024 jpg/png).</Typography>
          </Popover>
        </div>
      </div>

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
