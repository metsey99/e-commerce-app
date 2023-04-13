import { Button, Divider, Modal, Spin, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  clearCart,
  removeAllItemsRequested,
} from "../../redux/reducer/cartSlice";

const { confirm } = Modal;

const StyledSummaryContainer = styled.div`
  border: 2px solid rgb(136, 136, 136);
  border-radius: 12px;
  padding: 5%;
  position: sticky;
  top: 10px;
  background-color: #fff;
`;

const StyledTitle = styled(Typography)`
  font-size: 28px;
  font-weight: 600;
  text-align: right;
`;

const StyledOrderInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTotalPrice = styled(Typography)`
  font-size: 16px;
`;

const StyledSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CheckoutSummary = () => {
  const navigate = useNavigate();
  const { items, removeItemStatus, editItemStatus, fetchItemsStatus } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //TODO: Delete Later
  function delay(time) {
    return new Promise((resolve, reject) => setTimeout(reject, time));
  }

  //TODO: Replace with API Call
  async function test() {
    await delay(1500);
    return true;
  }

  const handlePurchase = () => {
    const res = test();
    res
      .then((data) => {
        dispatch(clearCart());
        navigate("/order-status/success");
      })
      .catch((err) => {
        navigate("/order-status/failed");
      });
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => (total += item.quantity * item.unitPrice));
    return total.toFixed(2);
  };

  const handleClear = () => {
    confirm({
      title: `Are you sure remove all items from your cart?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(removeAllItemsRequested());
      },
      onCancel() {},
    });
  };

  console.log(removeItemStatus, editItemStatus, fetchItemsStatus);

  return (
    <StyledSummaryContainer>
      <StyledTitle>Order Summary</StyledTitle>
      <Divider />
      {removeItemStatus === "idle" &&
      editItemStatus === "idle" &&
      fetchItemsStatus === "idle" ? (
        <StyledOrderInfo>
          <StyledTotalPrice>Order Total</StyledTotalPrice>
          <StyledTotalPrice>{calculateTotal()}TL</StyledTotalPrice>
        </StyledOrderInfo>
      ) : (
        <StyledSpinnerContainer>
          <Spin size="large" />
        </StyledSpinnerContainer>
      )}

      <Divider />
      <Button
        block
        type="primary"
        onClick={handlePurchase}
        size="large"
        disabled={calculateTotal() === "0.00"}
      >
        Purchase
      </Button>
      <Button
        block
        type="primary"
        danger
        onClick={handleClear}
        size="large"
        style={{ marginTop: "10px" }}
        disabled={calculateTotal() === "0.00"}
      >
        Clear the Cart
      </Button>
    </StyledSummaryContainer>
  );
};
