import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Scream from "../Post/Scream";
// REdux
import { connect } from "react-redux";

//materialUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",

    maxWidth: 512,
    margin: "0 auto",
    marginTop: "300px",
  },
  wrapper: {
    margin: "1rem 0",
    borderLeft: "3px solid #1DA1F2",
  },
});

const MyComment = (props) => {
  const classes = useStyles(props);

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
      return "";
    }
  };

  let paper;
  if (!props.screams) {
    paper = <CircularProgress />;
  } else {
    const personal_posts = props.screams.filter(
      (post) => post.author === props.user._id
    );

    paper = personal_posts.map((scream, id) => getScream(scream, id));
  }

  return <div className={classes.root}>{paper}</div>;
};

MyComment.propTypes = {
  screams: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  screams: state.data.screams,
  user: state.user.user,
});

export default connect(mapStateToProps)(MyComment);
