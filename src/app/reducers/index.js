import { combineReducers } from "redux";

// authReducer
import authReducer from "./authReducer";
import listCourseReducer from "./listCourseReducer";

export const rootReducer = combineReducers({
  authReducer,
  listCourseReducer,
});
