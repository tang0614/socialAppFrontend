import http from "../httpService";
import * as actions from "../actions";

export const put_api = ({ dispatch, getState }) => (next) => (action) => {
  if (
    action.type !== actions.apiPutUserBegan.type &&
    action.type !== actions.apiPutCommentBegan.type
  )
    return next(action);

  next(action);

  const { url, userData } = action.payload;
  if (action.type === actions.apiPutUserBegan.type) {
    http
      .put(`${url}`, userData)
      .then((res) => {
        dispatch(actions.apiPutUserSuccess(res.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(actions.apiPutUserFailed(error.response.data.message));
      });
  } else {
    http
      .put(`${url}`, userData)
      .then((res) => {
        dispatch(actions.apiPutCommentSuccess(res.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(actions.apiPutCommentFailed(error.response.data.message));
      });
  }
};
