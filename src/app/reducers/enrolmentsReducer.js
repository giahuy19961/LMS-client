import { courseService, enrolmentservice } from "services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import swal from "sweetalert";
// import { jsonwebtoken as jwt } from "jsonwebtoken";

export const enrolmentsApi = createAsyncThunk(
  "enrolmentsSlice/enrolmentsApi",
  async ({ userid }, { rejectWithValue }) => {
    try {
      const response = await courseService.getEnrolmentsById({ userid });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const enrolmentsSlice = createSlice({
  name: "enrolmentsSlice",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [enrolmentsApi.pending]: (state, action) => {
      state.loading = true;
    },
    [enrolmentsApi.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [enrolmentsApi.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

// auth reducer
const enrolmentsReducer = enrolmentsSlice.reducer;

export const {} = enrolmentsSlice.actions;

export default enrolmentsReducer;
