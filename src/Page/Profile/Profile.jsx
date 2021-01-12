import React, { useEffect, useState } from "react";
import ProfileHeader from "../../component/ProfileHeader";
import ProfileCard from "./ProfileCard";
import { withRouter } from "react-router";
import MyTweet from "./MyTweet";
import MyComment from "./MyComment";
import MyLike from "./MyLike";
import Following from "./Following";
import FollowedBy from "./FollowedBy";
import http from "../../store/httpService";
import { makeStyles } from "@material-ui/core/styles";
import { Route} from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PostCard from "../../component/PostCard";
import EditImage from "../../component/EditImage";
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
    if(!(props.user.handle==='user10' && props.user._id===props.match.params.id)){
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
    
    <Fab
      color="primary"
      size="medium"
      className={classes.addIcon}
      onClick={handleClickOpen}
    >
      <AddCircleOutlineIcon fontSize="large" />
    </Fab>

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
    </div>
  );
};

//connect subscribe/unsubscribe the redux store



//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user:state.user,
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


