import http from "../httpService";
import * as actions from "../actions";

export const post_api = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  next(action);

  const { url, userData, history } = action.payload;

  http
    .post(`${url}`, userData, history)
    .then((res) => {
      dispatch(actions.apiCallSuccess(res.data.token));
      history.push("/home");
    })
    .catch((error) => {
      dispatch(actions.apiCallFailed(error.response.data.message));
    });
};
