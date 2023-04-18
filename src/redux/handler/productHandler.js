import { call, put } from "redux-saga/effects";
import { productFetchRequest } from "../requests/product";
import {
  productsFetchFailed,
  productsFetchSucceeded,
} from "../reducer/productSlice";

export function* handleProductFetch() {
  try {
    const response = yield call(productFetchRequest);
    const products = response.data;
    yield put(productsFetchSucceeded(products));
  } catch (error) {
    yield put(productsFetchFailed(error));
  }
}
