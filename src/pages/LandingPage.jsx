import { Space } from "antd";
import React from "react";
import { Product } from "../components/landing-page/Product";
import { PageWrapper } from "./PageWrapper";
import styled from "styled-components";
import apple from "../assets/Apple.jpg";
import orange from "../assets/Orange.jpg";
import banana from "../assets/Banana.jpg";
import { getAllProducts } from "../service/products";

const StyledSpace = styled(Space)`
  justify-content: space-around;
`;

const mockData1 = {
  name: "Apple",
  description: "Highly accessible, many people's favorite fruit, red color",
  unitPrice: 1.25,
  id: "123",
  image: apple,
};

const mockData2 = {
  name: "Orange",
  description: "Highly accessible, many people's favorite fruit, orange color",
  unitPrice: 2.3,
  id: "124",
  image: orange,
};

const mockData3 = {
  name: "Banana",
  description: "Highly accessible, many people's favorite fruit, yellow color",
  unitPrice: 0.85,
  id: "125",
  image: banana,
};

const mockData = [
  mockData1,
  mockData2,
  mockData3,
  mockData1,
  mockData2,
  mockData3,
  mockData1,
  mockData2,
  mockData3,
];

export const LandingPage = () => {
  const [allProducts, setAllProducts] = React.useState([]);

  React.useEffect(() => {
    const res = getAllProducts();
    res.then((data) => {
      console.log(data.data);
      setAllProducts(data.data);
    });
  }, []);

  return (
    <PageWrapper pageName="Landing Page">
      <StyledSpace wrap size={[16, 32]}>
        {mockData.map((item) => (
          <Product
            id={item.id}
            name={item.name}
            description={item.description}
            unitPrice={item.unitPrice}
            img={item.image}
          />
        ))}
      </StyledSpace>
    </PageWrapper>
  );
};
