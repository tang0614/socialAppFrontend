import React, { useEffect, useState } from "react";
import Scream from "./Scream";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// REdux
import { connect } from "react-redux";
import { apiGetScreamBegan } from "../../store/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getCurrentUser } from "../../store/helpers";

const useStyles = makeStyles((theme) => ({
  screams: {
    width: "90%",
    maxWidth: 545,
    margin: "2rem auto",
  },
}));

const Screams = (props) => {
  const classes = useStyles(props);

  useEffect(() => {
    props.getAllScreams("./api/screams");
  }, []);

  const getScream = (scream, id) => {
    const commentOn_id = scream.commentOn;
    if (scream.commentOn) {
      const commentedScream = props.data.screams.find(
        (scream) => scream._id === commentOn_id
      );
      return (
        <div>
          <Scream key={id + "commentedScream"} scream={commentedScream} />
          <Scream key={id + "scream"} scream={scream} isComment={true} />
        </div>
      );
    } else {
      return <Scream key={id + "scream"} scream={scream} isComment={false} />;
    }
  };

  let paper;
  if (!props.data.screams) {
    paper = <CircularProgress />;
  } else {
    paper = props.data.screams.map((scream, id) => getScream(scream, id));
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
