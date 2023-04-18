import axios from "axios";
import { addAuthHeader } from "../utils";

export const checkout = () => {
  const request = axios.request({
    method: "post",
    url: `${process.env.REACT_APP_ORDER_BACKEND_URL}/orders/checkout`,
    headers: addAuthHeader(),
  });
  return request;
};
