import axios from "axios";

export class AuthService {
  loginApi = ({ username, password }) => {
    return axios.post(
      `${process.env.REACT_APP_MOODLE_SITE_AUTH_URL}?username=${username}&password=${password}&service=resign_service`
    );
  };
  registerApi = ({ username, password, email }) => {
    return axios.post(
      `${process.env.REACT_APP_SERVER_RESIGN}/auth/register`,
      {
        username,
        password,
        email,
      },
      { contentType: "application/json" }
    );
  };
  getLoginInfoApi = ({ username }) => {
    return axios.get(
      `${process.env.REACT_APP_MOODLE_SITE_SERVICE_URL}?wstoken=47782827ea2ff2b8d1ba83cff52e0daa&moodlewsrestformat=json&wsfunction=core_user_get_users_by_field&field=username&values[0]=${username}`
    );
  };
  loginResignServerApi = ({ username, password }) => {
    return axios.post(
      `${process.env.REACT_APP_SERVER_RESIGN}/auth/login`,
      {
        username,
        password,
      },
      { contentType: "application/json" }
    );
  };
}
