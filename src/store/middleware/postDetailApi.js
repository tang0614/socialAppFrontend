import http from "../httpService";
import * as actions from "../actions";

export const post_detail_api = ({ dispatch, getState }) => (next) => (
  action
) => {
  if (
    action.type !== actions.apiPostScreamBegan.type &&
    action.type !== actions.apiPostCommentBegan.type
  )
    return next(action);

  next(action);

  if (action.type === actions.apiPostScreamBegan.type) {
    const { url, userData, handle } = action.payload;

    http
      .post(`${url}`, userData)
      .then((res) => {
        dispatch(actions.apiPostScreamSuccess(res.data));
        if (handle) {
          handle();
        }
      })
      .catch((error) => {
        dispatch(actions.apiPostScreamFailed(error.response.data.message));
      });
  } else if (action.type === actions.apiPostCommentBegan.type) {
    const { url, userData } = action.payload;

    http
      .post(`${url}`, userData)
      .then((res) => {
        dispatch(actions.apiPostCommentSuccess(res.data));
      })
      .catch((error) => {
        dispatch(actions.apiPostCommentFailed(error.response.data.message));
      });
  }
};
