import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "../PageWrapper";

export const PassChangeStatus = (props) => {
  return (
    <PageWrapper>
      <Result
        style={{ backgroundColor: "#fff", borderRadius: "12px" }}
        status="success"
        title={"Successfully updated the password"}
        subTitle={
          "Your password has been successfully updated. Please log in to your account with your new password."
        }
        extra={[
          <Link to="/login">
            <Button type="primary" key="console">
              Go to Login Page
            </Button>
          </Link>,
        ]}
      />
    </PageWrapper>
  );
};
