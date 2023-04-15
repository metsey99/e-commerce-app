import { call, put } from "redux-saga/effects";
import {
  addItemFailed,
  addItemSucceeded,
  editItemFailed,
  editItemSucceeded,
  fetchItemsFailed,
  fetchItemsSucceeded,
  removeAllItemsFailed,
  removeAllItemsSucceeded,
  removeItemFailed,
  removeItemSucceeded,
} from "../reducer/cartSlice";
import {
  addItemRequest,
  editItemRequest,
  fetchItemsRequest,
  removeAllItemsRequest,
  removeItemRequest,
} from "../requests/cart";

export function* handleFetchItems() {
  try {
    const response = yield call(fetchItemsRequest);
    const { cartItems } = response.data;
    yield put(fetchItemsSucceeded(cartItems));
  } catch (error) {
    yield put(fetchItemsFailed(error));
  }
}

export function* handleAddItem(itemDetails) {
  try {
    console.log("asd", itemDetails.payload);
    const response = yield call(addItemRequest, itemDetails.payload);
    const data = response.data;
    yield put(addItemSucceeded(data));
  } catch (error) {
    yield put(addItemFailed(error));
  }
}

export function* handleEditItem(itemDetails) {
  try {
    const response = yield call(editItemRequest, itemDetails);
    const data = response.data;
    yield put(editItemSucceeded(data));
  } catch (error) {
    yield put(editItemFailed(error));
  }
}

export function* handleRemoveItem(itemDetails) {
  try {
    const response = yield call(removeItemRequest, itemDetails);
    const data = response.data;
    console.log(data);
    yield put(removeItemSucceeded(data));
  } catch (error) {
    yield put(removeItemFailed(error));
  }
}

export function* handleRemoveItems() {
  try {
    const response = yield call(removeAllItemsRequest);
    const data = response.data;
    yield put(removeAllItemsSucceeded(data));
  } catch (error) {
    yield put(removeAllItemsFailed(error));
  }
}
