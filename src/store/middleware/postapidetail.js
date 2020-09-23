import axios from "axios";
import * as actions from "../actions";

export const post_api_detail = ({ dispatch, getState }) => (next) => (
  action
) => {
  if (action.type !== actions.apiPostBegan.type) return next(action);
  //if action is a function such as api call then
  next(action); // passing action to next middleware - the reducer

  const { url, data, reducer } = action.payload;

  if (reducer === "user") {
    axios
      .post(`${url}`, data)
      .then((res) => {
        dispatch(actions.apiPostSuccess({ ...res.data, reducer }));

        dispatch(actions.apiGetUserBegan({ url: "./user" }));
      })
      .catch((error) => {
        dispatch(actions.apiPostFailed(error.response));
      });
  } else {
    axios
      .post(`${url}`, data)
      .then((res) => {
        dispatch(actions.apiPostSuccess({ ...res.data, reducer }));
      })
      .catch((error) => {
        dispatch(actions.apiPostFailed(error.response));
      });
  }
};
