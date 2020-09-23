import React, { Component, Fragment } from "react";
import MyButton from "../util/myButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import CommentIcon from "@material-ui/icons/Comment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// REdux
import { connect } from "react-redux";
import { apiPostBegan } from "../store/actions";

class CommentButton extends Component {
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
    const newComment = {
      body: this.state.body,
      commentOn: this.props.screamId,
    };

    this.props.postComment(
      `./scream/${this.props.screamId}/comment`,
      newComment
    );

    this.props.postScream("./scream", newComment);
    this.handleClose();
  };
  render() {
    const info = (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img
            src={this.props.userImage}
            alt="Profile"
            style={{
              width: "100%",
              maxWidth: "100",
              height: "100",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${this.props.userHandle}`}
          >
            @{this.props.userHandle}
          </Typography>
          <hr />
          <Typography variant="body2" color="textSecondary">
            {dayjs(this.props.createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr />
          <Typography variant="body1">{this.props.body}</Typography>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        {!this.props.authenticated ? (
          <Link to="/login">
            <MyButton tip="Comment">
              <CommentIcon color="primary" />
            </MyButton>
          </Link>
        ) : (
          <MyButton tip="Comment" onClick={this.handleOpen}>
            <CommentIcon color="primary" />
          </MyButton>
        )}

        <Dialog
          fullWidth
          maxWidth="sm"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Comment</DialogTitle>
          <DialogContentText>{info}</DialogContentText>
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

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    postScream: (url, data) =>
      dispatch(apiPostBegan({ url, data, reducer: "data" })),

    postComment: (url, data) =>
      dispatch(apiPostBegan({ url, data, reducer: "comment" })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CommentButton);
