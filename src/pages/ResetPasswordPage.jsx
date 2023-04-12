import React from "react";
import { PageWrapper } from "./PageWrapper";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, Form, Input } from "antd";

const StyledForm = styled(Form)`
  width: 30%;
  border: 1px solid black;
  padding: 3%;
  border-radius: 12px;
  background-color: #fff;
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

export const ResetPasswordPage = () => {
  const [password, setPassword] = React.useState("");
  const [helperMsg, setHelperMsg] = React.useState(["", ""]);
  const [cnfPassword, setCnfPassword] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = (values) => {
    navigate("/password-success");
  };

  const validatePassword = () => {
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%()^&*]/.test(password)
    ) {
      setHelperMsg([
        <span style={{ color: "#ff4d4f" }}>
          Password should contain at least{" "}
          <b>8 characters, 1 capital letter, 1 number</b> and one special
          character <b>(!@#$%^&*)</b>
        </span>,
        helperMsg[1],
      ]);
    } else {
      setHelperMsg(["", helperMsg[1]]);
    }
  };

  const validateCnfPassword = () => {
    if (password !== cnfPassword) {
      setHelperMsg([
        helperMsg[0],
        <span style={{ color: "#ff4d4f" }}>Passwords must match!</span>,
      ]);
    } else {
      setHelperMsg([helperMsg[0], ""]);
    }
  };

  return (
    <PageWrapper>
      <StyledWrapper>
        <StyledForm layout="vertical" onFinish={handleResetPassword}>
          <StyledPageName>Reset Password</StyledPageName>
          <Form.Item name="password" label="New Password" help={helperMsg[0]}>
            <Input.Password
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
          </Form.Item>
          <Form.Item
            name="cnfPassword"
            label="Confirm Password"
            help={helperMsg[1]}
          >
            <Input.Password
              size="large"
              value={cnfPassword}
              onChange={(e) => setCnfPassword(e.target.value)}
              onBlur={validateCnfPassword}
            />
          </Form.Item>
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
