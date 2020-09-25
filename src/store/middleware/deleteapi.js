import axios from "axios";
import * as actions from "../actions";

export const delete_api = ({ dispatch }) => (next) => (action) => {
  if (action.type !== actions.apiDeleteBegan.type) return next(action);
  next(action);

  const { screamId, history } = action.payload;

  axios
    .delete(`./scream/${screamId}`)
    .then((res) => {
      console.log("delete successfully", res.data);
      dispatch(actions.apiDeleteSuccess({ screamId }));
    })
    .catch((error) => {
      console.log("apiDeleteFailed", error.response);
      dispatch(actions.apiDeleteFailed(error.code));
    });
};
