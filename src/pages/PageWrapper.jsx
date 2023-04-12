import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  min-height: 100vh;
  padding: 3% 7.5%;
  background: rgb(46, 42, 107);
  background: linear-gradient(
    90deg,
    rgba(46, 42, 107, 1) 0%,
    rgba(100, 133, 193, 1) 48%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const StyledPageName = styled.p`
  font-size: 28px;
  font-weight: 600;
  color: #fff;
`;

export const PageWrapper = (props) => {
  return (
    <StyledWrapper>
      <StyledPageName>{props.pageName}</StyledPageName>
      {props.children}
    </StyledWrapper>
  );
};
