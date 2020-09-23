import React, { Component } from "react";
// REdux
import { connect } from "react-redux";
import { apiGetScreamBegan } from "../../store/actions";
import Scream from "./scream/scream";

class Screams extends Component {
  componentDidMount() {
    this.props.getAllScreams("./screams");
  }
  render() {
    let recentScream = this.props.data.screams ? (
      this.props.data.screams.map((scream, id) => (
        <Scream key={id + "scream"} scream={scream} />
      ))
    ) : (
      <p>{"loading..."}</p>
    );

    return <div>{recentScream}</div>;
  }
}

//state from the store, and properties of this object become our props
const mapStateToProps = (state) => ({
  data: state.data, //cannot query state.data.screams
});

//takes dispatch from the store and dispatch an action
const mapActionsToProps = (dispatch) => {
  return {
    getAllScreams: (url) => dispatch(apiGetScreamBegan({ url })),
    getScream: (url) => dispatch(apiGetScreamBegan({ url })),
  };
};

//connect subscribe/unsubscribe the redux store
export default connect(mapStateToProps, mapActionsToProps)(Screams);
