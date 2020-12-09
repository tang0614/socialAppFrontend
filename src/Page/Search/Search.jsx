import React, { useState, useEffect } from "react";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { CssBaseline } from "@material-ui/core";


import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    margin: "0 auto",
    width: "100%",
  },

  appBar: {
    background: "none",
    paddingTop:"1rem",
    paddingBottom:"1rem"

  },
  toolBar:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
  list: {
    backgroundColor: "#fff",
    width: "20rem",
    height: "100vh",
    color: "black",
  },
  fullList: {
    width: "auto",
  },
  addIcon: {
    position: "fixed",
    color: "#1DA1F2",

    bottom: "3rem",
    right: "3rem",
  },
  menuIcon: {
    color: "#1DA1F2",
  },
  imageContainer: {
    width: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(/image/twitterLogo.jpg)`,
    backgroundRepeat: "repeat",
  },

  search:{
    display:"flex",
    width: "100%",

  },
  news:{
    width:"100%",
    margin:"1rem auto"
  }


}));

async function searchNews(q) {
  q = encodeURIComponent(q);
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "d97eb54ab1mshb9af7c0754bf4b0p161d9ajsna9a555999fb1",
      "x-bingapis-sdk": "true"
    }
  });
  const body = await response.json();
  return body.value;
}

const Search = (props) => {
  const classes = useStyles(props);
  const [query, setQuery] = useState('covid19');
  const [list, setList] = useState(null);

  useEffect(() => {
    if(props.words){
      setQuery(props.words)
      searchNews(props.words).then(setList);
    }else{ 
      searchNews(query).then(setList)
    }
   
  }, [props.words,query]);

  const search = (e) => {
    console.log('Submit searching news...')
    e.preventDefault();
    searchNews(query).then(setList);
  };



  const handleAuth = ()=>{
    
      props.history.push('/auth')
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          
            <Typography variant="h6" className={classes.title}>
     
                {props.login?'':'News'}
            </Typography>
            

            <div>
                <form  onSubmit={search} noValidate autoComplete="off" className={classes.search}>
                    <TextField  id="filled-basic" label="Search news here..." variant="filled" value={query}  onChange={e => setQuery(e.target.value)}/>
                    <button>Search</button>
                </form>
            </div>
            {props.login?'':
            <Button variant="outlined" color="primary"  onClick={handleAuth}>
                Login/Sign Up Twitter
            </Button>}
            
        </Toolbar>
      </AppBar>

      <div >
      {!list
        ? null
        : list.length === 0
          ? <p><i>No results found</i></p>
          : <ul className={classes.news}>
            {list.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </ul>
      }
      </div>
    </div>
  );
};

function Item({ item }) {
  const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
  const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });
  return (
    <li className="item">
      {item.image &&
        <img className="thumbnail"
          alt=""
          src={item.image?.thumbnail?.contentUrl}
        />
      }
      <h2 className="title">
        <a href={item.url}>{item.name}</a>
      </h2>
      <p className="description">
        {item.description}
      </p>
      <div className="meta">
        <span>{formatDate(item.datePublished)}</span>
        <span className="provider">
          {item.provider[0].image?.thumbnail &&
            <img className="provider-thumbnail"
              alt=""
              src={item.provider[0].image.thumbnail.contentUrl + '&w=16&h=16'}
            />
          }
          {item.provider[0].name}
        </span>
        {item.category &&
          <span>{separateWords(item.category)}</span>
        }
      </div>
    </li>
  );
}

export default Search;
