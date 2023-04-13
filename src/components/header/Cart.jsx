import { Popover, Button, Divider, Row, Col, Empty } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { fetchItemsRequested } from "../../redux/reducer/cartSlice";

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

const CartContent = (products) => {
  return products.length ? (
    <StyledItemsContainer>
      {products.map((p) => (
        <StyledItemContainer>
          <StyledImageContainer>
            {/* <StyledImage src={Apple} alt="apple" /> */}
            <div>
              <StyledItemName>{p.name}</StyledItemName>
              <StyledCount>{p.quantity} pcs.</StyledCount>
            </div>
          </StyledImageContainer>
          <Col>
            <StyledPriceContainer>
              {(p.unitPrice * p.quantity).toFixed(2)}TL
            </StyledPriceContainer>
          </Col>
        </StyledItemContainer>
      ))}
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
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchItemsRequested());
  }, []);

  return (
    <Popover
      content={CartContent(items)}
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
  );
};
