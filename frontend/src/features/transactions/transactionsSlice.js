import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async () => {
    // const response = axios.get("")
  }
);

const initialState = {
  data: [
    {
      id: 1,
      clientName: "ABC Corp",
      date: "December 21, 2023",
      amount: 2000,
      paymentMethod: "Transfer",
      status: "Paid",
    },
  ],
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
      state.status = "pending";
      state.data = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.status = "pending";
    });
  },
});

export default transactionsSlice.reducer;

export const selectTransactions = (state) => state.transactions.data;
export const selectTransactionsStatus = (state) => state.transactions.status;
