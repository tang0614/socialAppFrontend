import * as actions from "../actions";

const initialState = {
  screams: "",
  scream: "",
  loading: false,
  errors: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.apiGetScreamBegan.type:
      console.log("start fetching scream data");
      return {
        ...state,
        loading: true,
        errors: "",
      };

    case actions.apiGetScreamSuccess.type:
      console.log("screams successfully fetched as", action.payload.screams);

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

    case actions.apiPostScreamBegan.type:
      console.log("start post scream data");
      return {
        ...state,
        loading: true,
        errors: "",
      };

    case actions.apiPostScreamSuccess.type:
      console.log("screams successfully posted as", action.payload.scream);

      return {
        ...state,
        loading: false,
        screams: [action.payload.scream, ...state.screams],
      };

    case actions.apiPostScreamFailed.type:
      console.log("apiPostScreamFailed : ", action.payload);
      return {
        ...state,
        loading: false,
        errors: action.payload,
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

    default:
      return state;
  }
}
