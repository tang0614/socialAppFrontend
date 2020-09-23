import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import EditProfile from "./editProfile";
import PostScream from "./postScream";
import { Link } from "react-router-dom";
import MyButton from "../util/myButton";
import dayjs from "dayjs";

// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classes from "./profile.module.css";
import MuiLink from "@material-ui/core/Link";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import EmailIcon from "@material-ui/icons/Email";

//redux
import { connect } from "react-redux";
import { apiPostBegan } from "../store/actions";

class Profile extends Component {
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage("./user/image", formData);
  };

  render() {
    let paper;

    if (this.props.credentials) {
      const {
        bio,
        website,
        location,
        email,
        handle,
        createdAt,
        imageUrl,
      } = this.props.credentials;
      paper = (
        <Paper className={classes.Paper}>
          <div className={classes.Profile}>
            <div className={classes.ImageWrapper}>
              <img src={imageUrl} alt="profile" className={classes.Image} />
            </div>
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={this.handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
              <h6>Edit Profile Image</h6>
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <span style={{ display: "block" }}>
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h6"
              >
                @{handle}
              </MuiLink>
            </span>
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            {email && (
              <Fragment>
                <EmailIcon color="primary" /> <span>{email}</span>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <div style={{ margin: "20px" }}>
            <EditProfile />
            <PostScream />
          </div>
        </Paper>
      );
    } else {
      if (this.props.loading) {
        paper = <p>Loading...</p>;
      } else {
        paper = (
          <Paper className={classes.Paper}>
            <Typography variant="body2" align="center">
              No profile found, please login again
            </Typography>

            <div className={classes.Buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                style={{ margin: "10px" }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
                style={{ margin: "10px" }}
              >
                Signup
              </Button>
            </div>
          </Paper>
        );
      }
    }

    return <div>{paper}</div>;
  }
}
//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  loading: state.user.fetch_loading,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    uploadImage: (url, data) => dispatch(apiPostBegan({ url, data })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Profile);
