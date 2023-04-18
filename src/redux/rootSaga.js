import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";
import {
  handleAddItem,
  handleEditItem,
  handleFetchItems,
  handleRemoveItem,
  handleRemoveItems,
} from "./handler/cartHandler";
import {
  addItemRequested,
  editItemRequested,
  fetchItemsRequested,
  removeAllItemsRequested,
  removeItemRequested,
} from "./reducer/cartSlice";
import { handleProductFetch } from "./handler/productHandler";
import { productsFetchRequested } from "./reducer/productSlice";

export function* watcherFetchItems() {
  yield takeLatest(fetchItemsRequested, handleFetchItems);
}

export function* watcherAddItem() {
  yield takeEvery(addItemRequested, handleAddItem);
}

export function* watcherEditItem() {
  yield takeEvery(editItemRequested, handleEditItem);
}

export function* watcherRemoveItem() {
  yield takeEvery(removeItemRequested, handleRemoveItem);
}

export function* watcherRemoveAllItems() {
  yield takeLatest(removeAllItemsRequested, handleRemoveItems);
}

export function* watcherFetchProducts() {
  yield takeLatest(productsFetchRequested, handleProductFetch);
}

export default function* root() {
  yield all([
    fork(watcherFetchItems),
    fork(watcherAddItem),
    fork(watcherEditItem),
    fork(watcherRemoveItem),
    fork(watcherRemoveAllItems),
    fork(watcherFetchProducts),
  ]);
}
