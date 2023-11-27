import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const createInvoice = createAsyncThunk(
  "invoices/create",
  async (data, items) => {
    const invoiceResponse = await axios.post(
      "/invoice/create",
      JSON.stringify(data)
    );
    const itemsResponse = await axios.post(
      "/item/add/:invoiceId",
      JSON.stringify(items)
    );
    return response.data;
  }
);

export const fetchInvoices = createAsyncThunk("invoices/fetch", async () => {
  const response = await axios.get("/invoices");
  return response.data;
});

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
  status: "idle",
  createInvoiceStatus: "idle",
  createInvoiceError: null,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    resetCreateInvoiceStatus(state) {
      state.createInvoiceStatus = "idle";
    },
  },
  extraReducers(builder) {
    builder.addCase(createInvoice.pending, (state, action) => {
      state.createInvoiceStatus = "pending";
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.createInvoiceStatus = "success";
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      state.createInvoiceStatus = "error";
      state.createInvoiceError = "Failed to create invoice";
    });
    builder.addCase(fetchInvoices.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchInvoices.rejected, (state) => {
      state.status = "error";
      state.error = "Error while fetching invoices";
    });
  },
});

export default invoicesSlice.reducer;

export const { resetCreateInvoiceStatus } = invoicesSlice.actions;

export const selectCreateInvoiceStatus = (state) =>
  state.invoices.createInvoiceStatus;
export const selectCreateInvoiceError = (state) =>
  state.invoices.createInvoiceError;
export const selectInvoices = (state) => state.invoices.data;

export const selectInvoicesStatus = (state) => state.invoices.status;
