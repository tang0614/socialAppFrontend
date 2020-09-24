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

const useStyles = makeStyles((theme) => ({
  cancelIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
    margin: 0,
  },
}));

const PostCard = (props) => {
  const classes = useStyles(props);
  const { handleClose, open } = props;
  const [body, setBody] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      body,
    };

    console.log("userData", userData);
    props.postScream("./api/screams", userData);
    handleClose();
  };
  const validHandler = (value) => {
    if (value.length > 200) return "length should be smaller than 200";
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
    <div>
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
    </div>
  );
};

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    postScream: (url, userData) =>
      dispatch(apiPostScreamBegan({ url, userData })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(null, mapActionsToProps)(PostCard);
