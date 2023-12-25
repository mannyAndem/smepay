import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (token) => {
    try {
      const response = await axios.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data.data;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export default transactionsSlice.reducer;

export const selectTransactions = (state) => state.transactions.data;
export const selectTransactionsStatus = (state) => state.transactions.status;
