import React from "react";
import { withRouter } from "react-router";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import AvatarImage from "./AvatarImage";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ContactsOutlinedIcon from "@material-ui/icons/ContactsOutlined";

//redux
import { connect } from "react-redux";
import { logoutUser } from "../store/actions";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
    padding: "0 1em",
    margin: "0 auto",
  },
  notes: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "1em",
  },
  note: {
    padding: " 0 1rem",
  },
}));

const ProfileList = (props) => {
  const classes = useStyles();
  const { handle, following, followedBy, imageUrl, _id } = props.user;
  
  const handleLogout = () => {
    props.logout();
  };
  const handleProfile = (_id) => {
    props.history.push(`/profile/${_id}`);
  };

  return (
    <List>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <AvatarImage imageUrl={imageUrl} isTweet={false} />
          <Typography
            component="span"
            variant="body2"
            className={classes.inline}
            color="textPrimary"
          >
            @ {handle}
          </Typography>
        </ListItemAvatar>
      </ListItem>

      <ListItem>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography className={classes.notes}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.note}
                >
                  {following.length} Followings
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.note}
                >
                  {followedBy.length} Followers
                </Typography>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem button key={"Profile"} onClick={()=>handleProfile(_id)}>
        <ListItemIcon>
          <ContactsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={"Profile"} />
      </ListItem>

      <ListItem button key={"Logout"} onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItem>

      {props.errors && (
        <Typography variant="body2" className={classes.errorMessage}>
          {props.errors}
        </Typography>
      )}
    </List>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  errors: state.user.fetching_errors,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(withRouter(ProfileList));
