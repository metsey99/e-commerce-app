import axios from "axios";

export const loginRequest = (credentials) => {
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/users/authenticate`,
    data: {
      username: credentials.username,
      password: credentials.password,
    },
  });
};
