import * as actions from "../actions";
import { setAuthorizationHeader, removeAuthorizationHeader } from "../helpers";

const initialState = {
  authenticated: false,
  loading: false,
  errors: "",

  user: "",
  fetch_loading: false,
  fetch_errors: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    //LogIn SignUp
    case actions.apiCallBegan.type:
      console.log("user submit/login siginUp form");
      return {
        ...state,
        loading: true,
        errors: "",
      };

    case actions.apiCallSuccess.type:
      console.log("siginUp/login successfully ");
      setAuthorizationHeader(action.payload); //payload is token
      // window.location = "/home";
      return {
        ...state,
        loading: false,
        authenticated: true,
      };

    case actions.apiCallFailed.type:
      console.log("siginUp/login failed : ", action.payload);
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case actions.logoutUser.type:
      console.log("logging out user");
      removeAuthorizationHeader();
      window.location.replace("/auth");

      return {
        ...state,
        authenticated: false,
      };

    //Get Users

    case actions.apiGetUserBegan.type:
      console.log("user start fetching data");
      return {
        ...state,
        fetch_loading: true,
        fetch_errors: "",
      };

    case actions.apiGetUserSuccess.type:
      console.log("user data successfully fetched as", action.payload);

      return {
        ...state,
        fetch_loading: false,
        user: action.payload.user,
      };

    case actions.apiGetUserFailed.type:
      console.log("user data failed and error is : ", action.payload);
      return {
        ...state,
        fetch_loading: false,
        fetch_errors: action.payload,
      };

    default:
      return state;
  }
}
