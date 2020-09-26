import React, { useState } from "react";
import PropTypes from "prop-types";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Tooltip from "@material-ui/core/Tooltip";
// REdux
import { connect } from "react-redux";
import { apiDeleteBegan } from "../store/actions";

const DeleteScream = (props) => {
  const { handleOpen, handleClose, open } = props;

  const deleteScream = () => {
    console.log("deleting scream");

    let ids_commentOn = [props._id];
    props.screams.forEach((scream) => {
      if (scream.commentOn === props._id) {
        ids_commentOn.push(scream._id);
      }
    });

    const data = {
      ids: ids_commentOn,
    };
    console.log("deleting ...", data);

    props.delete(`./api/screams/delete`, data);

    handleClose();
    // let ids_comments = [];
    // props.screams.forEach((scream) => {
    //   scream.comments.forEach((id) => {
    //     if (id === props._id) {
    //       ids_comments.push(id);
    //     }
    //   });
    // });

    // if (ids_comments) {
    //   ids_comments.forEach((i) => {
    //     props.delete(`./api/screams/${i}`, i);
    //   });
    // }
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
  screams: PropTypes.string.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  screams: state.data.screams,
});
//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    delete: (url, data) => dispatch(apiDeleteBegan({ url, data })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(DeleteScream);
