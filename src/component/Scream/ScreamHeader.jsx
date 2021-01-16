import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import EmojiNatureTwoToneIcon from "@material-ui/icons/EmojiNatureTwoTone";
// Redux
import { connect } from "react-redux";
import {
    apiPutUnFollowBegan,
    apiPutFollowBegan,
  } from "../../store/actions";
  
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 512,
    margin: "0 auto",
    padding: 0,
    boxShadow: "none",
    borderBottom: "1px dotted #cccccc",
  },
  follow: {
    color: "#1DA1F2",
  },
  add: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
    padding: 0,
  },
}));



const ScreamHeader = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);
 
  const [follow, setFollow] = useState("");


  useEffect(() => {
    const re = props.user.following
      ? props.user.following.filter((element) => {
          return element === props.scream.author;
        })
      : "";

    setFollow(re.length > 0);
  }, [props.user.following]);

  const followHandler = () => {
    if (follow) {
      props.putUnFollow(`./api/users/unfollow/${props.scream.author}`);
      setFollow(false);
    } else {
      props.putFollow(`./api/users/follow/${props.scream.author}`);
      setFollow(true);
    }
  };

  return (
        <div className={classes.add}> 
          <Button  disabled={props.authenticated?false:true}>
            <EmojiNatureTwoToneIcon />
          </Button>
          {props.scream.author === props.user._id || props.isRetweet ? (
            ""
          ) : ( 
            <Tooltip
              title={follow ? `unfollow ${props.scream.author_details[0].handle}` : `follow ${props.scream.author_details[0].handle}`}
              className={follow ? classes.follow : ""}
              onClick={followHandler}
            >
              <Button  disabled={props.authenticated?false:true}>
                <GroupAddIcon />
              </Button>
            </Tooltip>
          )}
      
        </div>
  );
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  authenticated:state.user.authenticated,
  user: state.user.user,
});

const mapActionsToProps = (dispatch) => {
    return {
      putFollow: (url) => dispatch(apiPutFollowBegan({ url })),
      putUnFollow: (url) => dispatch(apiPutUnFollowBegan({ url })),
    };
  };

export default connect(mapStateToProps, mapActionsToProps)(ScreamHeader);
