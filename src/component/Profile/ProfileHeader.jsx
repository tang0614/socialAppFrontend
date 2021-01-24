import React from "react";
import PropTypes from "prop-types";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { CssBaseline } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    margin: "0 auto",
    width: "100%",
    height: "10rem",
  },
  appBar: {
    background: "none",
  },
  backIcon: {
    color: "#1DA1F2",
  },
  title: {
    color: "black",
    fontWeight: "600",
  },
}));

const ProfileHeader = (props) => {
  const classes = useStyles(props);
  const goBackHome = () => {
    props.history.push("/home");
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Button className={classes.backIcon} onClick={goBackHome}>
            <ArrowBackIcon />
          </Button>

          <Typography variant="h6" className={classes.title}>
            Back
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};


export default ProfileHeader;
