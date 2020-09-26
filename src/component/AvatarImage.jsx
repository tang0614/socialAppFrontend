import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: "2px solid black",
  },

  small: {
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

const AvatarImage = (props) => {
  const classes = useStyles();

  let image;
  if (props.loading) {
    image = <CircularProgress />;
  } else {
    image = !props.error ? (
      <Avatar
        alt="avatar"
        src={process.env.REACT_APP_API_URL + "/" + props.user.imageUrl}
        className={props.isTweet ? classes.small : classes.large}
      />
    ) : (
      <Avatar
        alt="avatar"
        src={window.location.origin + "/image/icon.png"}
        className={props.isTweet ? classes.small : classes.large}
      />
    );
  }

  return <div className={classes.root}>{image}</div>;
};

AvatarImage.propTypes = {
  user: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isTweet: PropTypes.bool.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.image_loading,
  error: state.user.update_error,
});

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(AvatarImage);
