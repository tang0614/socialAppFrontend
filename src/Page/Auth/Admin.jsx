import React from "react";

// MUI Stuff
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import BlockIcon from '@material-ui/icons/Block';

//redux
import { connect } from "react-redux";
import { apiGetAllUserBegan,apiDisableUserBegan} from "../../store/actions";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    fontSize: "0.8rem",
    color: "red",
    textAlign: "center",
  },
  table: {
    margin:'2rem',
    minWidth: '1rem',
  },
}));

const Admin = (props) => {
    const classes = useStyles();

  useEffect(()=>{
    props.getAllUsers("./api/users");
  },[])

  const disableUser = (id) =>{
    props.disable(`./api/users/disable/${id}`);
  }


   return(
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell >UserName</TableCell>
            <TableCell> Disable Account</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {props.users.map((user,id) => (
            <TableRow key={id}>
                

                <TableCell component="th" scope="row">
                {user.handle}
                </TableCell>

                <TableCell component="th" scope="row">
                    <Button onClick={()=>disableUser(user._id)} color="secondary" disabled={user.disable?true:false} >
                        <BlockIcon />
                    </Button>
                </TableCell>

               
            
            </TableRow>
            ))}
        </TableBody>
        </Table>
  </TableContainer>
  )
};

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  users: state.user.users,
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    getAllUsers: (url) =>
      dispatch(apiGetAllUserBegan({url})),
      disable: (url) =>
      dispatch(apiDisableUserBegan({url})),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Admin);
