import { GET_ERRORS } from "../actions/types";

const initialState = {
  errorMsg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errorMsg: action.payload,
      };

    default:
      return state;
  }
}
