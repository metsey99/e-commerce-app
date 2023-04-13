import { Space } from "antd";
import React from "react";
import { Product } from "../components/landing-page/Product";
import { PageWrapper } from "./PageWrapper";
import styled from "styled-components";
import { getAllProducts } from "../service/products";
import { productFetch } from "../redux/reducer/productSlice";
import { useDispatch } from "react-redux";

const StyledSpace = styled(Space)`
  justify-content: space-around;
`;

// const mockData1 = {
//   name: "Apple",
//   description: "Highly accessible, many people's favorite fruit, red color",
//   price: 1.25,
//   id: "123",
//   image: apple,
// };

// const mockData2 = {
//   name: "Orange",
//   description: "Highly accessible, many people's favorite fruit, orange color",
//   price: 2.3,
//   id: "124",
//   image: orange,
// };

// const mockData3 = {
//   name: "Banana",
//   description: "Highly accessible, many people's favorite fruit, yellow color",
//   price: 0.85,
//   id: "125",
//   image: banana,
// };

// const mockData = [
//   mockData1,
//   mockData2,
//   mockData3,
//   mockData1,
//   mockData2,
//   mockData3,
//   mockData1,
//   mockData2,
//   mockData3,
// ];

export const LandingPage = () => {
  const [allProducts, setAllProducts] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const res = getAllProducts();
    res.then((data) => {
      setAllProducts(data.data);
      dispatch(productFetch(data.data));
    });
  }, []);

  return (
    <PageWrapper pageName="Landing Page">
      <StyledSpace wrap size={[16, 32]}>
        {allProducts.map((item) => (
          <Product
            id={item.id}
            name={item.name}
            description={item.description}
            unitPrice={item.price}
            img={`data:image/jpeg;base64, ${item.imgBase64}`}
          />
        ))}
      </StyledSpace>
    </PageWrapper>
  );
};
