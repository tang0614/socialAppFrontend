import React from "react";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import AvatarImage from "../Home/AvatarImage";
import Button from "@material-ui/core/Button";
import EditProfile from "./EditProfile";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
  const { currentUser } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ProfileHeader {...props} />
      <ProfileCard currentUser={currentUser} />
      <AvatarImage />
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={handleOpen}
      >
        Edit Profile
      </Button>
      <EditProfile open={open} handleClose={handleClose} />
      <Button className={classes.addIcon}>
        <AddCircleOutlineIcon fontSize="large" />
      </Button>
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
