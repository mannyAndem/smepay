/**
 * Slice is responsible for handling all auth in the application.
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});
