import { call, put } from "redux-saga/effects";
import {
  addItemFailed,
  addItemSucceeded,
  editItemFailed,
  editItemSucceeded,
  fetchItemsFailed,
  fetchItemsSucceeded,
  removeItemFailed,
  removeItemSucceeded,
} from "../reducer/cartSlice";
import {
  addItemRequest,
  editItemRequest,
  fetchItemsRequest,
  removeItemRequest,
} from "../requests/cart";

export function* handleFetchItems() {
  try {
    const response = yield call(fetchItemsRequest());
    const data = response.data;
    yield put(fetchItemsSucceeded(data));
  } catch (error) {
    yield put(fetchItemsFailed(error));
  }
}

export function* handleAddItem(itemDetails) {
  try {
    const response = yield call(addItemRequest(itemDetails));
    const data = response.data;
    yield put(addItemSucceeded(data));
  } catch (error) {
    yield put(addItemFailed(error));
  }
}

export function* handleEditItem(itemDetails) {
  try {
    const response = yield call(editItemRequest(itemDetails));
    const data = response.data;
    yield put(editItemSucceeded(data));
  } catch (error) {
    yield put(editItemFailed(error));
  }
}

export function* handleRemoveItem(itemDetails) {
  try {
    const response = yield call(removeItemRequest(itemDetails));
    const data = response.data;
    yield put(removeItemSucceeded(data));
  } catch (error) {
    yield put(removeItemFailed(error));
  }
}
