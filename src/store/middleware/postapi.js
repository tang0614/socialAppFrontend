import axios from "axios";
import * as actions from "../actions";

export const post_api = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  //if action is a function such as api call then
  next(action); // passing action to next middleware - the reducer

  const { url, userData, history } = action.payload;

  axios
    .post(`${url}`, userData, history)
    .then((res) => {
      dispatch(actions.apiCallSuccess(res.data.token));
      dispatch(actions.apiGetUserBegan({ url: "./user" }));
      history.push("home");
    })
    .catch((error) => {
      if (error.response.data.general) {
        dispatch(actions.apiCallFailed(error.response.data.general));
      } else {
        dispatch(actions.apiCallFailed(error));
      }
    });
};
