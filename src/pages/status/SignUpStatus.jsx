import { Button, Result } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageWrapper } from "../PageWrapper";
import { LoadingOutlined } from "@ant-design/icons";

//TODO: Delete Later
function delay(time) {
  return new Promise((resolve, reject) => setTimeout(reject, time));
}

//TODO: Replace with API Call
async function test() {
  await delay(1500);
  return true;
}

export const SignUpStatus = (props) => {
  const [verificationStatus, setVerificationStatus] = React.useState("loading");
  const navigate = useNavigate();

  React.useEffect(() => {
    //TODO aktivasyon registration
    const res = test();

    res
      .then((data) => {
        setVerificationStatus("idle");
        //set jwt
        navigate("/");
      })
      .catch((err) => {
        setVerificationStatus("failed");
      });
  }, []);

  return (
    <PageWrapper>
      {verificationStatus === "loading" && (
        <Result
          style={{ backgroundColor: "#fff", borderRadius: "12px" }}
          icon={<LoadingOutlined />}
        />
      )}
      {verificationStatus === "idle" && (
        <Result
          style={{ backgroundColor: "#fff", borderRadius: "12px" }}
          status="success"
          title={"Successfully updated the password"}
          subTitle={
            "Your password has been successfully updated. Please login with your updated credentials."
          }
          extra={[
            <Link to="/">
              <Button type="primary" key="console">
                Go to Home Page
              </Button>
            </Link>,
          ]}
        />
      )}
      {verificationStatus === "failed" && (
        <Result
          style={{ backgroundColor: "#fff", borderRadius: "12px" }}
          status="error"
          title={"An Exception has occured"}
          subTitle={"An exception has been occured, please try again later."}
          extra={[
            <Link to="/">
              <Button type="primary" key="console">
                Go to Home Page
              </Button>
            </Link>,
          ]}
        />
      )}
    </PageWrapper>
  );
};
