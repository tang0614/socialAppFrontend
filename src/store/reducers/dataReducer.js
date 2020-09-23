import * as actions from "../actions";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  errors: null,
  like_errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.apiPostBegan.type:
      console.log("posting data.. ");
      return {
        ...state,
      };

    case actions.apiPostSuccess.type:
      if (action.payload.reducer === "comment") {
        console.log("comment apiPostSuccess.. ");
        console.log(action.payload);

        let index = state.screams.findIndex(
          (scream) => scream.screamId === action.payload.screamId
        );
        state.screams[index].commentCount += 1;
        return {
          ...state,
        };
      } else if (action.payload.reducer === "data") {
        console.log("post scream apiPostSuccess.. ");
        return {
          ...state,
          screams: [action.payload.newScream, ...state.screams],
        };
      } else {
        return { ...state };
      }

    case actions.apiGetScreamBegan.type:
      console.log("user start fetching scream data");
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case actions.apiGetScreamSuccess.type:
      console.log("data successfully fetched as", action.payload.screams);

      return {
        ...state,
        loading: false,
        screams: action.payload.screams,
      };

    case actions.apiGetScreamFailed.type:
      console.log("apiGetScreamFailed : ", action.payload);
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case actions.apiLikeScreamBegan.type:
      console.log("user start like a scream");
      return {
        ...state,
      };

    case actions.apiUnLikeScreamBegan.type:
      console.log("user start unlike a scream");
      return {
        ...state,
      };

    case actions.apiLikeScreamSuccess.type:
    case actions.apiUnLikeScreamSuccess.type:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return {
        ...state,
      };

    // eslint-disable-next-line no-fallthrough
    case actions.apiDeleteSuccess.type:
      console.log(" apiDeleteSuccess screamId is..", action.payload.screamId);
      const i = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams.splice(i, 1);
      return {
        ...state,
      };

    case actions.apiDeleteFailed.type:
      console.log("apiLikeScreamFailed : ", action.payload);
      return {
        ...state,
      };

    case actions.apiPostFailed.type:
    case actions.apiLikeScreamFailed.type:
    case actions.apiUnLikeScreamFailed.type:
      console.log("Failed : ", action.payload);
      return {
        ...state,
      };

    default:
      return state;
  }
}
