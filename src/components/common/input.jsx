import React, { Component } from 'react';
const Input = (props) => {
    const {name,label,handleChange,value,error,type} = props
    return (  
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
                <input 
                id={name}
                value={value} 
                name={name} 
                type={type}
                onChange = {handleChange} 
                className="form-control"/>
            {error &&<div className="alert alert-primary" role="alert">{error}</div>}
        </div>
    );
}
 
export default Input;