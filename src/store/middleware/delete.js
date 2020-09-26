// import http from "../httpService";
// import * as actions from "../actions";

// export const delete_api = ({ dispatch }) => (next) => (action) => {
//   if (action.type !== actions.apiDeleteBegan.type) return next(action);
//   next(action);

//   const { url, data } = action.payload;

//   http
//     .delete(`${url}`, data)
//     .then((res) => {
//       dispatch(actions.apiDeleteSuccess({ ids: data }));
//       // window.location.replace("./home");
//     })
//     .catch((error) => {
//       dispatch(actions.apiDeleteFailed(error.response.data.message));
//     });
// };
