import {
  DELETE_SCREAM,
  POST_SCREAM,
  SET_LIKE,
  SET_SCREAM,
  SET_SCREAMS,
  SET_UNLIKE
} from "../types";

const initialState = {
  screams: [],
  scream: {}
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCREAMS:
      return { ...state, screams: action.payload || [] };
    case SET_LIKE:
      return {
        ...state,
        screams: state.screams.map(scream =>
          scream.screamId === action.payload.screamId
            ? { ...scream, likeCount: scream.likeCount + 1 }
            : scream
        )
      };
    case SET_UNLIKE:
      return {
        ...state,
        screams: state.screams.map(scream =>
          scream.screamId === action.payload.id
            ? { ...scream, likeCount: scream.likeCount - 1 }
            : scream
        )
      };
    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(
          scream => scream.screamId !== action.payload
        )
      };
    case POST_SCREAM:
      return { ...state, screams: [action.payload, ...state.screams] };
    case SET_SCREAM:
      return { ...state, scream: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
