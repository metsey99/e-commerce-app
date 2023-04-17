import { Button, Result } from "antd";
import React from "react";
import { PageWrapper } from "../PageWrapper";

export const CheckMailPage = () => {
  return (
    <PageWrapper>
      <Result
        style={{ backgroundColor: "#fff", borderRadius: "12px" }}
        title="Your request has been received"
        subTitle="Your forgot password request has been received. Please check your provided mail for a password reset email."
        extra={
          <Button type="primary" key="console">
            Go Console
          </Button>
        }
      />
    </PageWrapper>
  );
};
