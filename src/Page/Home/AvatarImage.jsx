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
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: "2px solid black",
  },
}));

const AvatarImage = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar alt="avatar" src="/image/icon.png" className={classes.large} />
    </div>
  );
};

export default AvatarImage;
