import { SET_ERRORS, SET_LOADING } from "../types";

const initialState = {
  loading: false,
  errors: {}
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: !state.loading };
    case SET_ERRORS:
      return { ...state, errors: action.payload || {} };
    default:
      return state;
  }
};

export default uiReducer;
