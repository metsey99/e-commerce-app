import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";
import { loginRequested } from "./reducer/authSlice";
import { handleLogin } from "./handler/authHandler";
import {
  handleAddItem,
  handleEditItem,
  handleFetchItems,
  handleRemoveItem,
} from "./handler/cartHandler";
import {
  addItemRequested,
  editItemRequested,
  fetchItemsRequested,
  removeItemRequested,
} from "./reducer/cartSlice";

export function* watcherAuthLogin() {
  yield takeLatest(loginRequested, handleLogin);
}

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

export default function* root() {
  yield all([
    fork(watcherAuthLogin),
    fork(watcherFetchItems),
    fork(watcherAddItem),
    fork(watcherEditItem),
    fork(watcherRemoveItem),
  ]);
}
