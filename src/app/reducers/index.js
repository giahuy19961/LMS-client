import { combineReducers } from "redux";

// authReducer
import authReducer from "./authReducer";
import listCourseReducer from "./listCourseReducer";
import enrolmentsReducer from "./enrolmentsReducer";

// users
// students
import studentsReducer from "./studentsReducer";
import teachersReducer from "./teachersReducer";

export const rootReducer = combineReducers({
  authReducer,
  listCourseReducer,
  enrolmentsReducer,
  studentsReducer,
  teachersReducer,
});
