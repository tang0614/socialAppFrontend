import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import AvatarImage from "../Home/AvatarImage";
import Button from "@material-ui/core/Button";
import EditProfile from "./EditProfile";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

//redux
import { connect } from "react-redux";
import { apiPutUserBegan } from "../../store/actions";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  button: {
    position: "absolute",
    right: 0,
    margin: "1em",
  },

  editImage: {
    position: "absolute",
    left: "15%",
    top: "35%",
    margin: "1em",
  },
  addIcon: {
    position: "absolute",
    bottom: "2rem",
    right: "1rem",
    color: "#1DA1F2",
  },
});

const Profile = (props) => {
  const classes = useStyles(props);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("profileImage");
    fileInput.click();
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    console.log(formData);
    formData.append("profileImage", image, image.name);

    props.uploadImage("./api/users/image", image);

    if (props.errors) {
      alert("something failed");
    }
  };

  return (
    <div className={classes.root}>
      <ProfileHeader {...props} />
      <ProfileCard />
      <AvatarImage imageUrl={props.user.imageUrl} />
      <Button className={classes.editImage}>
        <input
          type="file"
          id="profileImage"
          hidden="hidden"
          onChange={handleImageChange}
        />
        <Button
          tip="Edit profile picture"
          onClick={handleEditPicture}
          btnClassName="button"
        >
          <EditOutlinedIcon />
        </Button>
      </Button>

      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleOpen}
      >
        Edit Profile
      </Button>

      <EditProfile open={open} handleClose={handleClose} {...props} />
      <Button className={classes.addIcon}>
        <AddCircleOutlineIcon fontSize="large" />
      </Button>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  //   loading: PropTypes.bool.isRequired,
  //   errors: PropTypes.string.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  user: state.user.user,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    uploadImage: (url, userData) =>
      dispatch(apiPutUserBegan({ url, userData })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Profile);
