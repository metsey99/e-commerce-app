import { Button, Result } from "antd";
import React from "react";
import { PageWrapper } from "../PageWrapper";

export const CheckMailPage = () => {
  return (
    <PageWrapper>
      <Result
        style={{ backgroundColor: "#fff", borderRadius: "12px" }}
        title="Please check your email"
        subTitle="Your request has been received. Please check your provided mail for further actions."
      />
    </PageWrapper>
  );
};
