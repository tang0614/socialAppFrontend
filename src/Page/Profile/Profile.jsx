import React, { useEffect, useState } from "react";
import ProfileHeader from "../../component/Profile/ProfileHeader";
import ProfileCard from "./ProfileCard";
import { withRouter } from "react-router";
import MyTweet from "../../component/Profile/MyTweet";
import MyComment from "../../component/Profile/MyComment";
import MyLike from "../../component/Profile/MyLike";
import Following from "../../component/Profile/Following";
import FollowedBy from "../../component/Profile/FollowedBy";
import http from "../../store/httpService";
import { makeStyles } from "@material-ui/core/styles";
import { Route} from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PostCard from "../../component/PostCard";
import EditImage from "../../component/Profile/EditImage";
import Fab from "@material-ui/core/Fab";
import Admin from "../Auth/Admin";
// Redux
import { connect } from "react-redux";
import { apiGetOtherUserBegan } from "../../store/actions";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  addIcon: {
    position: "fixed",
    color: "#1DA1F2",

    top: "30rem",
    right: "3rem",
  },
  editImage: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    position: "absolute",
  },
  popover: {
    pointerEvents: "none",
  },
});

const Profile = (props) => {
  const classes = useStyles(props);
  //open for new tweet
  const [open, setOpen] = useState(false);
  const [handleId, setHandleId] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem("IdToken");
    http.setJwt(token);

    props.getOtherUser(`/api/users/${props.match.params.id}`)

    setHandleId(props.match.params.id)
    if(!(props.user.handle==='user10' && props.user._id===handleId)){
      props.history.push(props.match.url + "/mytweet");
    }
  },[props.match.params.id])


  //handle new tweet
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  
  const paper = props.user.handle==='user10' && props.user._id===handleId? <Admin />:(
    <div>
    <ProfileCard otherUser={props.otherUser} handleId={handleId}/>
    <EditImage otherUser={props.otherUser} handleId={handleId}/>
    <PostCard open={open} handleClose={handleClose} {...props} />


    <Route path={`/profile/:id/mytweet`} render={()=><MyTweet handleId={handleId}/>} />    
    <Route path={`/profile/:id/mycomment`} render={()=><MyComment handleId={handleId}/>} />
    <Route path={`/profile/:id/mylike`} render={()=><MyLike otherUser={props.otherUser} />} />
    <Route path="/profile/:id/following" render={()=><Following otherUser={props.otherUser} />}/>
    <Route path="/profile/:id/followedby" render={()=><FollowedBy otherUser={props.otherUser}/>} />  
    </div>)
  return (
    <div className={classes.root}>
      <ProfileHeader {...props} />
      {paper}

      <Fab
        color="primary"
        size="medium"
        className={classes.addIcon}
        onClick={handleClickOpen}
      >
        <AddCircleOutlineIcon fontSize="large" />
      </Fab>
    </div>
  );
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user:state.user.user,
  otherUser: state.user.otherUser,
});

const mapActionsToProps = (dispatch) => {
  return {
    getOtherUser: (url) =>
      dispatch(apiGetOtherUserBegan({ url })),
  
  };
};
//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps,mapActionsToProps)(withRouter(Profile));


