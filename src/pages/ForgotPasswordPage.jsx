import React from "react";
import { PageWrapper } from "./PageWrapper";
import { Button, Form, Input, Typography } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledForm = styled(Form)`
  width: 30%;
  border: 1px solid black;
  padding: 3%;
  border-radius: 12px;
  background-color: #fff;
`;

const StyledInfoMessage = styled(Typography)`
  font-size: 14px;
  color: #808080;
  margin-bottom: 50px;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPageName = styled.p`
  font-size: 28px;
  font-weight: 600;
`;

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handleResetPassword = (values) => {
    console.log(values);
    navigate("/");
  };

  return (
    <PageWrapper>
      <StyledWrapper>
        <StyledForm layout="vertical" onFinish={handleResetPassword}>
          <StyledPageName>Forgot Password</StyledPageName>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter a valid email address!",
                pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <StyledInfoMessage>
            Please enter your registered email. We will send you an email for
            further instructions to reset password.
          </StyledInfoMessage>
          <Form.Item>
            <Button block type="primary" size="large" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </StyledForm>
      </StyledWrapper>
    </PageWrapper>
  );
};
