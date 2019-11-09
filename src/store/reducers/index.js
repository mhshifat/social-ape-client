import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import uiReducer from "./uiReducer";
import userReducer from "./userReducer";

export default combineReducers({
  ui: uiReducer,
  data: dataReducer,
  user: userReducer
});
