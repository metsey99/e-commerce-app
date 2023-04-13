import React from "react";
import { ItemContainer } from "./ItemContainer";
import { Empty, Spin } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemRequested,
  removeItemSucceeded,
} from "../../redux/reducer/cartSlice";
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
  const { items, editItemStatus, removeItemStatus } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const handleItemRemoval = (productId) => {
    dispatch(removeItemRequested(productId));
  };

  return (
    <StyledContainer
      noResult={
        items.length < 1 ||
        editItemStatus !== "idle" ||
        removeItemStatus !== "idle"
      }
    >
      {editItemStatus !== "idle" || removeItemStatus !== "idle" ? (
        <Spin size="large" />
      ) : items.length ? (
        items.map((item) => {
          return (
            //TODO: image ekle
            <ItemContainer
              id={item.id}
              name={item.name}
              description={item.description}
              unitPrice={item.unitPrice}
              quantity={item.quantity}
              removeItem={() => handleItemRemoval(item.id)}
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
