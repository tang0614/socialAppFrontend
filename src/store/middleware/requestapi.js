import axios from "axios";
import * as actions from "../actions";

export const request_api = ({ dispatch }) => (next) => (action) => {
  if (
    action.type !== actions.apiGetScreamBegan.type &&
    action.type !== actions.apiLikeScreamBegan.type &&
    action.type !== actions.apiGetUserBegan.type &&
    action.type !== actions.apiUnLikeScreamBegan.type
  )
    return next(action);
  next(action);

  if (action.type === actions.apiGetScreamBegan.type) {
    const { url } = action.payload;
    axios
      .get(`${url}`)
      .then((res) => dispatch(actions.apiGetScreamSuccess(res.data)))
      .catch((error) => {
        console.log("error", error);
        dispatch(actions.apiGetScreamFailed(error));
      });
  } else if (action.type === actions.apiLikeScreamBegan.type) {
    const { screamId } = action.payload;
    axios
      .get(`./scream/${screamId}/like`)
      .then((res) => {
        dispatch(actions.apiLikeScreamSuccess(res.data));
      })
      .catch((error) => {
        if (error.response.data.general) {
          dispatch(actions.apiLikeScreamFailed(error.response.data.general));
        } else {
          dispatch(actions.apiLikeScreamFailed(error.response));
        }
      });
  } else if (action.type === actions.apiUnLikeScreamBegan.type) {
    const { screamId } = action.payload;
    axios
      .get(`./scream/${screamId}/unlike`)
      .then((res) => {
        dispatch(actions.apiUnLikeScreamSuccess(res.data));
      })
      .catch((error) => {
        if (error.response.data.general) {
          dispatch(actions.apiUnLikeScreamFailed(error.response.data.general));
        } else {
          dispatch(actions.apiUnLikeScreamFailed(error.response));
        }
      });
  } else if (action.type === actions.apiGetUserBegan.type) {
    const { url } = action.payload;
    axios
      .get(`${url}`)
      .then((res) => dispatch(actions.apiGetUserSuccess(res.data)))
      .catch((error) => {
        if (error.response.data.general) {
          dispatch(actions.apiGetUserFailed(error.response.data.general));
        } else {
          dispatch(actions.apiGetUserFailed(error.response));
        }
      });
  }
};
