import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Screams from "../components/screams/screams";
import Profile from "../components/profile";

class Home extends Component {
  render() {
    return (
      <Grid container spacing={10} sx={12}>
        <Grid item sm={7} sx={12}>
          <Screams />
        </Grid>
        <Grid item sm={5} sx={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

//connect subscribe/unsubscribe the redux store
export default Home;
