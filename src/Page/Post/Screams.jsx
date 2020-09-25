import React, { useEffect, useState } from "react";
import Scream from "./Scream";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
// REdux
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  screams: {
    width: "90%",
    maxWidth: 545,
    margin: "2rem auto",
  },
  wrapper: {
    marginBottom: "1rem",

    borderLeft: "2px solid #1DA1F2",
  },
}));

const Screams = (props) => {
  const classes = useStyles(props);

  const getScream = (scream, id) => {
    const commentOn_id = scream.commentOn;

    if (commentOn_id) {
      const commentedScream = props.screams.find(
        (scream) => scream._id === commentOn_id
      );
      return (
        <div className={classes.wrapper}>
          <Scream key={id + "commentedScream"} scream={commentedScream} />
          <Scream key={id + "scream"} scream={scream} isComment={true} />
        </div>
      );
    } else {
      return <Scream key={id + "scream"} scream={scream} isComment={false} />;
    }
  };

  let paper;
  if (!props.screams) {
    paper = <CircularProgress />;
  } else {
    paper = props.screams.map((scream, id) => getScream(scream, id));
  }

  return <div className={classes.screams}>{paper}</div>;
};

Screams.propTypes = {
  screams: PropTypes.object.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  screams: state.data.screams, //cannot query state.data.screams-scream is object
});

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(Screams);
