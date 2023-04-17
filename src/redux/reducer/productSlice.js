import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productFetch: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { productFetch } = productSlice.actions;

export const getAllProducts = (state) => state.products;

export default productSlice.reducer;
