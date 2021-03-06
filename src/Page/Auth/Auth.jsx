import React, {useState} from "react";
import Search from "../Search/Search";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, CssBaseline } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundImage: `url(/image/background.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },

  twitterIcon: {
    color: "white",
    fontSize: "4rem",
  },

  title: {
    fontSize: "2rem",
    fontWeight: "500",
    textAlign: "start",
    color: "white",
  },

  note: {
    fontSize: "1rem",
    textAlign: "start",
    fontWeight: "500",
    color: "white",
  },

  wrapper: {
    width: "90%",
  },

  buttonSignUp: {
    width: "10rem",
    padding: "0.5rem 2rem",
    margin: "1em 0",
    borderRadius: "20%",
    backgroundColor: "white",
    color: "black",
  },
  buttonLogIn: {
    width: "10rem",
    padding: "0.5rem 2rem",
    margin: "1em 0",
    borderRadius: "20%",
    backgroundColor: "#33C0FF",
  },

  imageContainer: {
    width: "100%",
    height: "100vh",
 
  },

  image: {
    height: "80vh",
    overflow:"scroll"
  },

  search:{
    display:"none"
  }
}));

const Auth = (props) => {
  const classes = useStyles(props);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [openLogIn, setOpenLogIn] = React.useState(false);
  const [words, setWords] = useState(null);
  const [query, setQuery] = useState("");

  const handleSignUpClickOpen = () => {
    setOpenSignUp(true);
  };

  const handleSignUpClose = () => {
    setOpenSignUp(false);
  };

  const handleLogInClickOpen = () => {
    setOpenLogIn(true);
  };

  const handleLogInClose = () => {
    setOpenLogIn(false);
  };

  const search = (e) => {
    e.preventDefault();
    setWords(query)
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sm={6} container>
          <IconButton>
            <TwitterIcon className={classes.twitterIcon} />
          </IconButton>

          <Grid item xs={12}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={6} className={classes.wrapper}>
                <p className={classes.title}>
                  See what's happening in the world right now
                </p>
                <p className={classes.note}>Join twitter today.</p>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttonSignUp}
                  onClick={handleSignUpClickOpen}
                >
                  Sign up
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="black"
                  className={classes.buttonLogIn}
                  onClick={handleLogInClickOpen}
                >
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={6} className={classes.imageContainer}>
            
              <div >
              <br></br>
              <br></br>
                <form onSubmit={search} noValidate autoComplete="off"  >
                      <TextField  id="search-tweet" label="Search news here..." variant="filled" value={query}  onChange={e => setQuery(e.target.value)}/>
                      <button>Search</button>
                </form>
              </div>

              <div className={classes.image} >
              <Search hidden={true} words={words} match={{"params":{"key":words}}}/>
              </div>
    
        </Grid>
      </Grid>

      <SignUp open={openSignUp} handleClose={handleSignUpClose} {...props} />

      <LogIn open={openLogIn} handleClose={handleLogInClose} {...props} />
    </div>
  );
};

export default Auth;
