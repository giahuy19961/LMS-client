import { authService } from "services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import swal from "sweetalert";
// import { jsonwebtoken as jwt } from "jsonwebtoken";

export const userLoginApi = createAsyncThunk(
  "authSlice/userLoginApi",
  async ({ username, password, history }, { rejectWithValue }) => {
    try {
      const response = await authService.loginResignServerApi({
        username: username,
        password: password,
      });
      const { token } = response.data.data;
      localStorage.setItem("access_token", token);
      swal({ title: "Login successfully", icon: "success" }).then(() => {
        history.push("/");
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false,
    token: null,
    error: null,
    userInfo: null,
  },
  reducers: {
    userLogout: (state, action, history) => {
      state.token = null;
      state.error = null;
      state.userInfo = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("root");
    },
  },
  extraReducers: {
    [userLoginApi.pending]: (state, action) => {
      state.loading = true;
    },
    [userLoginApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.userInfo = action.payload.info;
      state.error = null;
    },
    [userLoginApi.rejected]: (state, action) => {
      state.loading = false;
      swal({
        title:
          // (action.error.message === "Unauthorized" ||
          //   action.error.message === "Rejected") &&
          // "Username or Password is invalid",
          action.payload.message,
        icon: "error",
      });
      state.error = action.payload;
    },
  },
});

// auth reducer
const authReducer = authSlice.reducer;

export const { userLogout } = authSlice.actions;

export default authReducer;
