import axios from "axios";
import { addAuthHeader, handleResponse } from "../utils";

export const register = (user) => {
  const request = axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/api/register`,
    data: {
      firstName: user.name,
      lastName: user.surname,
      email: user.email,
      password: user.password,
    },
  });
  return request;
};

export const forgotPassword = (email) => {
  const request = axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}`,
    data: {
      email,
    },
  });
  return request;
};

export const changePassword = (credentials) => {
  const request = axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}`,
    headers: addAuthHeader(),
    data: {
      oldPassword: credentials.oldPassword,
      newPassword: credentials.newPassword,
    },
  });

  return handleResponse(request);
};

export const checkEmailAvailability = (email) => {
  const request = axios.request({
    method: "get",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}`,
    data: {
      email,
    },
  });
};
