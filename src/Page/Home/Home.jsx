import React, { useState} from "react";
import Screams from "../Post/Screams";
import PostCard from "../../component/PostCard";
import Search from "../Search/Search";
import SearchBox from "../../component/SearchBox";
import Header from "../../component/Header";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    margin: "0 auto",
    width: "100%",
  },
  addIcon: {
    position: "fixed",
    color: "#1DA1F2",
    bottom: "3rem",
    left: "3rem",
  },
  Container: {
    width: "100%",
  }
}));

const Home = (props) => {
  const classes = useStyles(props);

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useState("");
  const [query_twitter, setQuery_twitter] = useState("");

  const [news, setNews] = useState(null);
  const [query_news, setQuery_news] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchTwitter = (e) => {
    e.preventDefault();
    setQuery_twitter(query)
  };

  const search_news = (e) => {
    e.preventDefault();
    setNews(query_news)
  };

 
  return (
    <div className={classes.root}>
      <Header query={query} setQuery={setQuery} submit={searchTwitter}/>
      <Grid container>
        <Grid item xs={12} sm={6} container>
          <Screams query={query_twitter}/>
        </Grid>
        <Grid item sm={6} className={classes.Container}>
          <div >
              <br></br>
              <br></br>
              <SearchBox query={query_news} setQuery={setQuery_news} submit={search_news}/>
          </div>
          <Search  hidden={true} words={news} match={{"params":{"key":news}}}/>
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


export default Home;
