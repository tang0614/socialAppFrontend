import React, { Component } from 'react';
class Genre extends Component {
    
    render() { 
        const {data,handleGenre,currentGenre} = this.props
      
        const genres = data.map(m=>m.genre.name)
        const unique_genres = ['All',...new Set(genres)];
      
        return ( 
            <ul className="list-group">
                {unique_genres.map(g=> <li key={g} className={g===currentGenre ? "list-group-item active" : "list-group-item"} onClick={()=>handleGenre(g)}>{g}</li>)}
                
            </ul>
         );
    }
}
 
export default Genre;