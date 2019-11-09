import { IS_AUTHENTICATED, SET_LIKE, SET_UNLIKE, SET_USER } from "../types";

const initialState = {
  isAuthenticated: false,
  credentials: {},
  likes: [],
  notifications: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return { ...state, isAuthenticated: !!action.payload };
    case SET_USER:
      return { ...state, ...action.payload };
    case SET_LIKE:
      return {
        ...state,
        likes: [...state.likes, action.payload]
      };
    case SET_UNLIKE:
      return {
        ...state,
        likes: state.likes.filter(like => like.screamId !== action.payload.id)
      };
    default:
      return state;
  }
};

export default userReducer;
