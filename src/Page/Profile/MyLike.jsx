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

const MyLike = (props) => {
  const classes = useStyles(props);

  const getScream = (scream, id) => {
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
    let likes = [];
    props.user.like.forEach((element) => {
      likes.push(element._id);
    });

    const liked_posts = props.screams.filter((post) =>
      likes.includes(post._id)
    );
    paper = liked_posts.map((scream, id) => getScream(scream, id));
  }

  return <div className={classes.root}>{paper}</div>;
};

MyLike.propTypes = {
  screams: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  screams: state.data.screams,
  user: state.user.user,
});

export default connect(mapStateToProps)(MyLike);
