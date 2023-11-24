import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      name: "ABC Corp",
      email: "info@abccorp.com",
      totalOutstanding: 2000,
    },
  ],
};

export const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    addClient: (state, action) => {
      const newState = [...state, action.payload];
      return newState;
    },
    removeClient: (state, action) => {
      const newState = state.filter(
        (client) => client.id !== action.payload.id
      );
      return newState;
    },
  },
});

export default clientSlice.reducer;

export const { addClient, removeClient } = clientSlice.actions;

export const selectClients = (state) => state.clients.data;
