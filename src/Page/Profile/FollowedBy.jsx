import React, {useState} from 'react'
import AuthorImage from '../../component/AuthorImage';
import { Link } from "react-router-dom";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import NameCard from './NameCard';
//redux
import { connect } from "react-redux";
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
        justifyContent:"space-between",
        margin:"1rem 0"
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
      },
    
    
  }));

const FollowedBy = (props)=>{
    const classes = useStyles();
    

    let paper
    if(props.otherUser){
        paper = props.otherUser.followedBy_details.map(user=>{
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
                
              <NameCard id={user._id} following={props.user.following.includes(user._id)} />

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




 
 
  
const mapStateToProps = (state) => ({
    user: state.user.user,
   
  });
  

  
export default connect(mapStateToProps)(FollowedBy);
  
  