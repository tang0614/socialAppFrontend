import { Button } from '@material-ui/core'
import { withRouter } from "react-router";
import React from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux
import { connect } from "react-redux";

const LoginButton = (props) =>{
    const handleAuth = ()=>{
        props.history.push('/auth')
      }

    const loginButton= (!props.user)?
        (!props.user.authenticated) 
        ?
      
        <Button variant="outlined" color="primary"  onClick={handleAuth}>
            Login/Sign Up 
        </Button>
        :<CircularProgress/>
        :null
      
    return(
        <div>
            {loginButton}
        </div>
    )
}

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
    user: state.user,
  });
  
//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps)(withRouter(LoginButton));

