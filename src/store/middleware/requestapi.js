import http from "../httpService";
import * as actions from "../actions";

export const request_api = ({ dispatch }) => (next) => (action) => {
  if (action.type !== actions.apiGetUserBegan.type) return next(action);
  next(action);

  if (action.type === actions.apiGetUserBegan.type) {
    const { url } = action.payload;
    http
      .get(`${url}`)
      .then((res) => dispatch(actions.apiGetUserSuccess(res.data)))
      .catch((error) => {
        dispatch(actions.apiCallFailed(error.response.data.message));
      });
  }
};
