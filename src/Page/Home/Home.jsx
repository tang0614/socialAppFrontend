import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Screams from "../Post/Screams";
import PostCard from "../../component/PostCard";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { CssBaseline } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from "react-redux";
import Search from "../Search/Search";
import ProfileButton from "../../component/ProfileButton";
import LoginButton from "../../component/LoginButton";
import SearchBox from "../../component/SearchBox";
import Header from "../../component/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    margin: "0 auto",
    width: "100%",
  },
  appBar: {
    background: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#1DA1F2",
    fontWeight: "600",
  },
  grid: {
    paddingTop: "1rem",
  },
 
  addIcon: {
    position: "fixed",
    color: "#1DA1F2",

    bottom: "3rem",
    left: "3rem",
  },

  imageContainer: {
    width: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
  
  },

  toolbar:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
 
  }
}));

const Home = (props) => {
  const classes = useStyles(props);


  //open for new post
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useState("");
  const [words, setWords] = useState(null);//twitter
  const [words_news, setWords_news] = useState(null);
  const [query_news, setQuery_news] = useState("");


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const search = (e) => {
    console.log('Submit searching tweets...')
    e.preventDefault();
    setWords(query)
  };

  const search_news = (e) => {
    e.preventDefault();
    setWords_news(query_news)
  };

 
  return (
    <div className={classes.root}>
      <Header query={query} setQuery={setQuery} submit={search}/>

      <Grid container>

        <Grid item xs={12} sm={6} container>
          <Screams query={words}/>
        </Grid>

        <Grid item sm={6} className={classes.imageContainer}>
          <div >
              <br></br>
              <br></br>
              <SearchBox query={query_news} setQuery={setQuery_news} submit={search_news}/>
          </div>
          <Search  hidden={true} words={words_news} match={{"params":{"key":words_news}}}/>
        </Grid>
      </Grid>

      <Fab
        color="primary"
        size="medium"
        className={classes.addIcon}
        onClick={handleOpen}
      >
        <AddCircleOutlineIcon fontSize="large" />
      </Fab>

      <PostCard open={open} handleClose={handleClose} {...props} />
    </div>
  );
};

Home.propTypes = {
  delete_loading: PropTypes.bool.isRequired,
};

//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  delete_loading: state.data.delete_loading,
  user: state.user
});

export default connect(mapStateToProps)(Home);
