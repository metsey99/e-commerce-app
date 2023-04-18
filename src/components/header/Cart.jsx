import { Popover, Button, Divider, Row, Col, Empty, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { fetchItemsRequested } from "../../redux/reducer/cartSlice";
import { getAllProducts } from "../../service/products";
import { productFetch } from "../../redux/reducer/productSlice";

const StyledItemContainer = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: 5px 0;
`;

const StyledImageContainer = styled(Col)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const StyledItemName = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const StyledCount = styled.div`
  font-style: italic;
  color: #777;
`;

const StyledPriceContainer = styled.div`
  font-size: 18px;
`;

const StyledItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 300px;
`;

const StyledPopupBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
`;

const matchProducts = (products, item) => {
  const matched = products.filter((p) => p.id === item.productId)[0];
  if (matched) {
    return {
      name: matched.name,
      quantity: item.quantity,
      price: item.price,
    };
  }
};

const CartContent = (products, addedItems) => {
  return addedItems && addedItems.length ? (
    <StyledItemsContainer>
      {addedItems.map((i) => {
        const item = matchProducts(products, i);
        return (
          <StyledItemContainer>
            <StyledImageContainer>
              <div>
                <StyledItemName>{item?.name}</StyledItemName>
                <StyledCount>{i.quantity} pcs.</StyledCount>
              </div>
            </StyledImageContainer>
            <Col>
              <StyledPriceContainer>
                {(i.price * i.quantity).toFixed(2)}TL
              </StyledPriceContainer>
            </Col>
          </StyledItemContainer>
        );
      })}
      <StyledPopupBottom>
        <Link to="/checkout">
          <Button type="primary">Go to Checkout</Button>
        </Link>
      </StyledPopupBottom>
    </StyledItemsContainer>
  ) : (
    <StyledItemsContainer>
      <Empty
        description="Your cart is empty"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </StyledItemsContainer>
  );
};

export const Cart = () => {
  const { items, addItemStatus, fetchItemStatus } = useSelector(
    (state) => state.cart
  );
  const { products, productFetchStatus } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsRequested());
  }, []);

  return addItemStatus !== "loading" &&
    fetchItemStatus !== "loading" &&
    productFetchStatus !== "loading" ? (
    <Popover
      content={CartContent(products, items)}
      title={
        <>
          <p style={{ marginBottom: 0, fontSize: "24px" }}>Cart</p>
          <Divider style={{ margin: "5px 0" }} />
        </>
      }
      trigger="hover"
      placement="bottomRight"
    >
      <Button>
        <ShoppingCartOutlined />
        Cart
      </Button>
    </Popover>
  ) : (
    <Spin size="large" />
  );
};
