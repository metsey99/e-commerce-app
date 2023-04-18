import React, { useEffect } from "react";
import { PageWrapper } from "./PageWrapper";
import { Col, Row } from "antd";
import { CheckoutSummary } from "../components/checkout/CheckoutSummary";
import { OrderItems } from "../components/checkout/OrderItems";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  productFetch,
  productsFetchRequested,
} from "../redux/reducer/productSlice";
import { getAllProducts } from "../service/products";

export const CheckoutPage = () => {
  const { productFetchStatus } = useSelector((state) => state.product);
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
      dispatch(productsFetchRequested());
    }
  }, []);

  return (
    <PageWrapper pageName="Checkout">
      <Row gutter={[24, 0]} wrap>
        <Col md={16} xs={24}>
          {productFetchStatus === "idle" && <OrderItems />}
        </Col>
        <Col md={8}>
          <CheckoutSummary />
        </Col>
      </Row>
    </PageWrapper>
  );
};
