import axios from "axios";
import { addAuthHeader, handleResponse } from "../utils";

//TODO: change endpoint
export const getAllProducts = () => {
  const request = axios.request({
    method: "get",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/products`,
  });

  return request;
};

//TODO: add customer id from redux
export const checkout = (customerId) => {
  const request = axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/orders/checkout/${customerId}`,
    headers: addAuthHeader(),
  });
  return handleResponse(request);
};
