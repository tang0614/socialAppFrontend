import React, { useEffect, useState } from "react";
import Scream from "./Scream";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
// REdux
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  screams: {
    maxWidth: 512,
    margin: "0 auto",
    marginTop: "2rem",
  },
  wrapper: {
    margin: "1rem 0",
    borderLeft: "3px solid #1DA1F2",
  },
}));

const Screams = (props) => {
  const classes = useStyles(props);

  const getScream = (scream, id) => {
    console.log("scream is ", scream);
    if (scream.commentOn) {
      const commented_id = scream.commentOn;

      const commentedScream = props.screams.find(
        (scream) => scream._id === commented_id
      );

      return (
        <div className={classes.wrapper}>
          {scream.body.startsWith("retweet") ? (
            <Scream key={id + "Scream"} scream={scream} isComment={false} />
          ) : (
            <div>
              <Scream key={id + "commentedScream"} scream={commentedScream} />
              <Scream
                key={id + "commentingScream"}
                scream={scream}
                isComment={true}
              />{" "}
            </div>
          )}
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
    console.log("props.screams", props.screams);
    paper = props.screams.map((scream, id) => getScream(scream, id));
  }

  return <div className={classes.screams}>{paper}</div>;
};

Screams.propTypes = {
  screams: PropTypes.string.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  screams: state.data.screams, //cannot query state.data.screams-scream is object
});

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(Screams);
