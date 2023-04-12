import axios from "axios";
import { addAuthHeader } from "../../service/utils";

export const fetchItemsRequest = () => {
  return axios.request({
    method: "get",
    url: "http://localhost:4000",
    headers: addAuthHeader(),
  });
};

export const addItemRequest = (itemDetails) => {
  return axios.request({
    method: "post",
    url: "http://localhost:4000/api/orders/addToCart",
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
    url: `http://localhost:4000/api/orders/${itemDetails.id}`,
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
    url: "http://localhost:4000/api/orders/removeFromCart",
    headers: addAuthHeader(),
    data: {
      productId: itemDetails.id,
      price: itemDetails.unitPrice,
      quantity: itemDetails.quantity,
    },
  });
};
