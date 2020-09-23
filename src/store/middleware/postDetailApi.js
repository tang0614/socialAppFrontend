import http from "../httpService";
import * as actions from "../actions";

export const post_detail_api = ({ dispatch, getState }) => (next) => (
  action
) => {
  if (action.type !== actions.apiPostScreamBegan.type) return next(action);

  next(action);

  const { url, userData } = action.payload;

  http
    .post(`${url}`, userData)
    .then((res) => {
      dispatch(actions.apiPostScreamSuccess(res.data));
    })
    .catch((error) => {
      dispatch(actions.apiPostScreamFailed(error.response.data.message));
    });
};
