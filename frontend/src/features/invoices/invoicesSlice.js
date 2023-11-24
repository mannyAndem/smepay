import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const STATUS = {
  idle: "idle",
  success: "success",
  loading: "loading",
  error: "error",
};

const initialState = {
  data: [
    {
      name: "ABC Corp",
      amount: 2000,
      dates: "20th November, 2023",
      invoiceNumber: "INV-20231120-001",
      status: "pending",
    },
    {
      name: "ABC Corp",
      amount: 2000,
      dates: "20th November, 2023",
      invoiceNumber: "INV-20231120-001",
      status: "pending",
    },
    {
      name: "ABC Corp",
      amount: 2000,
      dates: "20th November, 2023",
      invoiceNumber: "INV-20231120-001",
      status: "pending",
    },
    {
      name: "ABC Corp",
      amount: 2000,
      dates: "20th November, 2023",
      invoiceNumber: "INV-20231120-001",
      status: "pending",
    },
    {
      name: "ABC Corp",
      amount: 2000,
      dates: "20th November, 2023",
      invoiceNumber: "INV-20231120-001",
      status: "pending",
    },
    {
      name: "ABC Corp",
      amount: 2000,
      dates: "20th November, 2023",
      invoiceNumber: "INV-20231120-001",
      status: "pending",
    },
    {
      name: "ABC Corp",
      amount: 2000,
      dates: "20th November, 2023",
      invoiceNumber: "INV-20231120-001",
      status: "pending",
    },
  ],
  status: STATUS.idle,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addNewInvoice: {
      reducer(state, action) {
        const newState = { ...state, data: [...data, action.payload] };
        return newState;
      },
      prepare(clientId, amount) {
        return {
          payload: {
            id: nanoid(),
            clientId,
            amount,
          },
        };
      },
    },
  },
});

export default invoicesSlice.reducer;

export const { addNewInvoice } = invoicesSlice.actions;

export const selectInvoices = (state) => state.invoices.data;
