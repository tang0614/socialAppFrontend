import React, { useState } from "react";
//redux
import { connect } from "react-redux";
import { apiPostCommentBegan, apiPutCommentBegan } from "../../store/actions";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import ScreamCard from "./ScreamCard";
import { getComment } from "../../store/helpers";

const useStyles = makeStyles((theme) => ({
  cancelIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
    margin: 0,
  },
}));

const PostScream = (props) => {
  const classes = useStyles(props);
  const { handleClose, open } = props;
  const { _id } = props.scream;

  const [body, setBody] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      body,
    };
    
    props.postComment("./api/screams", userData);

    try {
      setTimeout(() => {
        const comment_id = getComment();
        const userData = {
          comment_id: comment_id,
          commented_id: _id,
        };

        props.putCommentDetail(`./api/screams/comment`, userData);
      }, 1000);
      setBody("");
    } catch (err) {
      alert("internet error, fail to comment");
    }

    handleClose();
  };

  const validHandler = (value) => {
    if (value.length > 200 || value.length < 3)
      return "length should be smaller than 200 and smaller than 3 characters";
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

      <ScreamCard scream={props.scream} />

      <DialogContent>
        <TextField
          id="tweet"
          multiline
          rows={4}
          defaultValue={body}
          onChange={handleChange}
          variant="outlined"
          fullWidth={"100%"}
          label="Tweet your reply"
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
  );
};

const mapStateToProps = (state) => ({
 
 
});

const mapActionsToProps = (dispatch) => {
  return {
    postComment: (url, userData) =>
      dispatch(apiPostCommentBegan({ url, userData })),
    putCommentDetail: (url, userData) =>
      dispatch(apiPutCommentBegan({ url, userData })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(PostScream);
