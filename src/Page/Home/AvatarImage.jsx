import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: "2px solid black",
  },
}));

const AvatarImage = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="avatar"
        src={process.env.REACT_APP_API_URL + "/" + props.imageUrl}
        className={classes.large}
      />
    </div>
  );
};

export default AvatarImage;
