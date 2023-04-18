import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productFetchStatus: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productsFetchRequested: (state) => {
      state.productFetchStatus = "loading";
    },
    productsFetchSucceeded: (state, action) => {
      console.log("ASD");
      state.products = action.payload;
      state.productFetchStatus = "idle";
    },
    productsFetchFailed: (state, action) => {
      state.productFetchStatus = "failed";
    },
  },
});

export const {
  productsFetchRequested,
  productsFetchSucceeded,
  productsFetchFailed,
} = productSlice.actions;

export const getAllProducts = (state) => state.products;

export default productSlice.reducer;
