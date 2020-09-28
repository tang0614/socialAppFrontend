import http from "../httpService";
import * as actions from "../actions";

export const get_api = ({ dispatch }) => (next) => (action) => {
  if (
    action.type !== actions.apiGetUserBegan.type &&
    action.type !== actions.apiGetScreamBegan.type &&
    action.type !== actions.apiGetOneScreamBegan.type
  )
    return next(action);
  next(action);

  if (action.type === actions.apiGetScreamBegan.type) {
    const { url } = action.payload;
    http
      .get(`${url}`)
      .then((res) => dispatch(actions.apiGetScreamSuccess(res.data)))
      .catch((error) => {
        console.log(error);

        dispatch(actions.apiGetScreamFailed(error.response.data.message));
      });
  } else if (action.type === actions.apiGetUserBegan.type) {
    const { url } = action.payload;
    http
      .get(`${url}`)
      .then((res) => dispatch(actions.apiGetUserSuccess(res.data)))
      .catch((error) => {
        dispatch(actions.apiGetUserFailed(error.response.data.message));
      });
  } else {
    const { url } = action.payload;
    console.log("apiGetOneScreamBegan url", url);
    http
      .get(`${url}`)
      .then((res) => dispatch(actions.apiGetOneScreamSuccess(res.data)))
      .catch((error) => {
        dispatch(actions.apiGetOneScreamFailed(error.response.data.message));
      });
  }
};