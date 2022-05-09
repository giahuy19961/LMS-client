import { combineReducers } from "redux";

// authReducer
import authReducer from "./authReducer";
import listCourseReducer from "./listCourseReducer";
import enrolmentsReducer from "./enrolmentsReducer";

export const rootReducer = combineReducers({
  authReducer,
  listCourseReducer,
  enrolmentsReducer,
});
