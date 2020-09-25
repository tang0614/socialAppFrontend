import React, { Component } from "react";
import MyButton from "../util/myButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// REdux
import { connect } from "react-redux";

import { apiLikeScreamBegan, apiUnLikeScreamBegan } from "../store/actions";

class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const likeButton = !this.props.authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton
        tip="Undo like"
        onClick={() => this.props.unLikeScream(this.props.screamId)}
      >
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton
        tip="Like"
        onClick={() => this.props.likeScream(this.props.screamId)}
      >
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    return likeButton;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
});

const mapActionsToProps = (dispatch) => {
  return {
    likeScream: (screamId) => dispatch(apiLikeScreamBegan({ screamId })),
    unLikeScream: (screamId) => dispatch(apiUnLikeScreamBegan({ screamId })),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
