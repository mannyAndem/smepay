import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export default invoicesSlice.reducer;

export const { setSearchValue } = invoicesSlice.actions;

export const selectSearchValue = (state) => state.invoices.searchValue;
