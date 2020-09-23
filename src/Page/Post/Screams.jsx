import React, { useEffect, useState } from "react";
import Scream from "./Scream";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// REdux
import { connect } from "react-redux";
import { apiGetScreamBegan } from "../../store/actions";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  screams: {
    maxWidth: 345,
    margin: "2rem auto",
  },
}));

const Screams = (props) => {
  const classes = useStyles(props);
  useEffect(() => {
    console.log(" Screams useEffect fetching screams", props.data);
    props.getAllScreams("./api/screams");
  }, []);

  let paper;
  if (!props.data.screams) {
    paper = <CircularProgress />;
  } else {
    paper = props.data.screams.map((scream, id) => (
      <Scream key={id + "scream"} scream={scream} />
    ));
  }

  return <div className={classes.screams}>{paper}</div>;
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  data: state.data, //cannot query state.data.screams-scream is object
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    getAllScreams: (url) => dispatch(apiGetScreamBegan({ url })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Screams);
