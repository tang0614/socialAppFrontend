import * as actions from "../actions";
import { setCommentHeader } from "../helpers";

const initialState = {
  screams: "",
  errors: "",
  post_errors: "",
  delete_loading: false,
  post: "",
  post_error: "",
  post_loading: false,
  totalComment: 0,
  totalRetweet: 0,
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

    case actions.apiGetOneScreamBegan.type:
      console.log("start fetching ONE scream data");
      return {
        ...state,
        post_error: "",
        post_loading: true,
      };

    case actions.apiGetOneScreamSuccess.type:
      console.log("ONE scream successfully fetched as", action.payload.scream);

      return {
        ...state,
        post: action.payload.scream[0],
        post_loading: false,
      };

    case actions.apiGetOneScreamFailed.type:
      console.log("aapiGetOneScreamFailed : ", action.payload);
      return {
        ...state,
        post_error: action.payload,
        post_loading: false,
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
        delete_loading: true,
      };

    case actions.apiDeleteSuccess.type:
      console.log("  deleted screamId is..", action.payload.ids);

      action.payload.ids.forEach((id) => {
        const i = state.screams.findIndex((scream) => scream._id === id);
        state.screams.splice(i, 1);
      });

      return {
        ...state,
        screams: [...state.screams],
        delete_loading: false,
      };

    case actions.apiDeleteFailed.type:
      console.log("apiDeleteFailed: ", action.payload);
      return {
        ...state,
        delete_loading: false,
      };

    case actions.apiUncommentBegan.type:
      console.log("apiUncommentBegan");
      return {
        ...state,
      };

    case actions.apiUncommentSuccess.type:
      console.log(
        " apiUncommentSuccess and  uncommented is..",
        action.payload.target
      );

      return {
        ...state,
        totalComment: state.totalComment - 1,
      };

    case actions.apiUncommentFailed.type:
      console.log("apiUncommentFailed: ", action.payload);
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
        totalComment: state.totalComment + 1,
        screams: [action.payload.comment, ...state.screams],
      };

    case actions.apiPutCommentFailed.type:
      console.log("apiPutCommentFailed : ", action.payload);
      return {
        ...state,
        errors: action.payload,
      };

    case actions.apiPutRetweetBegan.type:
      console.log("start put Retweet data");
      return {
        ...state,
        errors: "",
      };

    case actions.apiPutRetweetSuccess.type:
      console.log("Retweet successfully put as", action.payload.retweet);

      return {
        ...state,
        totalRetweet: state.totalRetweet + 1,
        screams: [action.payload.retweet, ...state.screams],
      };

    case actions.apiPutRetweetFailed.type:
      console.log("apiPutRetweetFailed : ", action.payload);
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
}
