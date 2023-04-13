import axios from "axios";

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
