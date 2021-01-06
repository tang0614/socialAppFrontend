import React, { Component } from 'react';
import Header from './header'
import TableBody from './tableBody';



class Table extends Component {
    
    render() { 
        const {columns,data,handleSort,sortColumn}=this.props
        return (  
        <table className="table">
            <Header columns={columns} sortColumn={sortColumn} handleSort={handleSort}/>
            <TableBody columns={columns} data={data} />
        </table> 
        );
    }
}
 
export default Table;