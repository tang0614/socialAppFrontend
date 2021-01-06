import React, { Component } from 'react';
class SearchBox extends Component {
    state = {  }
    render() { 
        const {value,onChange} = this.props
        return ( 
        <input 
            className="form-control" 
            type="text" 
            placeholder="Search" 
            aria-label="Search"
            value={value}
            onChange={onChange}>

        </input> );
    }
}
 
export default SearchBox;