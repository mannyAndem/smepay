import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../features/clients/clientSlice";
import invoicesReducer from "../features/invoices/invoicesSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    invoices: invoicesReducer,
    transactions: transactionsReducer,
  },
});
