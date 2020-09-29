import React, { useEffect } from "react";
import PropTypes from "prop-types";
import EditProfile from "./EditProfile";
import { withRouter } from "react-router";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LinkOffOutlinedIcon from "@material-ui/icons/LinkOffOutlined";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiLink from "@material-ui/core/Link";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
//redux
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "absolute",
    top: "3rem",
  },
  media: {
    height: 160,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileInfo: {
    textAlign: "start",
    paddingTop: "3rem",
  },
  notes: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "1em",
  },
  note: {
    padding: "0 1rem",
  },
  button: {
    position: "absolute",
    right: 0,
    margin: "1em",
  },
});
const ProfileCard = (props) => {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let paper;
  if (!props.user) {
    paper = <CircularProgress />;
  } else {
    const {
      _id,
      handle,
      bio,
      website,
      location,
      createdAt,
      following,
      followedBy,
    } = props.user;

    paper = (
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/image/twitterLogo.jpg"
            title="background"
          />

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleOpen}
          >
            Edit Profile
          </Button>

          <CardContent className={classes.profileInfo}>
            <Typography gutterBottom variant="h6" component="h2">
              {handle}
            </Typography>

            <MuiLink component={Link} to={`/profile`} color="textPrimary">
              @{handle}
            </MuiLink>

            <Typography variant="body2" color="textSecondary" component="p">
              {bio}
            </Typography>

            <Typography className={classes.notes}>
              <Typography variant="body2" color="textSecondary" component="p">
                <LocationOnOutlinedIcon />
                {location}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                <LinkOffOutlinedIcon />
                {website}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                <DateRangeIcon />
                {createdAt ? createdAt.split("T")[0] : ""}
              </Typography>
            </Typography>

            <Typography className={classes.notes}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.note}
              >
                {following ? following.length : ""} Followings
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.note}
              >
                {followedBy ? followedBy.length : ""} Followers
              </Typography>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.buttons}>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              props.history.push(props.match.url + "/mytweet");
            }}
          >
            Tweets
          </Link>

          <Link
            component="button"
            variant="body2"
            onClick={() => {
              props.history.push(props.match.url + "/mycomment");
            }}
          >
            Tweets & replies
          </Link>

          <Link
            component="button"
            variant="body2"
            onClick={() => {
              props.history.push(props.match.url + "/mylike");
            }}
          >
            Likes
          </Link>
        </CardActions>

        <EditProfile open={open} handleClose={handleClose} />
      </Card>
    );
  }

  return <div className={classes.root}>{paper}</div>;
};

ProfileCard.propTypes = {
  fetch_errors: PropTypes.string.isRequired,
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  user: state.user.user,
  fetch_errors: state.user.fetch_errors,
});

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(withRouter(ProfileCard));
