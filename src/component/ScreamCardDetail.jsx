import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ScreamCard from "./ScreamCard";
import Buttons from "./Buttons";
import DeleteScream from "./deleteScream";
//Material UI
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
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

  const buttons = scream.body.startsWith("retweet") ? (
    ""
  ) : (
    <div className={classes.buttons}>
      <Tooltip onClick={handleClickOpen} title={"comment"}>
        <Button>
          <ChatBubbleOutlineIcon />
        </Button>
      </Tooltip>

      <Tooltip onClick={retweet} title={"retweet"}>
        <Button>
          <RoundedCornerIcon />
        </Button>
      </Tooltip>

      <FavoriteBorderIcon />

      {scream.author === props.user._id ? (
        <DeleteScream
          _id={scream._id}
          handleOpen={handleDeleteOpen}
          handleClose={handleDeleteClose}
          open={openDelete}
        />
      ) : (
        <Tooltip title={"delete disabled"} className={classes.disabled}>
          <DeleteOutline disabled />
        </Tooltip>
      )}
    </div>
  );

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
