import axios from "axios";
import { addAuthHeader } from "../../service/utils";

export const fetchItemsRequest = () => {
  return axios.request({
    method: "get",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/api/orders/cart`,
    headers: addAuthHeader(),
  });
};

export const addItemRequest = (itemDetails) => {
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/api/orders/addToCart`,
    headers: addAuthHeader(),
    data: {
      productId: itemDetails.id,
      price: itemDetails.unitPrice,
      quantity: itemDetails.quantity,
    },
  });
};

export const editItemRequest = (itemDetails) => {
  return axios.request({
    method: "put",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/api/orders/${itemDetails.id}`,
    headers: addAuthHeader(),
    data: {
      productId: itemDetails.id,
      price: itemDetails.unitPrice,
      quantity: itemDetails.quantity,
    },
  });
};

export const removeItemRequest = (itemDetails) => {
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_MOCK_BACKEND_URL}/api/orders/removeFromCart`,
    headers: addAuthHeader(),
    data: {
      productId: itemDetails.id,
      price: itemDetails.unitPrice,
      quantity: itemDetails.quantity,
    },
  });
};
