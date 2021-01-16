import React, {  useState} from "react";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
//redux
import { connect } from "react-redux";
import {

    apiPutUnFollowBegan,
    apiPutFollowBegan,
  } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
    follow: {
        color: "#1DA1F2",
      },
}));

const NameCard = (props) => {
  const classes = useStyles(props);

  const [follow, setFollow] = useState(props.following);





  const followHandler = () => {
        if (follow) {
          props.putUnFollow(`./api/users/unfollow/${props.id}`);
          setFollow(false);
        } else {
          props.putFollow(`./api/users/follow/${props.id}`);
          setFollow(true);
        }
      };

  
  return(
      <div>
        <Tooltip
            title={follow ? `unfollow` : `follow`}
            className={follow ? classes.follow : ""}
            onClick={followHandler}>
            <Button>
                <GroupAddIcon />
            </Button>
        </Tooltip> 
    </div>

  )
};


//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
    user: state.user.user,
   
  });
  
  const mapActionsToProps = (dispatch) => {
    return {
   
      putFollow: (url) => dispatch(apiPutFollowBegan({ url })),
      putUnFollow: (url) => dispatch(apiPutUnFollowBegan({ url })),
    };
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(NameCard);
  