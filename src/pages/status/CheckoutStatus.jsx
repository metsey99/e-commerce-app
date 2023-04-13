import { Button, Result } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { PageWrapper } from "../PageWrapper";

export const CheckoutStatus = (props) => {
  const { status } = useParams();

  return (
    <PageWrapper>
      {status === "success" && (
        <Result
          style={{ backgroundColor: "#fff", borderRadius: "12px" }}
          status="success"
          title={"Order has been received"}
          subTitle={"Your order has been received and ready to be processed."}
          extra={[
            <Link to="/">
              <Button type="primary">Go to Home Page</Button>
            </Link>,
          ]}
        />
      )}
      {status === "failed" && (
        <Result
          style={{ backgroundColor: "#fff", borderRadius: "12px" }}
          status="error"
          title={"An Exception has occured"}
          subTitle={"An exception has been occured, please try again later."}
          extra={[
            <Link to="/">
              <Button type="primary">Go to Home Page</Button>
            </Link>,
          ]}
        />
      )}
    </PageWrapper>
  );
};
