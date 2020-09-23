import React from "react";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import AvatarImage from "./AvatarImage";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  notes: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "1em",
  },
  note: {
    padding: "0 1rem",
  },
}));

const ProfileList = (props) => {
  const classes = useStyles();
  const { name, following, followedBy, imageUrl } = props;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <AvatarImage imageUrl={imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              @ {name}
            </Typography>

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
  );
};

export default ProfileList;
