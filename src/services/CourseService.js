import axios from "axios";

export class CourseService {
  getCourses = () => {
    return axios.get(`${process.env.REACT_APP_SERVER_RESIGN}/course`);
  };
  getCourseById = (id) => {
    return axios.get(`${process.env.REACT_APP_SERVER_RESIGN}/course/${id}`);
  };
}
