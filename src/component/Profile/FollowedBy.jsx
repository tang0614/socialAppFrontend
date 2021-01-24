import React from 'react'
import AuthorImage from '../AuthorImage';
import { Link } from "react-router-dom";
// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import NameCard from './NameCard';
import CircularProgress from "@material-ui/core/CircularProgress";
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

    let followedBy_details;
  
    if(props.otherUser && props.otherUser._id!==props._id){
        followedBy_details =props.otherUser.followedBy_details
    }else{
        followedBy_details =props.followedBy_details
    }

    return(
        <Card className={classes.root}>
        
        {   (!props.otherUser)
            ?<CircularProgress/>
            :followedBy_details.map((user,id)=>{
                return(
                <div className={classes.header} key={id}>
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
                  <NameCard id={user._id} following={props.following.includes(user._id)} />
                </div>
                )
            })
    }
    </Card>
    )
    
}
  
const mapStateToProps = (state) => ({
    following: state.user.user.following,  
});
   
export default connect(mapStateToProps)(FollowedBy);
  
  