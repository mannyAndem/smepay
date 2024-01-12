import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.currentUser.token;
    try {
      const response = await axios.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data.data;
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        return rejectWithValue(
          "Not connected to the internet, please try again."
        );
      }
      return rejectWithValue("Something went wrong.");
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
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
      state.error = action.payload;
    });
  },
});

export default transactionsSlice.reducer;

export const selectTransactions = (state) => state.transactions.data;
export const selectTransactionsStatus = (state) => state.transactions.status;
export const selectTransactionsError = (state) => state.transactions.error;
