import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Scream from "../../Page/Post/Scream";
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
    marginTop: "250px",
  },
  wrapper: {
    margin: "1rem 0",
    borderLeft: "3px solid #1DA1F2",
  },
});

const MyTweet = (props) => {
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
      return <Scream key={id + "scream"} scream={scream} isComment={false} />;
    }
  };

  let paper;
  if (!props.screams) {
    paper = <CircularProgress />;
  } else {
    const personal_posts = props.screams.filter(
      (post) => post.author === props.handleId
    );

    paper = personal_posts.map((scream, id) => getScream(scream, id));
  }

  return <div className={classes.root}>{paper}</div>;
};

const mapStateToProps = (state) => ({
  screams: state.data.screams,
 
});

export default connect(mapStateToProps)(MyTweet);
