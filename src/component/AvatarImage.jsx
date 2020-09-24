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

  let image;
  if (props.loading) {
    image = <CircularProgress />;
  } else {
    image = !props.error ? (
      <Avatar
        alt="avatar"
        src={process.env.REACT_APP_API_URL + "/" + props.user.imageUrl}
        className={classes.large}
      />
    ) : (
      <Avatar
        alt="avatar"
        src={window.location.origin + "/image/icon.png"}
        className={classes.large}
      />
    );
  }

  return <div className={classes.root}>{image}</div>;
};

AvatarImage.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.image_loading,
  error: state.user.update_error,
});

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(AvatarImage);
