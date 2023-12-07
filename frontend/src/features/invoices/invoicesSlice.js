import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const createInvoice = createAsyncThunk(
  "invoice/create",
  async ({ data, items, token }) => {
    console.log(token);
    try {
      const invoiceResponse = await axios.post(
        "/invoice/create",
        JSON.stringify(data),

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(invoiceResponse.data);
      await items.forEach(async (item) => {
        await axios.post(
          `/item/add/${invoiceResponse.data.data._id}`,
          JSON.stringify(item, ["name", "price", "qty"]),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      });

      return invoiceResponse.data;
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
);

export const fetchInvoices = createAsyncThunk(
  "invoices/fetch",
  async (token) => {
    const response = await axios.get("/invoice", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  }
);

const initialState = {
  data: null,
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
