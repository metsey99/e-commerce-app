import { Button, Col, Row, Typography, Modal } from "antd";
import React from "react";
import Apple from "../../assets/Apple.jpg";
import styled from "styled-components";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { editItemSucceeded } from "../../redux/reducer/cartSlice";

const { confirm } = Modal;

const StyledContainer = styled(Row)`
  border: 2px solid #888;
  padding: 2%;
  border-radius: 12px;
  margin-bottom: 2%;
  background-color: #fff;
`;

const StyledItemInfo = styled(Col)`
  & > img {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    margin-right: 10px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledProductName = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
`;

const StyledCounter = styled(Col)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & > input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 0.5px solid #d9d9d9;
    width: 50px;
    margin: 0 5px;
    text-align: center;
  }
  margin: 2.5% 0;
`;

const StyledPrice = styled(Col)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  & > article {
    font-size: 18px;
    font-weight: 700;
  }
`;

export const ItemContainer = (props) => {
  const item = useSelector(
    (state) => state.cart.items.filter((item) => item.id === props.id)[0]
  );

  const dispatch = useDispatch();

  const handleQuantChange = (quantity) => {
    dispatch(editItemSucceeded({ ...item, quantity: Math.max(0, quantity) }));
  };

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure remove ${props.name}?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        props.removeItem();
      },
      onCancel() {},
    });
  };

  return (
    <StyledContainer justify="space-between">
      <StyledItemInfo md={14} span={12} xs={24} lg={10}>
        <img src={Apple} alt={props.name} />
        <div>
          <StyledProductName>{props.name}</StyledProductName>
          <Typography>{props.description}</Typography>
        </div>
      </StyledItemInfo>
      <StyledCounter span={6} md={10} lg={6} xs={12}>
        <Button
          type="primary"
          onClick={() => handleQuantChange(item.quantity - 1)}
          disabled={item.quantity === 1}
        >
          -
        </Button>
        <input
          type="text"
          pattern="[0-9]*"
          value={item.quantity}
          onChange={(e) => {
            handleQuantChange(
              e.target.validity.valid ? e.target.value : item.quantity
            );
          }}
        />
        <Button
          type="primary"
          onClick={() => handleQuantChange(item.quantity + 1)}
        >
          +
        </Button>
      </StyledCounter>
      <StyledPrice lg={6} xs={12}>
        <Typography>
          {(props.unitPrice * item.quantity).toFixed(2)}TL
        </Typography>
        <Button onClick={showDeleteConfirm} danger>
          <DeleteOutlined />
        </Button>
      </StyledPrice>
    </StyledContainer>
  );
};
