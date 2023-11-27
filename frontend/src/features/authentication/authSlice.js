import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

/**
 * Slice is responsible for handling all auth in the application.
 */

export const signup = createAsyncThunk("auth/signup", async (data) => {
  console.log(data);
  const response = await axios.post("/signup", JSON.stringify(data));
  console.log(response.data);
  return response.data;
});

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await axios.post("/login", JSON.stringify(data));
  return response.data;
});
const initialState = {
  currentUser: "human", //CHANGE THIS TO NULL BEFORE DEPLOYING!!!!!!!!!!!!!!

  status: "idle", // can be in idle || pending || success || error
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(signup.pending, (state, action) => {
      state.error = null;
      state.status = "pending";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      (state.status = "success"), (state.currentUser = action.payload);
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = "error";
      state.error = "An error occurred";
    });
    builder.addCase(login.pending, (state, action) => {
      state.error = null;
      state.status = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      (state.status = "error"), (state.error = "Failed to login");
    });
  },
});

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
