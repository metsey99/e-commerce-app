import { createSlice } from "@reduxjs/toolkit";

const mockData1 = {
  name: "Apple",
  description: "Highly accessible, many people's favorite fruit, red color",
  price: 1.25,
  quantity: 3,
  id: "123",
};

const mockData2 = {
  name: "Orange",
  description: "Highly accessible, many people's favorite fruit, orange color",
  price: 2.3,
  quantity: 5,
  id: "124",
};

const mockData3 = {
  name: "Banana",
  description: "Highly accessible, many people's favorite fruit, yellow color",
  price: 0.85,
  quantity: 7,
  id: "125",
};

const initialState = {
  items: [mockData1, mockData2, mockData3],
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
      console.log("action", action.payload);
      if (state.items.some((item) => item.id === action.payload.id)) {
        state.items = state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        state.items.push(action.payload);
      }

      state.addItemStatus = "idle";
    },
    addItemFailed: (state, action) => {
      console.log(action.payload);
      state.addItemStatus = "failed";
    },
    editItemRequested: (state) => {
      state.editItemStatus = "loading";
    },
    editItemSucceeded: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
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
      state.items = state.items.filter((item) => item.id !== action.payload);

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
