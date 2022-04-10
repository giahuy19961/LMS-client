import { combineReducers } from "redux";

// authReducer
import authReducer from "./authReducer";

export const rootReducer = combineReducers({
  authReducer,
});
