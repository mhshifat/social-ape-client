import Axios from "axios";
import { SET_LOADING, SET_SCREAMS } from "../types";

export const getScreamsAction = () => dispatch => {
  dispatch({ type: SET_LOADING });
  Axios.get(
    "https://europe-west1-social-app-3e8d4.cloudfunctions.net/api/screams"
  )
    .then(res => {
      dispatch({ type: SET_LOADING });
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: SET_LOADING });
      dispatch({ type: SET_SCREAMS });
      console.log(err);
    });
};
