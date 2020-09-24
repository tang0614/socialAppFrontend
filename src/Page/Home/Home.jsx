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
    right: 0,
    bottom: 0,
    padding: "2rem",
  },
  menuIcon: {
    color: "#1DA1F2",
  },

  errorMessage: {
    fontSize: "0.8rem",
    color: "red",
    textAlign: "center",
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
            <AvatarImage />
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

      <Screams />

      <Button className={classes.addIcon} onClick={handleOpen}>
        <AddCircleOutlineIcon fontSize="large" />
      </Button>

      <PostCard open={open} handleClose={handleClose} {...props} />
    </div>
  );
};

//connect subscribe/unsubscribe the redux store
export default Home;
