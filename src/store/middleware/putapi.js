import http from "../httpService";
import * as actions from "../actions";
import { removeCommentHeader } from "../helpers";

export const put_api = ({ dispatch, getState }) => (next) => (action) => {
  if (
    action.type !== actions.apiPutUserBegan.type &&
    action.type !== actions.apiPutCommentBegan.type &&
    action.type !== actions.apiPutRetweetBegan.type &&
    action.type !== actions.apiDeleteBegan.type
  )
    return next(action);

  next(action);

  const { url, userData, handle } = action.payload;
  if (action.type === actions.apiPutUserBegan.type) {
    http
      .put(`${url}`, userData)
      .then((res) => {
        dispatch(actions.apiPutUserSuccess(res.data));
        if (handle) {
          handle();
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(actions.apiPutUserFailed(error.response.data.message));
      });
  } else if (action.type === actions.apiPutCommentBegan.type) {
    http
      .put(`${url}`, userData)
      .then((res) => {
        dispatch(actions.apiPutCommentSuccess(res.data));
        removeCommentHeader();
      })
      .catch((error) => {
        console.log(error);
        dispatch(actions.apiPutCommentFailed(error.response.data.message));
      });
  } else if (action.type === actions.apiPutRetweetBegan.type) {
    http
      .put(`${url}`, userData)
      .then((res) => {
        dispatch(actions.apiPutRetweetSuccess(res.data));
        removeCommentHeader();
      })
      .catch((error) => {
        console.log(error);
        dispatch(actions.apiPutRetweetFailed(error.response.data.message));
      });
  } else {
    const { url, data, history } = action.payload;

    http
      .put(`${url}`, data)
      .then((res) => {
        dispatch(actions.apiDeleteSuccess({ ids: data.ids }));
        history.push("/home");
      })
      .catch((error) => {
        dispatch(actions.apiDeleteFailed(error.response.data.message));
      });
  }
};
