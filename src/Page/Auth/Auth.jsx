import React from "react";
import PropTypes from "prop-types";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import LogoHeader from "../../component/LogoHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(/image/background.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    width: "100%",
  },

  buttonSignUp: {
    width: "50%",
    padding: "0.5rem",
    margin: "1rem 0",
    borderRadius: "20%",
    backgroundColor: "white",
    color: "black",
  },
  buttonLogIn: {
    width: "50%",
    padding: "0.5rem",
    margin: "1rem 0",
    borderRadius: "20%",
    backgroundColor: "#33C0FF",
  },
}));

const Auth = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <LogoHeader />
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonSignUp}
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="black"
            className={classes.buttonLogIn}
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
};

Auth.propTypes = {};

export default Auth;
