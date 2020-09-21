import React from "react";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import AvatarImage from "../Home/AvatarImage";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
});

const Profile = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <ProfileHeader {...props} />
      <ProfileCard />
      <AvatarImage />
    </div>
  );
};

Profile.propTypes = {};

export default Profile;
