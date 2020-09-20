import React, { useState } from "react";
import PropTypes from "prop-types";
import Screams from "./Screams";
//Material UI
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { CssBaseline } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

//redux
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "rgb(0,15,45,0.9)",

    margin: "0 auto",
    width: "100%",
    height: "100vh",
  },
  appBar: {
    background: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "white",
    fontWeight: "600",
  },
  grid: {
    paddingTop: "1rem",
  },
  list: {
    backgroundColor: "rgb(0,15,45,0.9)",
    width: "20rem",
    height: "100vh",
    color: "white",
  },
  fullList: {
    width: "auto",
  },
  addIcon: {
    position: "absolute",
    bottom: "2rem",
    right: "1rem",
    color: "white",
  },
  menuIcon: {
    color: "white",
  },
}));

const Home = (props) => {
  const classes = useStyles(props);
  const [state, setState] = React.useState({
    left: false,
  });

  const handleLogout = () => {
    props.logout();
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Logout"].map((text, index) => (
          <ListItem button key={text} onClick={handleLogout}>
            <ListItemIcon>
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
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
            <MenuIcon />
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
      <Button className={classes.addIcon}>
        <AddCircleOutlineIcon fontSize="large" />
      </Button>
    </div>
  );
};

Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(null, mapActionsToProps)(Home);
