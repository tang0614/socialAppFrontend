import React, { useState } from "react";
import PropTypes from "prop-types";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// REdux
import { connect } from "react-redux";
import { apiDeleteBegan } from "../store/actions";

const DeleteScream = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteScream = () => {
    console.log("deleting scream");
    props.delete(`./api/screams/${props._id}`, props._id);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <DeleteOutline color="secondary" />
      </Button>

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
};

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    delete: (url, _id) => dispatch(apiDeleteBegan({ url, _id })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(null, mapActionsToProps)(DeleteScream);
