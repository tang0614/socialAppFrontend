import React, { useState, useEffect } from "react";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { CssBaseline } from "@material-ui/core";

// Redux

import ProfileButton from "./ProfileButton";
import SearchBox from "./SearchBox";
import LoginButton from "./LoginButton";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    margin: "0 auto",
    width: "100%",
  },
  appBar: {
    background: "none",
  },
 
  toolbar:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
 
  }
}));

const Home = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <ProfileButton/>
          <SearchBox query={props.query} setQuery={props.setQuery} submit={props.search}/>
          <LoginButton/>
        </Toolbar>
      </AppBar>
    </div>
  );
};



export default (Home);
