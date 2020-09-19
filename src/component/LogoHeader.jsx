import React from "react";
import PropTypes from "prop-types";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "none",
    fontFamily: "font-family: 'Roboto', sans-serif",
  },
  twitterIcon: {
    color: "white",
    fontSize: "4rem",
  },

  wrapper: {
    width: "90%",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "500",
    textAlign: "start",
  },

  note: {
    fontSize: "1rem",
    textAlign: "start",
    fontWeight: "500",
  },
}));

const LogoHeader = (props) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appBar} elevation={0}>
        <Toolbar>
          <IconButton>
            <TwitterIcon className={classes.twitterIcon} />
          </IconButton>
        </Toolbar>
        <div className={classes.wrapper}>
          <p className={classes.title}>
            See what's happening in the world right now
          </p>
          <p className={classes.note}>Join twitter today.</p>
        </div>
      </AppBar>
    </div>
  );
};

LogoHeader.propTypes = {};

export default LogoHeader;
