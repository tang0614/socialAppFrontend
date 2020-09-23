import http from "../httpService";
import * as actions from "../actions";

export const put_api = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== actions.apiPutUserBegan.type) return next(action);

  next(action);

  const { url, userData } = action.payload;

  http
    .put(`${url}`, userData)
    .then((res) => {
      dispatch(actions.apiPutUserSuccess(res.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(actions.apiPutUserFailed(error.response.data.message));
    });
};
