import axios from "axios";
import { addAuthHeader } from "../../service/utils";

export const fetchItemsRequest = () => {
  return axios.request({
    method: "get",
    url: `${process.env.REACT_APP_ORDER_BACKEND_URL}/orders/cart`,
    headers: addAuthHeader(),
  });
};

export const addItemRequest = (itemDetails) => {
  console.log("ASD", itemDetails);
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_ORDER_BACKEND_URL}/orders/addToCart`,
    data: {
      productId: itemDetails.id,
      price: itemDetails.price,
      quantity: itemDetails.quantity,
    },
  });
};

export const editItemRequest = (itemDetails) => {
  return axios.request({
    method: "put",
    url: `${process.env.REACT_APP_ORDER_BACKEND_URL}/orders/updateOrder`,
    data: {
      productId: itemDetails.id,
      price: itemDetails.price,
      quantity: itemDetails.quantity,
    },
  });
};

export const removeItemRequest = (itemDetails) => {
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_ORDER_BACKEND_URL}/orders/removeFromCart`,
    data: {
      productId: itemDetails.id,
      price: itemDetails.price,
      quantity: itemDetails.quantity,
    },
  });
};

export const removeAllItemsRequest = () => {
  return axios.request({
    method: "post",
    url: `${process.env.REACT_APP_ORDER_BACKEND_URL}/orders/clearCart`,
  });
};
