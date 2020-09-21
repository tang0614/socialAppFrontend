import React, { useState, useEffect } from "react";
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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";

//redux
import { connect } from "react-redux";
import { logoutUser, apiGetUserBegan } from "../../store/actions";
import ProfileList from "../Profile/ProfileList";
import AvatarImage from "./AvatarImage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",

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
    position: "absolute",
    bottom: "2rem",
    right: "1rem",
    color: "#1DA1F2",
  },
  menuIcon: {
    color: "#1DA1F2",
  },
  addNew: {
    position: "absolute",
    color: "#1DA1F2",
    right: 0,
  },
  errorMessage: {
    fontSize: "0.8rem",
    color: "red",
    textAlign: "center",
  },
}));

const Home = (props) => {
  const { currentUser } = props;
  console.log("currentUser is ", currentUser);
  const classes = useStyles(props);
  const [state, setState] = React.useState({
    left: false,
  });

  useEffect(() => {
    console.log("HOME DID MOUNT ");
    props.getUser(`/users/${currentUser._id}`);
  }, []);

  const handleLogout = () => {
    props.logout();
  };
  const handleProfile = () => {
    props.history.push("/profile");
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
        <ProfileList
          name={props.user.handle}
          following={props.user.following}
          followedBy={props.user.followedBy}
        />
        <ListItem button key={"Profile"} onClick={handleProfile}>
          <ListItemIcon>
            <ContactsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItem>

        <ListItem button key={"Logout"} onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
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

      {props.fetching_errors && (
        <Typography variant="body2" className={classes.errorMessage}>
          {props.fetching_errors}
        </Typography>
      )}
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

const mapStateToProps = (state) => ({
  user: state.user.user,
  fetch_loading: state.user.fetch_loading,
  fetch_errors: state.user.fetch_errors,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser()),
    getUser: (url) => dispatch(apiGetUserBegan({ url })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Home);
