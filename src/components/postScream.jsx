import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/myButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";

// Icons
import { apiPostBegan } from "../store/actions";
import { connect } from "react-redux";

class PostScream extends Component {
  state = {
    body: "",
    open: false,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      body: this.state.body,
    };

    this.props.postScream("./scream", newPost);
    this.handleClose();
  };

  render() {
    return (
      <Fragment>
        <MyButton tip="Add" onClick={this.handleOpen} btnClassName="button">
          <AddIcon color="primary" />
          {<p style={{ fontSize: "12px" }}>Post Scream</p>}
        </MyButton>

        <Dialog
          fullWidth
          maxWidth="sm"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Scream at your fellow apes"
                // error={errors.body ? true : false}
                // helperText={errors.body}
                // className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                // className={classes.submitButton}
                // disabled={loading}
              >
                Submit
                {/* {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )} */}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

//state from the store, and properties of this object become our props
// const mapStateToProps = (state) => ({
//   credentials: state.user.credentials,
// });

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    postScream: (url, data) =>
      dispatch(apiPostBegan({ url, data, reducer: "data" })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(null, mapActionsToProps)(PostScream);
