import http from "../httpService";
import * as actions from "../actions";

export const delete_api = ({ dispatch }) => (next) => (action) => {
  if (action.type !== actions.apiDeleteBegan.type) return next(action);
  next(action);

  const { url, _id } = action.payload;

  http
    .delete(`${url}`)
    .then((res) => {
      dispatch(actions.apiDeleteSuccess({ _id: _id }));
    })
    .catch((error) => {
      dispatch(actions.apiDeleteFailed(error.response.data.message));
    });
};
