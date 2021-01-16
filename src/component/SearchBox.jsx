import React from 'react'
import TextField from '@material-ui/core/TextField';
const SearchBox = ({submit, query, setQuery}) =>{
    return(
        <div>
            <form  onSubmit={submit} noValidate autoComplete="off">
                <TextField  label="Search..." variant="filled" value={query}  onChange={e => setQuery(e.target.value)}/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchBox;