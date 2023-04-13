import { Button, Form, Input, Alert } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginFailed,
  loginRequested,
  loginSucceeded,
} from "../../redux/reducer/authSlice";
import styled from "styled-components";
import { loginRequest } from "../../service/auth";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPageName = styled.p`
  font-size: 28px;
  font-weight: 600;
`;

const StyledLoginForm = styled(Form)`
  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 10%;
  }
  width: 50%;
  border: 1px solid black;
  padding: 3%;
  border-radius: 12px;
  background-color: white;
`;

export const LoginForm = () => {
  const [isVerificationStep, setIsVerificationStep] = React.useState(false);
  const [loginStatus, setLoginStatus] = React.useState("idle");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // const { status } = useSelector((state) => state.auth);

  const onLoginFinish = (values) => {
    setLoginStatus("loading");
    const credentials = { email: values.email, password: values.password };
    const res = loginRequest(credentials);

    res
      .then((data) => {
        setIsVerificationStep(true);
        setLoginStatus("idle");
        dispatch(loginRequested());
        form.resetFields();
      })
      .catch((err) => {
        setLoginStatus("failed");
        dispatch(loginFailed(err));
      });
  };

  const onVerificationFinish = (values) => {
    setLoginStatus("loading");

    //TODO: burada api call yapilacak
    const res = test();
    res
      .then((data) => {
        //TODO burada jwt gelmeli
        console.log(data);
        setLoginStatus("idle");
        dispatch(loginSucceeded({}));
        navigate("/");
      })
      .catch((err) => {
        setLoginStatus("failed");
        dispatch(loginFailed(err));
        setIsVerificationStep(false);
      });
  };

  return (
    <StyledWrapper>
      {isVerificationStep ? (
        <StyledLoginForm
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onVerificationFinish}
        >
          <StyledPageName>Login</StyledPageName>
          {loginStatus === "failed" && (
            <Alert
              message="An exception has been occured. Please try again later"
              type="error"
              showIcon
              banner
              style={{ marginBottom: "10px" }}
            />
          )}
          <Form.Item
            label="Please enter the verification code sent to your email address"
            name="verificationCode"
            rules={[
              {
                required: true,
                message: "Please input the verification code!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Code"
              style={{ textAlign: "center" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loginStatus === "loading"}
            >
              Submit
            </Button>
          </Form.Item>
        </StyledLoginForm>
      ) : (
        <StyledLoginForm
          form={form}
          onFinish={onLoginFinish}
          autoComplete="off"
          layout="vertical"
        >
          <StyledPageName>Login</StyledPageName>
          {loginStatus === "failed" && (
            <Alert
              message="An exception has been occured. Please try again later"
              type="error"
              showIcon
              banner
              style={{ marginBottom: "10px" }}
            />
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Link to={"/forgot-password"} color="primary">
              Forgot Password
            </Link>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loginStatus === "loading"}
              size="large"
            >
              Submit
            </Button>
          </Form.Item>
        </StyledLoginForm>
      )}
    </StyledWrapper>
  );
};