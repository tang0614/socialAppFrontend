import * as actions from "../actions";
import { setCommentHeader } from "../helpers";

const initialState = {
  screams: "",
  errors: "",
  post_errors: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.apiGetScreamBegan.type:
      console.log("start fetching scream data");
      return {
        ...state,
        errors: "",
      };

    case actions.apiGetScreamSuccess.type:
      console.log("screams successfully fetched as", action.payload.screams);

      return {
        ...state,
        screams: action.payload.screams,
      };

    case actions.apiGetScreamFailed.type:
      console.log("apiGetScreamFailed : ", action.payload);
      return {
        ...state,
        errors: action.payload,
      };

    case actions.apiPostScreamBegan.type:
      console.log("start post scream data");
      return {
        ...state,
        post_errors: "",
      };

    case actions.apiPostScreamSuccess.type:
      console.log("screams successfully posted as", action.payload.scream);

      return {
        ...state,
        screams: [action.payload.scream, ...state.screams],
      };

    case actions.apiPostScreamFailed.type:
      console.log("apiPostScreamFailed : ", action.payload);
      return {
        ...state,
        post_errors: action.payload,
      };

    case actions.apiDeleteBegan.type:
      console.log("start delete scream data");
      return {
        ...state,
      };

    case actions.apiDeleteSuccess.type:
      console.log("  deleted screamId is..", action.payload._id);
      const i = state.screams.findIndex(
        (scream) => scream._id === action.payload._id
      );
      state.screams.splice(i, 1);
      return {
        ...state,
      };

    case actions.apiDeleteFailed.type:
      console.log("apiDeleteFailed: ", action.payload);
      return {
        ...state,
      };

    case actions.apiPostCommentBegan.type:
      console.log("start post comment data");
      return {
        ...state,
        errors: "",
      };

    case actions.apiPostCommentSuccess.type:
      console.log("comment successfully posted as", action.payload.scream);
      setCommentHeader(action.payload.scream._id);

      return {
        ...state,
      };

    case actions.apiPostCommentFailed.type:
      console.log("apiPostCommentFailed : ", action.payload);
      return {
        ...state,
        errors: action.payload,
      };

    case actions.apiPutCommentBegan.type:
      console.log("start put comment data");
      return {
        ...state,
        errors: "",
      };

    case actions.apiPutCommentSuccess.type:
      console.log("comment successfully put as", action.payload.comment);

      return {
        ...state,
        screams: [action.payload.comment, ...state.screams],
      };

    case actions.apiPutCommentFailed.type:
      console.log("apiPutCommentFailed : ", action.payload);
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
}
