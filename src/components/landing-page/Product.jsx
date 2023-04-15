import React from "react";
import styled from "styled-components";
import { Button, Card, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemRequested,
  addItemSucceeded,
} from "../../redux/reducer/cartSlice";

const { Meta } = Card;

const StyledItemPrice = styled(Typography)`
  text-align: right;
  font-style: italic;
  font-weight: bold;
`;

const itemDescription = (description, unitPrice) => (
  <div>
    <Typography>{description}</Typography>
    <StyledItemPrice>{unitPrice}TL</StyledItemPrice>
  </div>
);

export const Product = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  const handleCardAdd = () => {
    console.log(props.id);
    dispatch(
      addItemRequested({
        quantity: 1,
        id: props.id,
        price: props.unitPrice,
      })
    );
    messageApi.open({
      type: "success",
      duration: 1.5,
      content: `${props.name} has added successfully`,
    });
  };

  return (
    <>
      {contextHolder}
      <Card
        bordered
        hoverable
        style={{ width: 225 }}
        cover={
          <img
            alt="Product"
            src={props.img}
            style={{ height: 200, border: "1px solid #f0f0f0" }}
          />
        }
        actions={
          auth && [
            <Button
              style={{ width: "90%" }}
              type="primary"
              onClick={handleCardAdd}
            >
              Add to Card
            </Button>,
          ]
        }
      >
        <Meta
          title={props.name}
          description={itemDescription(props.description, props.unitPrice)}
        />
      </Card>
    </>
  );
};
