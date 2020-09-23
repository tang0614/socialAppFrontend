import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import AvatarImage from "../Home/AvatarImage";

//redux
import { connect } from "react-redux";
import { apiPutUserBegan } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    fontSize: "0.8rem",
    color: "red",
    textAlign: "center",
  },
  editImage: {
    position: "relative",
  },
  button: {
    position: "absolute",
    bottom: "25%",
    left: "5%",
  },
}));

const EditProfile = (props) => {
  const classes = useStyles(props);
  const { open, handleClose } = props;

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const [bioError, setBioError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const { bio, location, website } = props.user;
    setBio(bio);
    setLocation(location);
    setWebsite(website);
  }, []);

  const handleServer = () => {
    const userData = {
      bio,
      location,
      website,
    };

    props.update("./api/users/details", userData);

    if (props.errors) {
      alert("something failed");
    } else {
      handleClose();
    }
  };

  const handleLogInSubmit = (event) => {
    event.preventDefault();
    handleServer();
    console.log("handling server..");
  };

  const validHandler = (value, name) => {
    if (name === "website") {
      return value.length >= 5 && value.length <= 50
        ? ""
        : "length should be longer than 5 smaller than 50";
    } else if (name === "bio") {
      return value.length >= 5 && value.length <= 200
        ? ""
        : "length should be longer than 5 smaller than 200";
    } else {
      return value.length >= 5 && value.length <= 30
        ? ""
        : "length should be longer than 5 smaller than 30";
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const message = validHandler(event.target.value, event.target.name);

    if (name === "bio") {
      setBio(event.target.value);
      setBioError(message);
    } else if (name === "location") {
      setLocation(event.target.value);
      setLocationError(message);
    } else {
      setWebsite(event.target.value);
      setWebsiteError(message);
    }

    if (!message) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>

      <div className={classes.editImage}>
        <AvatarImage />
      </div>

      <DialogContent>
        <TextField
          id="bio"
          name="bio"
          type="bio"
          label="bio"
          value={bio}
          onChange={handleChange}
          helperText={bioError}
          error={bioError ? true : false}
          fullWidth
        />
        <TextField
          id="location"
          name="location"
          type="location"
          label="location"
          value={location}
          onChange={handleChange}
          helperText={locationError}
          error={locationError ? true : false}
          fullWidth
        />
        <TextField
          id="website"
          name="website"
          type="website"
          label="website"
          value={website}
          onChange={handleChange}
          helperText={websiteError}
          error={websiteError ? true : false}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogInSubmit} color="primary" disabled={disabled}>
          Save
          {props.loading && <CircularProgress size={10} />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.string.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
  errors: state.user.errors,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    update: (url, userData) => dispatch(apiPutUserBegan({ userData, url })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
