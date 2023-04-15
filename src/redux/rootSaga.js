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

export default function* root() {
  yield all([
    fork(watcherFetchItems),
    fork(watcherAddItem),
    fork(watcherEditItem),
    fork(watcherRemoveItem),
    fork(watcherRemoveAllItems),
  ]);
}
