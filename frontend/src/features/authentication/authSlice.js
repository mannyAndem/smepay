import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokens: null, // format: {current: "foo", refresh: "bar"};
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.currentUser = null;
    },
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { logOut, setUser, setTokens } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.currentUser;
