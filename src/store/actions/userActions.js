import Axios from "axios";
import {
  DELETE_SCREAM,
  IS_AUTHENTICATED,
  POST_SCREAM,
  SET_ERRORS,
  SET_LIKE,
  SET_LOADING,
  SET_SCREAM,
  SET_UNLIKE,
  SET_USER
} from "../types";

export const getUserDataAction = () => dispatch => {
  dispatch({ type: SET_LOADING });
  Axios.get("/user")
    .then(res => {
      console.log(res);
      dispatch({ type: SET_LOADING });
      dispatch({ type: IS_AUTHENTICATED, payload: res.data });
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({ type: SET_LOADING });
      dispatch({ type: IS_AUTHENTICATED });
      dispatch({ type: SET_USER });
    });
};

export const loginUserAction = (authData, history) => dispatch => {
  dispatch({ type: SET_LOADING });
  dispatch({ type: SET_ERRORS });
  Axios.post("/users/login", authData)
    .then(data => {
      console.log(data);
      dispatch({ type: SET_LOADING });
      localStorage.setItem("_sat", `Bearer ${data.data.token}`);
      Axios.defaults.headers.common["Authorization"] = localStorage._sat;
      dispatch(getUserDataAction());
      history.push("/");
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({ type: SET_LOADING });
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const registerUserAction = (userData, history) => dispatch => {
  dispatch({ type: SET_LOADING });
  dispatch({ type: SET_ERRORS });
  Axios.post("/users/signup", userData)
    .then(data => {
      console.log(data);
      dispatch({ type: SET_LOADING });
      localStorage.setItem("_sat", `Bearer ${data.data.token}`);
      Axios.defaults.headers.common["Authorization"] = localStorage._sat;
      dispatch(getUserDataAction());
      history.push("/");
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({ type: SET_LOADING });
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUserAction = () => dispatch => {
  localStorage.removeItem("_sat");
  delete Axios.defaults.headers.common["Authorization"];
  dispatch({ type: IS_AUTHENTICATED });
  dispatch({
    type: SET_USER,
    payload: { credentials: [], likes: [], notifications: [] }
  });
};

export const uploadImageAction = formData => dispatch => {
  dispatch({ type: SET_LOADING });
  Axios.post("/user/image", formData)
    .then(() => {
      dispatch({ type: SET_LOADING });
      dispatch(getUserDataAction());
    })
    .catch(err => {
      dispatch({ type: SET_LOADING });
      console.log(err);
    });
};

export const updateUserDetailsAction = userData => dispatch => {
  dispatch({ type: SET_LOADING });
  Axios.post("/user", userData)
    .then(() => {
      dispatch({ type: SET_LOADING });
      dispatch(getUserDataAction());
    })
    .catch(err => {
      dispatch({ type: SET_LOADING });
      console.log(err);
    });
};

export const likeScreamAction = screamId => dispatch => {
  Axios.post(`/screams/${screamId}/like`)
    .then(res => {
      dispatch({
        type: SET_LIKE,
        payload: { userHandle: res.data.userHandle, screamId: res.data.id }
      });
    })
    .catch(err => {
      dispatch({ type: SET_LIKE });
      console.log(err);
    });
};

export const unlikeScreamAction = screamId => dispatch => {
  Axios.post(`/screams/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: SET_UNLIKE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: SET_UNLIKE });
      console.log(err);
    });
};

export const deleteScreamAction = screamId => dispatch => {
  Axios.delete(`/screams/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch(err => {
      console.log(err);
    });
};

export const postScreamAction = screamData => dispatch => {
  dispatch({ type: SET_ERRORS });
  return Axios.post("/screams", screamData)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: { ...res.data, screamId: res.data.id }
      });
      return res.data;
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
      return Promise.reject(err);
    });
};

export const getScreamAction = screamId => dispatch => {
  return Axios.get(`/screams/${screamId}`)
    .then(res => {
      dispatch({ type: SET_SCREAM, payload: res.data });
      return res.data;
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
};
