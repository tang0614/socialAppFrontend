import React, { useState } from "react";
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
import Typography from "@material-ui/core/Typography";
import AvatarImage from "../Home/AvatarImage";
import AddIcon from "@material-ui/icons/Add";

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

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");

  const [disabled, setDisabled] = useState(false);

  // const handleServer = () => {
  //   const userData = {
  //     email,
  //     password,
  //   };
  //   props.login("./auth", userData, props.history);
  // };
  const handleLogInSubmit = (event) => {
    event.preventDefault();
    console.log("submit..");
    // handleServer();
    // console.log("handling server..");
  };

  // const validHandler = (value, name) => {
  //   if (name === "email") {
  //     const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  //     if (!value.match(regEx)) {
  //       return "Please enter correct format";
  //     }
  //   } else {
  //     return value.length >= 6 ? "" : "length should be longer than 6";
  //   }
  // };

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const message = validHandler(event.target.value, event.target.name);

  //   if (name === "password") {
  //     setPassword(event.target.value);
  //     setPasswordError(message);
  //   } else if (name === "email") {
  //     setEmail(event.target.value);
  //     setEmailError(message);
  //   }

  //   if (!message) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>

      <div className={classes.editImage}>
        <AvatarImage />
        <Button className={classes.button}>
          <AddIcon />
        </Button>
      </div>

      <DialogContent>
        <TextField id="bio" name="bio" type="bio" label="bio" fullWidth />
        <TextField
          id="location"
          name="location"
          type="location"
          label="location"
          fullWidth
        />
        <TextField
          id="website"
          name="website"
          type="website"
          label="website"
          fullWidth
        />
      </DialogContent>
      {/* {props.errors && (
        <Typography variant="body2" className={classes.errorMessage}>
          {props.errors}
        </Typography>
      )} */}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogInSubmit} color="primary" disabled={disabled}>
          Save
          {/* {props.loading && <CircularProgress size={10} />} */}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditProfile.propTypes = {};

export default EditProfile;
