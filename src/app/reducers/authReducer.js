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

      const { token } = response.data;
      // const encodedToken = jwt.sign(
      //   {
      //     username: username,
      //     token,
      //   },
      //   process.env.JWT_SECRET_KEY,
      //   { algorithm: "RS256" },
      //   { buffer: false },
      //   { crypto: false }
      // );

      localStorage.setItem("access_token", token);
      swal({ title: "Login successfully", icon: "success" }).then(() => {
        history.push("/");
      });

      // localStorage.setItem("access_token", access_token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false,
    token: null,
    error: null,
  },
  reducers: {
    userLogout: (state, action, history) => {
      state.token = null;
      state.error = null;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: {
    [userLoginApi.pending]: (state, action) => {
      state.loading = true;
    },
    [userLoginApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload;

      state.error = null;
    },
    [userLoginApi.rejected]: (state, action) => {
      state.loading = false;
      swal({
        title:
          (action.error.message === "Unauthorized" ||
            action.error.message === "Rejected") &&
          "Username or Password is invalid",
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
