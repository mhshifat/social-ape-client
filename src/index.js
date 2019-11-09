import Axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Routes from "./routes";
import store from "./store";
import {
  getUserDataAction,
  logoutUserAction
} from "./store/actions/userActions";

const token = localStorage._sat;
if (token) {
  const { exp } = jwtDecode(token);
  if (exp * 1000 < Date.now()) {
    store.dispatch(logoutUserAction());
    window.location.href = "/login";
  } else {
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserDataAction());
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
