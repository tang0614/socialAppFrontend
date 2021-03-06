import React  from "react";
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
  if (!props.screams||!props.otherUser) {
    paper = <CircularProgress />;
  } else {
    let data
    if (props.otherUser._id!==props._id){
      data = props.otherUser.like
    }else{
      data = props.like
    }

    let likes = [];
    data.forEach((element) => {
      likes.push(element._id);
    });
    const liked_posts = props.screams.filter((post) =>
      likes.includes(post._id)
    );
    paper = liked_posts.map((scream, id) => getScream(scream, id));
    
  }

  return <div className={classes.root}>{paper}</div>;
};


const mapStateToProps = (state) => ({
  screams: state.data.screams,
  like: state.user.user.like,
  _id:state.user.user._id,
});

export default connect(mapStateToProps)(MyLike);
