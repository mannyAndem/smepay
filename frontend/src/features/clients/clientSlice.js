import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const addClient = createAsyncThunk("clients/addClient", async (data) => {
  console.log(data);
  const response = axios.post(data);
  console.log(response.data);
  return response.data;
});

export const fetchClients = createAsyncThunk("clients/fetch", async (token) => {
  const response = await axios.get("/clients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data.data.info;
});

const initialState = {
  data: null,
  addClientStatus: "idle",
};

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    resetAddClientStatus(state) {
      state.addClientStatus = "idle";
    },
  },

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
    builder.addCase(fetchClients.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchClients.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default clientSlice.reducer;
export const { resetAddClientStatus } = clientSlice.actions;
export const selectAddClientStatus = (state) => state.clients.addClientStatus;
export const selectClientsStatus = (state) => state.clients.status;
export const selectClients = (state) => state.clients.data;
