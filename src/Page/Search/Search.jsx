import React, { useState, useEffect } from "react";

//Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { CssBaseline } from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from "react-redux";
import LoginButton from "../../component/LoginButton";

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
  noSearch:{
    display:"none",
    height:'0px'
  },

  news:{
    width:"100%",
    margin:"1rem auto"
  }


}));

async function searchNews(q) {
  q = encodeURIComponent(q);

  q = encodeURIComponent(q);

  
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "1f170f89b9msh55c94e67bd213d4p1ab56djsnc92e39862c03",
      "x-bingapis-sdk": "true"
    }
  });
  const body = await response.json();
  return body.value;
 
 
}

const Search = (props) => {
  const classes = useStyles(props);
  const [query, setQuery] = useState(null);
 
  const [list, setList] = useState(null);
 

    useEffect(() => {
      if(props.match.params.key){
        let key = props.match.params.key
        setQuery(key)
        searchNews(props.match.params.key)
        .then((articles)=>{
          setList(articles)
        })
       
      }else{
        searchNews('covid19').then(setList)
      }
      
    }, [props.match.params.key])
  


  useEffect(()=>{
   
    if(props.words){
      setQuery(props.words)
      searchNews(props.words).then(setList);
    }
  },[props.words])
 

  const handleSearch = (e)=> {
      if(e.target.value){
        props.history.push(`/search/${e.target.value}`)
      }else{
        props.history.push(`/search`)
        setQuery(null)
      } 
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      {!props.hidden?
      <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>

        <div>
          <form noValidate autoComplete="off" className={classes.search}>
              <TextField  label='search here' id="filled-basic"  variant="filled" value={query}  onChange={handleSearch}/> 
          </form>
        </div>
        
        <LoginButton/>
    
      </Toolbar>
    </AppBar>:""
     }
      

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



//connect subscribe/unsubscribe the redux store
const mapStateToProps = (state) => ({
  user: state.user,
});


//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(Search);

