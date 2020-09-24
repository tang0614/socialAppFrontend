import React, { useState } from "react";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import { apiPostScreamBegan } from "../store/actions";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  cancelIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
    margin: 0,
  },
  errorMessage: {
    fontSize: "0.8rem",
    color: "red",
    textAlign: "center",
  },
}));

const PostCard = (props) => {
  const classes = useStyles(props);

  //props to open and close current component/Dialog
  const { handleClose, open } = props;

  //state to control the content of tweet
  const [body, setBody] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      body,
    };
    props.postScream("./api/screams", userData, handleClose);
  };

  const validHandler = (value) => {
    if ((value.length > 200) | (value.length < 3))
      return "length should be smaller than 200 and greater than 3";
  };

  const handleChange = (event) => {
    setBody(event.target.value);
    const message = validHandler(event.target.value);
    if (!message) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={"100%"}
    >
      <Button
        className={classes.cancelIcon}
        onClick={handleClose}
        color="primary"
      >
        <CloseIcon />
      </Button>

      <DialogTitle id="form-dialog-title">What's happening ?</DialogTitle>
      <DialogContent>
        <TextField
          id="tweet"
          multiline
          rows={4}
          defaultValue={body}
          onChange={handleChange}
          variant="outlined"
          fullWidth={"100%"}
        />

        {props.errors && (
          <Typography variant="body2" className={classes.errorMessage}>
            {props.errors}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Tweet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PostCard.propTypes = {
  postScream: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.data.post_errors,
});

const mapActionsToProps = (dispatch) => {
  return {
    postScream: (url, userData, handle) =>
      dispatch(apiPostScreamBegan({ url, userData, handle })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(PostCard);
