import http from "../httpService";
import * as actions from "../actions";

export const get_api = ({ dispatch }) => (next) => (action) => {
  if (action.type !== actions.apiGetUserBegan.type) return next(action);
  next(action);

  if (action.type === actions.apiGetUserBegan.type) {
    const { url } = action.payload;
    http
      .get(`${url}`)
      .then((res) => dispatch(actions.apiGetUserSuccess(res.data)))
      .catch((error) => {
        dispatch(actions.apiGetUserFailed(error.response.data.message));
      });
  }
};
