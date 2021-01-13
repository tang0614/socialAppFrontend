import React, { useEffect} from "react";
import Scream from "./Scream";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
// REdux
import { connect } from "react-redux";
import { apiGetScreamBegan } from "../../store/actions";
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
   
    if (scream.commentOn) {
      const commented_id = scream.commentOn;
      const commentedScream = props.screams.find(
        (scream) => scream._id === commented_id
      );

      return (
        <div key={scream._id + "Scream"}  className={classes.wrapper}>
          {scream.body.startsWith("retweet") ? (
            <Scream key={id + "Scream"} scream={scream} isComment={false} />
          ) : (
            <div>
              <Scream key={id + + "commentedScream"} scream={commentedScream} />
              <Scream
                key={id + + "commentingScream"}
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
    let data = props.screams
    if(props.query){
      data = data.filter((scream) => scream.body.toLowerCase().includes(props.query.toLowerCase()));
    }
    paper = data.map((scream, id) => getScream(scream, id));
  }

  return <div className={classes.screams}>{paper}</div>;
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