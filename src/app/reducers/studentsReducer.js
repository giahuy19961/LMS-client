import { userService } from "services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import swal from "sweetalert";
// import { jsonwebtoken as jwt } from "jsonwebtoken";

export const studentsApi = createAsyncThunk(
  "studentSlice/studentsApi",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userService.getStudents();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const studentSlice = createSlice({
  name: "studentSlice",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [studentsApi.pending]: (state, action) => {
      state.loading = true;
    },
    [studentsApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [studentsApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

// auth reducer
const studentsReducer = studentSlice.reducer;

export const {} = studentSlice.actions;

export default studentsReducer;
