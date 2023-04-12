import { store } from "../redux/store";
import { logout as logoutAction } from "../redux/reducer/authSlice";

export const addAuthHeader = () => {
  const token = authToken();
  if (!!token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

const authToken = () => {
  return store.getState().auth.auth;
};

export const handleResponse = async (request) => {
  try {
    const data = await request;
    return data;
  } catch (error) {
    const { response } = error;
    if ([401, 403].includes(response.status)) {
      const logout = () => store.dispatch(store.dispatch(logoutAction()));
      logout();
    }
  }
};