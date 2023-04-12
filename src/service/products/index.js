import axios from "axios";
import { addAuthHeader, handleResponse } from "../utils";

export const getAllProducts = () => {
  const request = axios.request({
    method: "get",
    url: "http://localhost:4000/users",
    headers: addAuthHeader(),
  });

  return handleResponse(request);
};
