import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  auth: localStorage.getItem("token"),
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
      localStorage.setItem("token", action.payload.token);

      state.auth = action.payload.token;
      state.status = "idle";
    },
    loginFailed: (state, action) => {
      state.error = action.payload.message;
      state.status = "rejected";
    },
    logout: (state) => {
      state.auth = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginRequested, loginSucceeded, loginFailed, logout } =
  authSlice.actions;

export default authSlice.reducer;
