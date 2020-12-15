import * as actions from "../actions";
import { setAuthorizationHeader, removeAuthorizationHeader } from "../helpers";

const initialState = {
  authenticated: false,
  loading: false,
  errors: "",
  users:[],
  otherUser:null,
  user: "",
  fetching_errors: "",
  update_error: "",
  image_loading: false,
 
};

export default function (state = initialState, action) {
  switch (action.type) {
    //LogIn SignUp
    case actions.apiCallBegan.type:
      console.log("user submit/login siginUp form");
      return {
        ...state,

        errors: "",
      };

    case actions.apiCallSuccess.type:
      console.log("siginUp/login successfully ");
      setAuthorizationHeader(action.payload); //payload is token

      return {
        ...state,

        authenticated: true,
      };

    case actions.apiCallFailed.type:
      console.log("siginUp/login failed : ", action.payload);
      return {
        ...state,

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

        fetching_errors: "",
      };

    case actions.apiGetUserSuccess.type:
      console.log("user data successfully fetched as", action.payload);

      return {
        ...state,
        user: action.payload.user,
      };

    case actions.apiGetUserFailed.type:
      console.log("user data failed and error is : ", action.payload);
      return {
        ...state,

        fetching_errors: action.payload,
      };

      case actions.apiGetOtherUserBegan.type:
      console.log("user start fetching data");
      return {
        ...state,

        fetching_errors: "",
      };

    case actions.apiGetOtherUserSuccess.type:
      console.log("apiGetOtherUserSuccess fetched as", action.payload);

      return {
        ...state,
        otherUser: action.payload.user,
      };

    case actions.apiGetOtherUserFailed.type:
      console.log("user data failed and error is : ", action.payload);
      return {
        ...state,

        fetching_errors: action.payload,
      };


      //Get Users

    case actions.apiGetAllUserBegan.type:
      console.log("All users start fetching data");
      return {
        ...state,

        fetching_errors: "",
      };

    case actions.apiGetAllUserSuccess.type:
      console.log(" All users data successfully fetched as", action.payload);

      return {
        ...state,
        users: action.payload.users,
      };

    case actions.apiGetAllUserFailed.type:
      console.log("All users data failed and error is : ", action.payload);
      return {
        ...state,

        fetching_errors: action.payload,
      };

      case actions.apiDeleteUserBegan.type:
        // console.log("user start updating data");
        return {
          ...state,
        };
  
      case actions.apiDeleteUserSuccess.type:
        console.log("user deleted action.payload.id", action.payload.id);
        let allUsers = [...state.users]
        let deletedId = action.payload.id
        let newUsers = allUsers.filter(user=>user._id!==deletedId )
        return {
          ...state,
          users: newUsers
        };
  
      case actions.apiDeleteUserFailed.type:
        // console.log("user data updated failed and error is : ", action.payload);
        return {
          ...state,
         
        };
    //put request

    case actions.apiPutUserBegan.type:
      // console.log("user start updating data");
      return {
        ...state,
        image_loading: true,
        update_error: "",
      };

    case actions.apiPutUserSuccess.type:
      // console.log("user data successfully updated as", action.payload);

      return {
        ...state,
        user: action.payload.user,
        image_loading: false,
      };

    case actions.apiPutUserFailed.type:
      // console.log("user data updated failed and error is : ", action.payload);
      return {
        ...state,
        image_loading: false,
        update_error: action.payload,
      };

    case actions.apiPutLikeBegan.type:
      console.log("user start like a post");
      return {
        ...state,
      };

    case actions.apiPutLikeSuccess.type:
      console.log(
        "user successfully liked and updated as",
        action.payload.updated
      );

      return {
        ...state,
        user: action.payload.updated,
      };

    case actions.apiPutLikeFailed.type:
      console.log("apiPutLikeFailed  ");
      return {
        ...state,
      };

    case actions.apiPutUnLikeBegan.type:
      console.log("user start unlike a post");
      return {
        ...state,
      };

    case actions.apiPutUnLikeSuccess.type:
      console.log(
        "user successfully unliked and updated as",
        action.payload.target
      );

      return {
        ...state,
        user: action.payload.target,
      };

    case actions.apiPutUnLikeFailed.type:
      console.log("apiPutUnLikeFailed  ");
      return {
        ...state,
      };

      case actions.apiDisableUserBegan.type:
      return {
        ...state,
      };

    case actions.apiDisableUserSuccess.type:
      console.log('apiDisableUserSuccess action.payload',action.payload)
      return {
        ...state,
        users: action.payload.users,
      };

    case actions.apiDisableUserFailed.type:
      
      return {
        ...state,
      };


      

    case actions.apiPutUnFollowBegan.type:
    case actions.apiPutFollowBegan.type:
      console.log("apiPutFollowBegan");
      return {
        ...state,
      };

    case actions.apiPutUnFollowSuccess.type:
    case actions.apiPutFollowSuccess.type:
      console.log("apiPutFollowSuccess", action.payload.message);

      return {
        ...state,
      };

    case actions.apiPutUnFollowFailed.type:
    case actions.apiPutFollowFailed.type:
      console.log("apiPutFollowFailed ");
      return {
        ...state,
      };

      
    default:
      return state;
  }
}
