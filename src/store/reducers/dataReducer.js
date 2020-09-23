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
        scream: action.payload.scream,
      };

    case actions.apiPostScreamFailed.type:
      console.log("apiPostScreamFailed : ", action.payload);
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    default:
      return state;
  }
}
