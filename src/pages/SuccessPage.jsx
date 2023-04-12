import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const successMessages = {
  passUpdate: {
    title: "Successfully updated the password",
    subTitle:
      "Your password has been successfully updated. Please login with your updated credentials.",
  },
  orderSuccess: {
    title: "Order has been received",
    subTitle: "Your order has been received and ready to be processed.",
  },
  signupSuccess: {
    title: "One last step for account creation",
    subTitle: "An activation mail will be sent to provided email address.",
  },
};

export const SuccessPage = (props) => {
  return (
    <Result
      status="success"
      title={successMessages[props.type].title}
      subTitle={successMessages[props.type].subTitle}
      extra={[
        <Button type="primary" key="console">
          <Link to="/">Go to Home Page</Link>
        </Button>,
      ]}
    />
  );
};
