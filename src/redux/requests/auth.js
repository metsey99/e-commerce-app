import axios from "axios";

export const loginRequest = (credentials) => {
  return axios.request({
    method: "post",
    url: "http://localhost:4000/users/authenticate",
    data: {
      username: credentials.username,
      password: credentials.password,
    },
  });
};
