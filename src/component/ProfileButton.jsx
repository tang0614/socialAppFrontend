import React from 'react'
import ProfileList from './ProfileList';
import AvatarImage from './AvatarImage';
//Material-UI
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";

// Redux
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    list: {
      backgroundColor: "#fff",
      width: "20rem",
      height: "100vh",
      color: "black",
    },
    fullList: {
      width: "auto",
    }
}));

const ProfileButton = (props) =>{   
    const classes = useStyles(props);
    const [state, setState] = React.useState({left: false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        } 
        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <div
        className={clsx(classes.list, {
            [classes.fullList]: anchor === "top" || anchor === "bottom",
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
          <ProfileList />
        </div>
    );

    const button = <Button
                        onClick={toggleDrawer("left", true)}
                        className={classes.menuIcon}
                        disabled={props.user.authenticated?false:true}>
                        <AvatarImage isTweet={false} />
                    </Button>
                    
    return (
        <>
            {button}
            <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            >
            {list("left")}
            </Drawer>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(ProfileButton);

