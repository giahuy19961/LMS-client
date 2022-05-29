import axios from "axios";

export class UserService {
  updateUser = ({ id, userUpdate }) => {
    return axios.post(
      `${process.env.REACT_APP_SERVER_RESIGN}/user/${id}`,
      userUpdate
    );
  };
  getInfo = (token) => {
    return axios.get(`${process.env.REACT_APP_SERVER_RESIGN}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  getStudents = (token) => {
    return axios.get(`${process.env.REACT_APP_SERVER_RESIGN}/user/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  getTeachers = (token) => {
    return axios.get(`${process.env.REACT_APP_SERVER_RESIGN}/user/teachers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  unlockUser = (data) => {
    return axios.put(
      `${process.env.REACT_APP_SERVER_RESIGN}/user/unlock`,
      data
    );
  };
}
