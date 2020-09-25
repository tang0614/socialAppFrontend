import * as actions from "../actions";
import { setAuthorizationHeader, removeAuthorizationHeader } from "../helper";

const initialState = {
  authenticated: false,

  credentials: "",
  likes: [],
  notifications: [],

  loading: false,
  fetch_loading: null,

  errors: null,
  fetch_errors: null,
  image_errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.apiCallBegan.type:
      console.log("user submit form");
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case actions.apiGetUserBegan.type:
      console.log("user start fetching data");
      return {
        ...state,
        fetch_loading: true,
        fetch_errors: null,
      };

    case actions.apiPostBegan.type:
      console.log("posting data.. ");
      return {
        ...state,
      };

    case actions.apiCallSuccess.type:
      console.log("login successfully apiCallSuccess");
      setAuthorizationHeader(action.payload);
      return {
        ...state,
        loading: false,
        authenticated: true,
      };

    case actions.apiGetUserSuccess.type:
      console.log("data successfully fetched as", action.payload);

      return {
        ...state,
        fetch_loading: false,
        credentials: action.payload.credentials,
        likes: action.payload.likes,
      };

    case actions.apiPostSuccess.type:
      return {
        ...state,
      };

    case actions.apiCallFailed.type:
      console.log("login failed : ", action.payload);
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case actions.apiGetUserFailed.type:
      console.log("login failed : ", action.payload);
      return {
        ...state,
        fetch_loading: false,
        fetch_errors: action.payload,
      };

    case actions.apiPostFailed.type:
      console.log("Post Failed: ", action.payload);
      return {
        ...state,
        image_errors: action.payload,
      };

    case actions.logoutUser.type:
      console.log("logging out user");
      removeAuthorizationHeader();
      window.location.replace("/home");

      return {
        ...state,
        authenticated: false,
      };

    case actions.apiUserInfo.type:
      return state.credentials;

    case actions.apiLikeScreamSuccess.type:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };

    case actions.apiUnLikeScreamSuccess.type:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        ),
      };

    case actions.apiLikeScreamFailed.type:
    case actions.apiUnLikeScreamFailed.type:
      console.log("apiLikeScreamFailed : ", action.payload);
      return {
        ...state,
      };

    default:
      return state;
  }
}
