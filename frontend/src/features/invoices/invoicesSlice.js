import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const createInvoice = createAsyncThunk(
  "invoice/create",
  async ({ data, items }, { getState, rejectWithValue }) => {
    const token = getState().auth.currentUser.token;
    console.log(JSON.stringify(data));
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

      await items.forEach(async (item) => {
        console.log(JSON.stringify(item, ["name", "price", "qty"]));
        const response = await axios.post(
          `/item/add/${invoiceResponse.data.invoiceId}`,
          JSON.stringify(item, ["name", "price", "qty"]),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      });
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      if (err.code === "ERR_NETWORK") {
        return rejectWithValue("Can't connect to the internet.");
      }

      return rejectWithValue("Something went wrong.");
    }
  }
);

export const fetchInvoices = createAsyncThunk(
  "invoices/fetch",
  async (data, { getState, rejectWithValue }) => {
    const token = getState().auth.currentUser.token;

    try {
      const response = await axios.get("/invoice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data.data;
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        return rejectWithValue(
          "Can't connect to the internet. Please try again."
        );
      }

      return rejectWithValue("Something went wrong.");
    }
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
      state.status = "idle"; // So invoices are refetched
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      state.createInvoiceStatus = "error";
      state.createInvoiceError = action.payload;
    });
    builder.addCase(fetchInvoices.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
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
export const selectInvoicesError = (state) => state.invoices.error;
