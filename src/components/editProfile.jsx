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
// Icons
import EditIcon from "@material-ui/icons/Edit";
import { apiPostBegan } from "../store/actions";
import { connect } from "react-redux";

class EditProfile extends Component {
  state = {
    location: "",
    bio: "",
    website: "",
    open: false,
  };

  componentDidMount() {
    const credentials = this.props.credentials;
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  }

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

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.postUserDetail("./user", userDetails);
    this.handleClose();
  };

  render() {
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName="button"
        >
          <EditIcon color="primary" />
          {<p style={{ fontSize: "12px" }}>Edit Profile</p>}
        </MyButton>

        <Dialog
          fullWidth
          maxWidth="sm"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Edit your profile details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Your personal/professinal website"
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Where you live"
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    postUserDetail: (url, data) =>
      dispatch(apiPostBegan({ url, data, reducer: "user" })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(EditProfile);
