import React, { useEffect, useState } from "react";
import Scream from "./Scream";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
// REdux
import { connect } from "react-redux";
import { apiGetScreamBegan } from "../../store/actions";
import { ScreenShare } from "@material-ui/icons";

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

  useEffect(() => {
    props.getPosts("./api/screams");
  }, [props.totalRetweet, props.totalComment]);

  const getScream = (scream, id) => {
    console.log("getScream is ", scream);
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
      console.log("passing scream, not comment, not tweet is ", scream);
      return <Scream key={id + "scream"} scream={scream} isComment={false} />;
    }
  };

  let paper;
  if (!props.screams) {
    paper = <CircularProgress />;
  } else {
    let data = props.screams
    console.log('props.query',props.query)
    if(props.query){
      data = data.filter((scream, id) => scream.body.toLowerCase().includes(props.query.toLowerCase()));
    }
    paper = data.map((scream, id) => getScream(scream, id));
  }



  return <div className={classes.screams}>{paper}</div>;
};

Screams.propTypes = {
  screams: PropTypes.string.isRequired,
  totalRetweet: PropTypes.number.isRequired,
  totalComment: PropTypes.number.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  screams: state.data.screams, //cannot query state.data.screams-scream is object
  totalRetweet: state.data.totalRetweet,
  totalComment: state.data.totalComment,
});

const mapActionsToProps = (dispatch) => {
  return {
    getPosts: (url) => dispatch(apiGetScreamBegan({ url })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Screams);
