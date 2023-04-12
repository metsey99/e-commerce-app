import axios from "axios";
import { addAuthHeader, handleResponse } from "../utils";

export const register = (user) => {
  const request = axios.request({
    method: "post",
    url: "/api/register",
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
    url: "",
    data: {
      email,
    },
  });
  return request;
};

export const changePassword = (credentials) => {
  const request = axios.request({
    method: "post",
    url: "",
    headers: addAuthHeader(),
    data: {
      oldPassword: credentials.oldPassword,
      newPassword: credentials.newPassword,
    },
  });

  return handleResponse(request);
};
