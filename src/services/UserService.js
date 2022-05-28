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
}
