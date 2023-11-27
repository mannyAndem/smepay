import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const addClient = createAsyncThunk("clients/addClient", async (data) => {
  console.log(data);
  const response = axios.post(data);
  console.log(response.data);
  return response.data;
});

const initialState = {
  data: [
    {
      name: "ABC Corp",
      email: "info@abccorp.com",
      totalOutstanding: 2000,
    },
  ],
  addClientStatus: "idle",
};

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(addClient.pending, (state) => {
      state.addClientStatus = "pending";
    });
    builder.addCase(addClient.fulfilled, (state) => {
      state.addClientStatus = "success";
    });
    builder.addCase(addClient.rejected, (state) => {
      state.addClientStatus = "error";
    });
  },
});

export default clientSlice.reducer;

export const selectAddClientStatus = (state) => state.clients.addClientStatus;
export const selectClients = (state) => state.clients.data;
