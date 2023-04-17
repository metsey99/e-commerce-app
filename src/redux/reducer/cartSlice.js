import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  addItemStatus: "idle",
  editItemStatus: "idle",
  removeItemStatus: "idle",
  fetchItemsStatus: "idle",
  removeAllItemsStatus: "idle",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchItemsRequested: (state) => {
      state.fetchItemsStatus = "loading";
    },
    fetchItemsSucceeded: (state, action) => {
      state.items = action.payload;
      state.fetchItemsStatus = "idle";
    },
    fetchItemsFailed: (state, action) => {
      state.fetchItemsStatus = "failed";
    },
    addItemRequested: (state) => {
      state.addItemStatus = "loading";
    },
    addItemSucceeded: (state, action) => {
      let isUpdated = false;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].productId === action.payload.productId) {
          state.items[i].quantity += 1;
          isUpdated = true;
          break;
        }
      }
      if (!isUpdated) {
        state.items.push(action.payload);
      }

      state.addItemStatus = "idle";
    },
    addItemFailed: (state, action) => {
      state.addItemStatus = "failed";
    },
    editItemRequested: (state) => {
      state.editItemStatus = "loading";
    },
    editItemSucceeded: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.productId === action.payload.productId) {
          return action.payload;
        } else {
          return item;
        }
      });
      state.editItemStatus = "idle";
    },
    editItemFailed: (state, action) => {
      state.editItemStatus = "failed";
    },
    removeItemRequested: (state) => {
      state.removeItemStatus = "loading";
    },
    removeItemSucceeded: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.toString()
      );

      state.removeItemStatus = "idle";
    },
    removeItemFailed: (state, action) => {
      state.removeItemStatus = "failed";
    },
    removeAllItems: (state) => {
      state.items = [];
    },
    removeAllItemsRequested: (state) => {
      state.removeAllItemsStatus = "loading";
    },
    removeAllItemsSucceeded: (state, action) => {
      state.items = [];
      state.removeAllItemsStatus = "idle";
    },
    removeAllItemsFailed: (state, action) => {
      state.removeAllItemsStatus = "failed";
    },
  },
});

export const {
  fetchItemsRequested,
  fetchItemsSucceeded,
  fetchItemsFailed,
  addItemRequested,
  addItemSucceeded,
  addItemFailed,
  editItemRequested,
  editItemSucceeded,
  editItemFailed,
  removeItemRequested,
  removeItemSucceeded,
  removeItemFailed,
  removeAllItemsRequested,
  removeAllItemsSucceeded,
  removeAllItemsFailed,
  removeAllItems,
} = cartSlice.actions;

export const getItems = (state) => state.items;

export default cartSlice.reducer;
