import React, { Component } from 'react';

 
class Header extends Component {
   

    renderSortIcon(column){
        //based on the sign of arrow, rendering
        if(column.name){
            const {sortColumn} = this.props
            if(column.path !== sortColumn.name) return null
            if(sortColumn.dir==='asc') return( <i className="fa fa-sort-asc"></i>)
            return( <i className="fa fa-sort-desc"></i>)
            
        }
        

    }

    raiseSortColumn(col){
        
        if(col.name){
            const {sortColumn,handleSort} = this.props
            const newSortColumn = {...sortColumn}
            if(col.path===newSortColumn.name){
                newSortColumn.dir= (newSortColumn.dir ==='asc') ? 'desc' :'asc'
    
            }else{
                newSortColumn.dir ='asc'
                newSortColumn.name =col.path
            }
         
            handleSort(newSortColumn)

        }
       

    }
 
    render() { 
        const {columns} = this.props
        return ( 
            <thead className="thead-light">
            <tr>
            {
            columns.map(c=> 
            <th
                className="clickable"
                key={c.name||c.key}
                onClick={()=>this.raiseSortColumn(c)}
            >
                
                {c.name||c.key}
                {this.renderSortIcon(c)}

            </th>)
            }
            </tr>
        </thead>
         );
    }
}
 
export default Header;
