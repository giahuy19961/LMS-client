import axios from "axios";

export class CourseService {
  getCourses = () => {
    return axios.get(`${process.env.REACT_APP_SERVER_RESIGN}/course`);
  };
  getCourseById = (id) => {
    return axios.get(`${process.env.REACT_APP_SERVER_RESIGN}/course/${id}`);
  };
  registerSubject = ({ userid, courseid }) => {
    return axios.post(`${process.env.REACT_APP_SERVER_RESIGN}/course/enrol`, {
      userid,
      courseid,
    });
  };
  getEnrolmentsById = ({ userid }) => {
    return axios.get(
      `${process.env.REACT_APP_SERVER_RESIGN}/course/enrol/${userid}`
    );
  };
}
