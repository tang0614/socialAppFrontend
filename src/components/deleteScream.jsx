import React, { Component } from "react";
import MyButton from "../util/myButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

//redux
import { connect } from "react-redux";

import { apiDeleteBegan } from "../store/actions";

class DeleteScream extends Component {
  //open and close window
  // delete button - onclick function -
  // state: open: true or false
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    console.log("deleting scream");
    this.props.delete(this.props.screamId, this.props.history);
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <MyButton tip="Delete Scream" onClick={this.handleOpen}>
          <DeleteOutline color="secondary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this scream ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    delete: (screamId, history) =>
      dispatch(apiDeleteBegan({ screamId, history })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(null, mapActionsToProps)(DeleteScream);
