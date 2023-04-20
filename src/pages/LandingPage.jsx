import { Space, Spin } from "antd";
import React from "react";
import { Product } from "../components/landing-page/Product";
import { PageWrapper } from "./PageWrapper";
import styled from "styled-components";
import { productsFetchRequested } from "../redux/reducer/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIdleLogin } from "../redux/reducer/authSlice";

const StyledSpace = styled(Space)`
  justify-content: space-around;
`;

export const LandingPage = () => {
  const { products, productFetchStatus } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setIdleLogin("idle"));
    dispatch(productsFetchRequested());
  }, []);

  return (
    <PageWrapper pageName="Landing Page">
      <StyledSpace wrap size={[16, 32]}>
        {productFetchStatus === "loading" ? (
          <Spin />
        ) : (
          products.map((item) => (
            <Product
              id={item.id}
              name={item.name}
              description={item.description}
              unitPrice={item.price}
              img={`${item.imageUri}`}
            />
          ))
        )}
      </StyledSpace>
    </PageWrapper>
  );
};
