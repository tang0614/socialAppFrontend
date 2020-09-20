import * as actions from "../actions";
import { setAuthorizationHeader, removeAuthorizationHeader } from "../helpers";

const initialState = {
  authenticated: false,
  loading: false,
  errors: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
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

    default:
      return state;
  }
}
