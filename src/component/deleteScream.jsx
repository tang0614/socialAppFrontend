import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Tooltip from "@material-ui/core/Tooltip";
// REdux
import { connect } from "react-redux";
import { apiDeleteBegan, apiUncommentBegan } from "../store/actions";
import { TagFacesTwoTone } from "@material-ui/icons";

const DeleteScream = (props) => {
  const { handleOpen, handleClose, open, scream } = props;

  function findCommentOn(target, ids) {
    props.screams.forEach((element) => {
      if (element.commentOn && element.commentOn === target._id) {
        ids.push(element._id);
        findCommentOn(element, ids);
      } else if (element.retweetOn && element.retweetOn === target._id) {
        ids.push(element._id);
        findCommentOn(element, ids);
      } else if (!element.commentOn) {
        return;
      }
    });
    return ids;
  }
  const deleteScream = () => {
    console.log("deleting scream");

    let ids = [scream._id];

    if (scream.commentOn) {
      const source = {
        comment_id: scream._id,
        commented_id: scream.commentOn,
      };
      props.uncomment(`./api/screams/uncomment`, source);
    }

    ids = findCommentOn(scream, ids);
    console.log("ids is", ids);
    const data = { ids };
    setTimeout(() => {
      props.delete(`./api/screams/delete`, data, props.history);
    }, 1000);

    handleClose();
  };

  return (
    <div>
      <Tooltip onClick={handleOpen} title={"delete"}>
        <DeleteOutline />
      </Tooltip>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this tweet ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteScream.propTypes = {
  delete: PropTypes.func.isRequired,
  uncomment: PropTypes.func.isRequired,
  screams: PropTypes.string.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  screams: state.data.screams,
});
//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    delete: (url, data, history) =>
      dispatch(apiDeleteBegan({ url, data, history })),
    uncomment: (url, userData) =>
      dispatch(apiUncommentBegan({ url, userData })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(DeleteScream));
