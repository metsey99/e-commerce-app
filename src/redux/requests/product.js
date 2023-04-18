import axios from "axios";

export const productFetchRequest = () => {
  const request = axios.request({
    method: "get",
    url: `${process.env.REACT_APP_PRODUCT_BACKEND_URL}/products`,
  });

  return request;
};
