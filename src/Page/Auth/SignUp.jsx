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
//redux
import { connect } from "react-redux";
import { apiCallBegan } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    fontSize: "0.8rem",
    color: "red",
    textAlign: "center",
  },
}));

const SignUp = (props) => {
  const classes = useStyles(props);
  const { open, handleClose } = props;
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat_password, setrepeat_password] = useState("");

  const [handleError, setHandleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeat_passwordError, setrepeat_passwordError] = useState("");

  const [disabled, setDisabled] = useState(false);

  const handleServer = () => {
    const userData = {
      email,
      password,
      repeat_password,
      handle,
    };
    props.signup("./api/users", userData, props.history);
  };
  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    handleServer();
    console.log("handling server..");
  };

  const validHandler = (value, name) => {
    if (name === "email") {
      const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
      if (!value.match(regEx)) {
        return "Please enter correct format";
      }
    } else if (name === "repeat_password") {
      return value !== password ? "password must be same" : "";
    } else {
      return value.length >= 6 ? "" : "length should be longer than 6";
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const message = validHandler(event.target.value, event.target.name);

    if (name === "handle") {
      setHandle(event.target.value);
      setHandleError(message);
    } else if (name === "password") {
      setPassword(event.target.value);
      setPasswordError(message);
    } else if (name === "email") {
      setEmail(event.target.value);
      setEmailError(message);
    } else {
      setrepeat_password(event.target.value);
      setrepeat_passwordError(message);
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
      <DialogTitle id="form-dialog-title">Create your account</DialogTitle>
      <DialogContent>
        <TextField
          id="handle"
          name="handle"
          type="handle"
          label="User Name"
          value={handle}
          onChange={handleChange}
          helperText={handleError}
          error={handleError ? true : false}
          fullWidth
        />

        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={handleChange}
          helperText={emailError}
          error={emailError ? true : false}
          fullWidth
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={password}
          onChange={handleChange}
          helperText={passwordError}
          error={passwordError ? true : false}
          fullWidth
        />
        <TextField
          id="repeat_password"
          name="repeat_password"
          type="password"
          label="Confirm password"
          value={repeat_password}
          onChange={handleChange}
          helperText={repeat_passwordError}
          error={repeat_passwordError ? true : false}
          fullWidth
        />
      </DialogContent>
      {props.errors && (
        <Typography variant="body2" className={classes.errorMessage}>
          {props.errors}
        </Typography>
      )}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSignUpSubmit}
          color="primary"
          disabled={disabled}
        >
          Sign Up
          {props.loading && <CircularProgress size={10} />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.string.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  loading: state.user.loading,
  errors: state.user.errors,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    signup: (url, userData, history) =>
      dispatch(apiCallBegan({ userData, url, history })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(SignUp);
