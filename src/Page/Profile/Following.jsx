import React from 'react'
import AuthorImage from '../../component/AuthorImage';
import { Link } from "react-router-dom";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({

    root: {
        position: "relative",
        width: "100%",
        maxWidth: 512,
        margin: "0 auto",
        marginTop: "250px",

      },
      header:{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between"

      },

    
      headerItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      
      },

      info:{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }
    
  }));

const Following = (props)=>{
    const classes = useStyles();
    let paper
    if(props.otherUser){
        paper = props.otherUser.following_details.map(user=>{
            return(
            <div className={classes.header}>
            <div className={classes.headerItem}>
               
                <AuthorImage imageUrl={user.imageUrl} />
                
                <div className={classes.info}>
                    <Typography
                        variant="caption"
                        color="textPrimary"
                    >
                        {user.handle}
                    </Typography>
                    
                    <MuiLink component={Link} to={`/profile/${user._id}`} color="textPrimary">
                    @{user.handle}
                    </MuiLink>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                    >
                        {user.bio}
                    </Typography>
                </div>
             
                
              </div>

               <button>UnFollow</button>

            </div>
            )
        })
    }else{
        paper=""
    }
   

    return <Card className={classes.root}>
        {paper}
    </Card>
}




  //connect subscribe/unsubscribe the redux store
  export default Following;
  