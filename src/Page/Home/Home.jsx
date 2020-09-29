import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Screams from "../Post/Screams";
import ProfileList from "../../component/ProfileList";
import AvatarImage from "../../component/AvatarImage";
import PostCard from "../../component/PostCard";

//Material UI
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Hidden from "@material-ui/core/Hidden";
import Fab from "@material-ui/core/Fab";
// Redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    margin: "0 auto",
    width: "100%",
  },
  appBar: {
    background: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#1DA1F2",
    fontWeight: "600",
  },
  grid: {
    paddingTop: "1rem",
  },
  list: {
    backgroundColor: "#fff",
    width: "20rem",
    height: "100vh",
    color: "black",
  },
  fullList: {
    width: "auto",
  },
  addIcon: {
    position: "fixed",
    color: "#1DA1F2",

    bottom: "3rem",
    right: "3rem",
  },
  menuIcon: {
    color: "#1DA1F2",
  },
  imageContainer: {
    width: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(/image/twitterLogo.jpg)`,
    backgroundRepeat: "repeat",
  },
}));

const Home = (props) => {
  const classes = useStyles(props);

  //open for toggleDrawer
  const [state, setState] = React.useState({
    left: false,
  });
  //open for new post
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //toggleDrawer
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ProfileList {...props} />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Button
            onClick={toggleDrawer("left", true)}
            className={classes.menuIcon}
          >
            <AvatarImage isTweet={false} />
          </Button>

          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>

      <Grid container>
        <Grid item xs={12} sm={6} container>
          <Screams />
        </Grid>
        <Grid item sm={6} className={classes.imageContainer}>
          <Hidden xsDown>
            <ButtonBase className={classes.image}></ButtonBase>
          </Hidden>
        </Grid>
      </Grid>

      <Fab
        color="primary"
        size="medium"
        className={classes.addIcon}
        onClick={handleOpen}
      >
        <AddCircleOutlineIcon fontSize="large" />
      </Fab>

      <PostCard open={open} handleClose={handleClose} {...props} />
    </div>
  );
};

Home.propTypes = {
  delete_loading: PropTypes.bool.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  delete_loading: state.data.delete_loading,
});

export default connect(mapStateToProps)(Home);
