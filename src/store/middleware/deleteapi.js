import http from "../httpService";
import * as actions from "../actions";

export const delete_api = ({ dispatch }) => (next) => (action) => {
  if (
    action.type !== actions.apiDeleteUserBegan.type 
  )
    return next(action);
    next(action);
    const { url} = action.payload;
  
    let id = url.split('/').pop()
    http
      .delete(`${url}`)
      .then((res) => dispatch(actions.apiDeleteUserSuccess({id:id})))
      .catch((error) => {
  
        dispatch(actions.apiDeleteUserFailed(error.response.data.message));
      });
  
};
