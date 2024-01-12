import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const addClient = createAsyncThunk(
  "clients/addClient",
  async (data, { getState }) => {
    const token = getState().auth.currentUser.token;

    console.log(data);
    try {
      const response = await axios.post("/client/add", JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
);

export const fetchClients = createAsyncThunk(
  "clients/fetch",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.currentUser.token;

    try {
      const response = await axios.get("/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data.info;
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        return rejectWithValue(
          "Can't connect to the internet, please try again"
        );
      }

      return rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  data: null,
  addClientStatus: "idle",
  status: "idle",
  error: null,
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
      state.status = "idle";
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
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export default clientSlice.reducer;
export const { resetAddClientStatus } = clientSlice.actions;
export const selectAddClientStatus = (state) => state.clients.addClientStatus;
export const selectClientsStatus = (state) => state.clients.status;
export const selectClients = (state) => state.clients.data;
export const selectClientsError = (state) => state.clients.error;
