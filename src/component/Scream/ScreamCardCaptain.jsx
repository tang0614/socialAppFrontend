import React,{useEffect, useState} from "react";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
import relativeTime from "dayjs/plugin/relativeTime";
import RoundedCornerIcon from "@material-ui/icons/RoundedCorner";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";
import Tooltip from "@material-ui/core/Tooltip";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import EmojiNatureTwoToneIcon from "@material-ui/icons/EmojiNatureTwoTone";
import {
  
  apiPutUnFollowBegan,
  apiPutFollowBegan,
} from "../../store/actions";
// Redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  notes: {
    textAlign: "start",
  },

  icon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  add: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
    padding: 0,
  },
  follow: {
    color: "#1DA1F2",
  },
}));



const ScreamCardCaptain = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);
  const { body, author_details, isComment, scream } = props;
  const [follow, setFollow] = useState(false);
 

  useEffect(()=>{
    if(props.following&& props.following.length>0){
      if(author_details && props.following.includes(author_details[0]['_id'])){
        setFollow(true)
      }else{
        setFollow(false)
      }
    } else{
      setFollow(false)
    }
  },[props.following])
 

  const followHandler = () => {
    if (follow) {
      props.putUnFollow(`./api/users/unfollow/${scream.author}`);
      setFollow(false);
    } else {
      props.putFollow(`./api/users/follow/${scream.author}`);
      setFollow(true);
    }
  };



  return (
      <div className={classes.notes}>
        <div className={classes.add}>
          <Button>
            <EmojiNatureTwoToneIcon />
          </Button>
          {scream.author === props.id  ? (
            ""
          ) : (
            <Tooltip
              title={follow ? `unfollow ${author_details[0].handle}` : `follow ${author_details[0].handle}`}
              className={follow ? classes.follow : ""}
              onClick={followHandler}
            >
              <Button>
                <GroupAddIcon />
              </Button>
            </Tooltip>
          )}
        </div>
        {isComment ? (
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.icon}
          >
            <ChatBubbleOutlineSharpIcon />
            {(author_details?author_details[0].handle:props.handle) + " replying"}
          </Typography>
        ) : (
          ""
        )}
        {body.startsWith("retweet") ? (
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.icon}
          >
            <RoundedCornerIcon />
            {(author_details?author_details[0].handle:props.handle)+ " retweet"}
          </Typography>
        ) : (
          ""
        )}
      </div>
  );
  }
//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  handle: state.user.user.handle,
  id:  state.user.user._id,
  following: state.user.user.following,
  screams: state.data.screams,
});
const mapActionsToProps = (dispatch) => {
  return {
    putFollow: (url) => dispatch(apiPutFollowBegan({ url })),
    putUnFollow: (url) => dispatch(apiPutUnFollowBegan({ url })),
  };
};
export default connect(mapStateToProps,mapActionsToProps)(ScreamCardCaptain);
