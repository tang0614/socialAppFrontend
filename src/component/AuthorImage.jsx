import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    flexDirection: "row",
  },

  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: "1px solid black",
  },

  editImage: {
    width: "5px",
    padding: 0,
    margin: 0,
  },
}));

const AuthorImage = (props) => {
  const classes = useStyles();

  const url = props.imageUrl
    ? process.env.REACT_APP_API_URL + "/" + props.imageUrl
    : window.location.origin + "/image/icon.png";

  return (
    <div className={classes.root}>
      <Avatar alt="avatar" src={url} className={classes.large} />
    </div>
  );
};

//connect subscribe/unsubscribe the redux store
export default AuthorImage;
