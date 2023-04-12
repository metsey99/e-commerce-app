import { all, fork, takeEvery, takeLatest } from "redux-saga/effects";
import { loginRequested } from "./reducer/authSlice";
import { handleLogin } from "./handler/authHandler";

export function* watcherAuthLogin() {
  yield takeLatest(loginRequested, handleLogin);
}

export function* watcherFetchItems() {
  yield takeLatest();
}

export function* watcherAddItem() {
  yield takeEvery();
}

export function* watcherEditItem() {
  yield takeLatest();
}

export function* watcherDeleteItem() {
  yield takeEvery();
}

export default function* root() {
  yield all([fork(watcherAuthLogin)]);
}
