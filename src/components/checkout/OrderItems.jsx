import React from "react";
import { ItemContainer } from "./ItemContainer";
import { Empty, Spin } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItemRequested } from "../../redux/reducer/cartSlice";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: ${(props) => (props.noResult ? "#fff" : "transparent")};
  border-radius: 12px;
  padding: ${(props) => (props.noResult ? "5%" : "0")} 0;
  ${(props) =>
    props.noResult &&
    `display: flex;
  justify-content: center;
  align-items: center;`}
`;

export const OrderItems = () => {
  const { items, editItemStatus, removeItemStatus, fetchItemsStatus } =
    useSelector((state) => state.cart);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  const handleItemRemoval = (itemDetails) => {
    dispatch(removeItemRequested(itemDetails));
  };

  const matchProducts = (item) => {
    const matched = products.filter((p) => p.id === item.productId)[0];
    if (matched) {
      return {
        name: matched.name,
        description: matched.description,
        quantity: item.quantity,
        price: item.price,
        img: matched.imageUri,
      };
    }
  };

  return (
    <StyledContainer
      noResult={
        items.length < 1 ||
        editItemStatus !== "idle" ||
        removeItemStatus !== "idle"
      }
    >
      {editItemStatus !== "idle" ||
      removeItemStatus !== "idle" ||
      fetchItemsStatus !== "idle" ? (
        <Spin size="large" />
      ) : items && items.length ? (
        items.map((item) => {
          const newItem = matchProducts(item);
          return (
            <ItemContainer
              id={item.productId}
              name={newItem.name}
              description={newItem.description}
              unitPrice={newItem.price}
              quantity={newItem.quantity}
              productImg={newItem.img}
              removeItem={() =>
                handleItemRemoval({ id: item.productId, quantity: 0, price: 0 })
              }
            />
          );
        })
      ) : (
        <Empty
          description={
            <span style={{ color: "#000" }}>
              Your Cart is empty.{" "}
              <Link to="/">
                <b>Try adding items</b>
              </Link>
            </span>
          }
        />
      )}
    </StyledContainer>
  );
};
