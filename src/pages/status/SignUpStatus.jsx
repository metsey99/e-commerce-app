import { Button, Result } from "antd";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageWrapper } from "../PageWrapper";
import { LoadingOutlined } from "@ant-design/icons";
import { loginSucceeded } from "../../redux/reducer/authSlice";
import { useDispatch } from "react-redux";
import { verifyRegister } from "../../service/auth";

export const SignUpStatus = (props) => {
  const [verificationStatus, setVerificationStatus] = React.useState("loading");
  const [errorMsg, setErrorMsg] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  React.useEffect(() => {
    if (token) {
      const res = verifyRegister(token);
      res
        .then((data) => {
          dispatch(loginSucceeded({ token: data.data.token }));
          setVerificationStatus("idle");
          navigate("/");
        })
        .catch((err) => {
          setErrorMsg(err.message);
          setVerificationStatus("failed");
        });
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
          title={"Sign Up Successfull"}
          subTitle={
            "Your account has been created. Please proceed to the Home Page."
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
          subTitle={
            errorMsg
              ? errorMsg
              : "An exception has been occured, please try again later."
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
    </PageWrapper>
  );
};
