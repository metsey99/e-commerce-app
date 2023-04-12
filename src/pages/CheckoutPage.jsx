import React, { useEffect } from "react";
import { PageWrapper } from "./PageWrapper";
import { Col, Row } from "antd";
import { CheckoutSummary } from "../components/checkout/CheckoutSummary";
import { OrderItems } from "../components/checkout/OrderItems";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, []);

  return (
    <PageWrapper pageName="Checkout">
      <Row gutter={[24, 0]} wrap>
        <Col md={16} xs={24}>
          <OrderItems />
        </Col>
        <Col md={8}>
          <CheckoutSummary />
        </Col>
      </Row>
    </PageWrapper>
  );
};
