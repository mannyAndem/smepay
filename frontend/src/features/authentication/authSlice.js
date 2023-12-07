import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const signupResponse = await axios.post("/signup", data);

    // login in with new data
    let loginResponse = await axios.post(
      "/login",
      JSON.stringify({ email: data.email, password: data.password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let user = await axios.get(`/user/${loginResponse.data.userId}`, {
      headers: {
        Authorization: `Bearer ${loginResponse.data.token}`,
      },
    });
    console.log(user);
    const currentUser = { ...loginResponse.data, ...user.data.data };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    console.log(currentUser);
    return currentUser;
  } catch (err) {
    return Promise.reject(err.message);
  }
});

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    let response = await axios.post("/login", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let user = await axios.get(`/user/${response.data.userId}`, {
      headers: {
        Authorization: `Bearer ${response.data.token}`,
      },
    });
    console.log(user);
    const currentUser = { ...response.data, ...user.data.data };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    console.log(currentUser);
    return currentUser;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
});

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  loginStatus: "idle", // can be in idle || pending || success || error
  signupStatus: "idle", // can be in idle || pending || success || error
};

/**
 * Slice is responsible for handling all authentication in the application.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignupStatus(state) {
      state.signupStatus = "idle";
    },
    resetLoginStatus(state) {
      state.loginStatus = "idle";
    },
    logOut(state) {
      localStorage.removeItem("currentUser");
      state.currentUser = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(signup.pending, (state, action) => {
      state.signupStatus = "pending";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.signupStatus = "success";
      state.currentUser = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.signupStatus = "error";
    });
    builder.addCase(login.pending, (state, action) => {
      state.loginStatus = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginStatus = "success";
      state.currentUser = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      (state.loginStatus = "error"), (state.error = "Failed to login");
    });
  },
});

export default authSlice.reducer;
export const { resetSignupStatus, resetLoginStatus, logOut } =
  authSlice.actions;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectSignupStatus = (state) => state.auth.signupStatus;
