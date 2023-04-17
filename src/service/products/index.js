import axios from "axios";
import { addAuthHeader } from "../utils";

//TODO: change endpoint
export const getAllProducts = () => {
  const request = axios.request({
    method: "get",
    url: `${process.env.REACT_APP_PRODUCT_BACKEND_URL}/products`,
  });

  return request;
};

//TODO: add customer id from redux
export const checkout = () => {
  const request = axios.request({
    method: "post",
    url: `${process.env.REACT_APP_ORDER_BACKEND_URL}/orders/checkout`,
    headers: addAuthHeader(),
  });
  return request;
};
