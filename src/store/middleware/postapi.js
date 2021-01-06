import http from "../httpService";
import * as actions from "../actions";
import { getCurrentUser } from "../helpers";

export const post_api = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  next(action);

  const { url, userData, history } = action.payload;

  http
    .post(`${url}`, userData, history)
    .then((res) => {
      dispatch(actions.apiCallSuccess(res.data.token));
      history.push("/home");

      const currentUser = getCurrentUser();

      dispatch(
        actions.apiGetUserBegan({ url: `./api/users/${currentUser._id}` })
      );
 

      // dispatch(actions.apiGetScreamBegan({ url: `./api/screams` }));
    })
    .catch((error) => {
      dispatch(actions.apiCallFailed(error.response.data.message));
    });
};
