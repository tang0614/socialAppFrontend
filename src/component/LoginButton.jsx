import { Button } from '@material-ui/core'
import { withRouter } from "react-router";
import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux
import { connect } from "react-redux";

const LoginButton = (props) =>{
    console.log('LoginButton')
    const handleAuth = ()=>{
        props.history.push('/auth')
      }
    const loginButton= (props.user)?
      
        (props.user.authenticated)?
        null:
        <Button variant="outlined" color="primary"  onClick={handleAuth}>
        Login/Sign Up 
        </Button>
        :<CircularProgress/>

      
    return(
        <div>
            {loginButton}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
});
  
export default connect(mapStateToProps)(withRouter(LoginButton));

