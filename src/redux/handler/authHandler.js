import { call, put } from "redux-saga/effects";
import { loginRequest } from "../requests/auth";
import { loginFailed, loginSucceeded } from "../reducer/authSlice";

export function* handleLogin(action) {
  const credentials = action.payload;
  try {
    const response = yield call(loginRequest, credentials);
    const data = response.data;
    yield put(loginSucceeded(data));
  } catch (error) {
    yield put(loginFailed(error));
  }
}
