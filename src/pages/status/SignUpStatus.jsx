import { Button, Result } from "antd";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageWrapper } from "../PageWrapper";
import { LoadingOutlined } from "@ant-design/icons";
import { loginSucceeded } from "../../redux/reducer/authSlice";
import { useDispatch } from "react-redux";

export const SignUpStatus = (props) => {
  const [verificationStatus, setVerificationStatus] = React.useState("loading");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  React.useEffect(() => {
    if (token) {
      console.log("TOKEN", token);
      dispatch(loginSucceeded({ token: token }));
      setVerificationStatus("idle");
      navigate("/");
    } else {
      setVerificationStatus("failed");
    }
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
