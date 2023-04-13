import axios from "axios";
import { addAuthHeader, handleResponse } from "../utils";

export const loginRequest = (credentials) => {
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/login`,
    data: {
      email: credentials.email,
      password: credentials.password,
    },
  });
};

export const register = (user) => {
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/register`,
    data: {
      firstName: user.name,
      lastName: user.surname,
      email: user.email,
      password: user.password,
    },
  });
};

export const checkEmailAvailability = (email) => {
  return axios.request({
    method: "get",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/email/${email}`,
  });
};

//TODO Bunlar lazim mi sor
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

//TODO Bunlar lazim mi sor
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
