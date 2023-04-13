import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducer/cartSlice";
import authSlice from "./reducer/authSlice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
import productSlice from "./reducer/productSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
