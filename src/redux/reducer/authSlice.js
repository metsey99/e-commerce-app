import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  auth: localStorage.getItem("user"),
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.status = "loading";
    },
    loginSucceeded: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));

      state.auth = JSON.stringify(action.payload);
      state.status = "idle";
    },
    loginFailed: (state, action) => {
      state.error = action.payload.message;
      state.status = "failed";
    },
    logout: (state) => {
      state.auth = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginRequested, loginSucceeded, loginFailed, logout } =
  authSlice.actions;

export default authSlice.reducer;
