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

export const login2faRequest = (credentials) => {
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/login-twofactor-auth`,
    data: {
      email: credentials.email,
      password: credentials.password,
      verificationCode: credentials.verificationCode,
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
      dateOfBirth: user.dateOfBirth,
      mobile: user.mobile,
    },
  });
};

export const verifyRegister = (token) => {
  return axios.request({
    method: "get",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/confirm?token=${token}`,
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
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/password-reset-request`,
    data: {
      email,
      password: "",
      message: "",
      token: "",
    },
  });
  return request;
};

export const retrieveUserInfo = (token) => {
  return axios.request({
    method: "get",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/password-reset-request/${token}`,
  });
};

export const changePassword = (credentials) => {
  const request = axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/password-reset`,
    data: {
      email: credentials.email,
      password: credentials.password,
      token: credentials.token,
      message: "",
    },
  });

  return request;
};
