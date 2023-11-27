import { createSlice } from "@reduxjs/toolkit";

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
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
});

export default transactionsSlice.reducer;

export const selectTransactions = (state) => state.transactions.data;
