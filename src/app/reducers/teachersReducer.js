import { userService } from "services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { jsonwebtoken as jwt } from "jsonwebtoken";

export const teachersApi = createAsyncThunk(
  "teacherSlice/teachersApi",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userService.getTeachers();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const teacherSlice = createSlice({
  name: "teacherSlice",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [teachersApi.pending]: (state, action) => {
      state.loading = true;
    },
    [teachersApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [teachersApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

// auth reducer
const teachersReducer = teacherSlice.reducer;

export const {} = teacherSlice.actions;

export default teachersReducer;
