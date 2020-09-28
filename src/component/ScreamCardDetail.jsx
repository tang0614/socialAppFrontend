import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ScreamCard from "./ScreamCard";
import Buttons from "./Buttons";

//Material UI
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux
import { connect } from "react-redux";
import { apiGetOneScreamBegan } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  disabled: {
    color: "#cccccc",
    cursor: "none",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  retweet_buttons: {
    width: 250,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  fullScreenScreamCard: {
    margin: "5rem 0",
  },
}));

const ScreamCardDetail = (props) => {
  const classes = useStyles(props);
  const {
    handleCloseFull,
    scream,
    handleClickOpen,
    openDelete,
    handleDeleteOpen,
    handleDeleteClose,
    retweet,
  } = props;

  useEffect(() => {
    console.log("scream detail using effect");
    getScreamDetail(scream._id);
  }, []);

  const getScreamDetail = (index) => {
    props.getScream(`/api/screams/${index}`);
  };

  let comments = props.post_loading ? (
    <CircularProgress />
  ) : props.post.comments_details ? (
    props.post.comments_details.map((comment, id) => {
      const re = props.screams.find((s) => s._id === comment._id);
      return <ScreamCard key={id} scream={re} isComment={true} />;
    })
  ) : (
    ""
  );

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseFull}
            aria-label="close"
          >
            <KeyboardBackspaceOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.fullScreenScreamCard}>
        <ScreamCard scream={scream} />
        <Buttons
          scream={scream}
          handleClickOpen={handleClickOpen}
          openDelete={openDelete}
          handleDeleteOpen={handleDeleteOpen}
          handleDeleteClose={handleDeleteClose}
          retweet={retweet}
        />
      </div>
      {comments}
    </div>
  );
};

ScreamCardDetail.propTypes = {
  scream: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  post: state.data.post,
  screams: state.data.screams,
  post_loading: state.data.post_loading,
});

const mapActionsToProps = (dispatch) => {
  return {
    getScream: (url) => dispatch(apiGetOneScreamBegan({ url })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ScreamCardDetail);