import React, { Component } from 'react';
class Delete extends Component {
    state = {  }
    render() { 
        const {movie, handleDelete} =this.props
        return ( <i className="fa fa-eraser" onClick={()=>handleDelete(movie)}></i> );
    }
}
 
export default Delete;