import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
//redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    flexDirection: "row",
  },

  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: "2px solid black",
  },

  editImage: {
    width: "5px",
    padding: 0,
    margin: 0,
  },
}));

const AvatarImage = (props) => {
  const classes = useStyles();

  const url =
    props.user && props.user.imageUrl
      ? process.env.REACT_APP_API_URL + "/" + props.user.imageUrl
      : window.location.origin + "/image/icon.png";

  return (
    <div className={classes.root}>
      {props.fetch_errors ? (
        <div>Try image smaller than 1014*1024</div>
      ) : (
        <Avatar alt="avatar" src={url} className={classes.large} />
      )}
    </div>
  );
};

AvatarImage.propTypes = {
  user: PropTypes.object.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  user: state.user.user,
});

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(AvatarImage);
