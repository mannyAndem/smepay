import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../features/clients/clientSlice";
import invoicesReducer from "../features/invoices/invoicesSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";
import authReducer from "../features/authentication/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    invoices: invoicesReducer,
    transactions: transactionsReducer,
  },
});
