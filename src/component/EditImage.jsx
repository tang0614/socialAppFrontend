import React from "react";
import PropTypes from "prop-types";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import AvatarImage from "./AvatarImage";
import Button from "@material-ui/core/Button";
import EditLocationOutlinedIcon from "@material-ui/icons/EditLocationOutlined";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

//redux
import { connect } from "react-redux";
import { apiPutUserBegan } from "../store/actions";

const useStyles = makeStyles({
  editImage: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    position: "absolute",
  },
  popover: {
    pointerEvents: "none",
  },
});

const EditImage = (props) => {
  const classes = useStyles(props);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPop = Boolean(anchorEl);

  //handle image
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //handle picture
  const handleEditPicture = () => {
    const fileInput = document.getElementById("profileImage");
    fileInput.click();
  };

  const handleImageChange = (event) => {
    const formData = new FormData();

    formData.append("profileImage", event.target.files[0]);
    props.update("./api/users/image", formData);
  };
  return (
    <div className={classes.editImage}>
      <AvatarImage isTweet={false}/>
      <div>
        <Button className={classes.icon}>
          <input
            type="file"
            id="profileImage"
            hidden="hidden"
            onChange={handleImageChange}
          />
        </Button>

        <Button
          tip="Edit profile picture"
          onClick={handleEditPicture}
          btnClassName="button"
          className="editIcon"
          aria-owns={openPop ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <EditLocationOutlinedIcon />
        </Button>
      </div>

      <div>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          open={openPop}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>Edit Image (within 1024*1024 jpg/png).</Typography>
        </Popover>
      </div>
    </div>
  );
};

EditImage.propTypes = {
  update: PropTypes.func.isRequired,
};

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    update: (url, userData) => dispatch(apiPutUserBegan({ url, userData })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(null, mapActionsToProps)(EditImage);
