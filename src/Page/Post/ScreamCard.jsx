import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import AuthorImage from "./AuthorImage";
import relativeTime from "dayjs/plugin/relativeTime";

const useStyles = makeStyles((theme) => ({
  root: { boxShadow: "none" },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  content: {
    position: "relative",
    margin: "0 1rem",
    minHeight: "5rem",
    textAlign: "start",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "1em",
  },
  headerItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    padding: "1rem",
  },
}));

const ScreamCard = (props) => {
  const classes = useStyles(props);
  dayjs.extend(relativeTime);

  const { author_details, createdAt, _id, body } = props;

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerItem}>
          <AuthorImage imageUrl={author_details.imageUrl} />

          <MuiLink component={Link} to={`/profile/${_id}`} color="textPrimary">
            @{author_details.handle}
          </MuiLink>
        </div>
        <div>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.headerItem}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
        </div>
      </div>
      <CardContent className={classes.content}>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default ScreamCard;
