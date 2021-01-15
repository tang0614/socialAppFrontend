import React, { useState, useEffect } from "react";
import ScreamCard from "../../component/ScreamCard";
import Comment from "../../component/comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ScreamCardDetail from "../../component/ScreamCardDetail";
import Buttons from "../../component/Buttons";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
// Redux
import { connect } from "react-redux";
import ScreamHeader from "../../component/ScreamHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 512,
    margin: "0 auto",
    padding: 0,
    boxShadow: "none",
    borderBottom: "1px dotted #cccccc",
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Scream = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);
  const scream = props.scream;
  const [open, setOpen] = useState(false);
  const [open_full, setOpen_full] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  
  const handleDeleteOpen = () => {setOpenDelete(true);};
  const handleDeleteClose = () => {setOpenDelete(false);};

  const handleClickOpen = () =>  {setOpen(true)};
  const handleClickClose = () => {setOpen(false);};

  const handleCloseFull = () => {setOpen_full(false);};
  const handleOpenFull = () => {setOpen_full(true);};

  const screamCard = props.isRetweet ? (
    <div>
      <ScreamCard
        scream={scream}
        isComment={props.isComment}
        isRetweet={props.isRetweet}
      />
    </div>
  ) : (
    <Button 
    disabled={props.authenticated?false:true}
    onClick={handleOpenFull}>
      <ScreamCard
        scream={scream}
        isComment={props.isComment}
        isRetweet={props.isRetweet}
      />
    </Button>
  );
  return (
    <div>
      <Card className={classes.root}>
      
        <ScreamHeader scream={scream} />
        {screamCard}
        <Buttons
          scream={scream}
          handleClickOpen={handleClickOpen}
          openDelete={openDelete}
          handleDeleteOpen={handleDeleteOpen}
          handleDeleteClose={handleDeleteClose}
        />
        <Comment
          open={open}
          handleClose={handleClickClose}
          scream={scream}
          {...props}
        />
      </Card>

      <Dialog
        fullScreen
        open={open_full}
        onClose={handleCloseFull}
        TransitionComponent={Transition}
      >
        <ScreamCardDetail
          handleCloseFull={handleCloseFull}
          scream={scream}
          handleClickOpen={handleClickOpen}
          openDelete={openDelete}
          handleDeleteOpen={handleDeleteOpen}
          handleDeleteClose={handleDeleteClose}
        />
      </Dialog>
    </div>
  );
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  authenticated:state.user.authenticated,
  user: state.user.user,
  auth: state.user.authenticated,
});

export default connect(mapStateToProps)(Scream);
