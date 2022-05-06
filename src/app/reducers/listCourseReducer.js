import { courseService } from "services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import swal from "sweetalert";
// import { jsonwebtoken as jwt } from "jsonwebtoken";

export const listCourseApi = createAsyncThunk(
  "coursesSlice/listCourseApi",
  async (params, { rejectWithValue }) => {
    try {
      const response = await courseService.getCourses();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [listCourseApi.pending]: (state, action) => {
      state.loading = true;
    },
    [listCourseApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [listCourseApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

// auth reducer
const listCourseReducer = coursesSlice.reducer;

export const {} = coursesSlice.actions;

export default listCourseReducer;
