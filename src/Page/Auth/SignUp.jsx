import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const SignUp = (props) => {
  const { open, handleClose } = props;
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setrepeat_password] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
      repeat_password,
      handle,
    };

    console.log("sign up successfully", userData);
  };

  const handleChange = (event) => {
    const name = event.target.name;

    if (name === "handle") {
      setHandle(event.target.value);
    } else if (name === "password") {
      setPassword(event.target.value);
    } else if (name === "email") {
      setEmail(event.target.value);
    } else {
      setrepeat_password(event.target.value);
    }
    // const message = this.validHandler(event.target.value, event.target.name);
    // const error = { ...this.state.error };
    // error[name] = message;
    // if (!message) {
    //   this.setState({ disabled: false });
    // } else {
    //   this.setState({ disabled: true });
    // }

    // this.setState({ error });
    // this.setState({ [event.target.name]: event.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create your account</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText> */}

        <TextField
          id="handle"
          name="handle"
          type="handle"
          label="User Name"
          value={handle}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id="repeat_password"
          name="repeat_password"
          type="password"
          label="Confirm password"
          value={repeat_password}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSignUpSubmit} color="primary">
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SignUp.propTypes = {};

export default SignUp;
