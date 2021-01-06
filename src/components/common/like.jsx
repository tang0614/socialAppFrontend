import React, { Component } from 'react';

class Like extends Component {
    
  
    render() {
        const {movie, handleLike} = this.props
    
        
        if(movie.liked){
            return (<i className="fa fa-heart" onClick={()=>handleLike(movie)}> </i> )
        }else{
            return (<i className="fa fa-heart-o" onClick={()=>handleLike(movie)}></i>)
        }
        
    }
}
 
export default Like;