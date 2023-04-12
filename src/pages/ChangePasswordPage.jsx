import React from "react";
import { PageWrapper } from "./PageWrapper";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Alert, Button, Form, Input } from "antd";
import { useSelector } from "react-redux";

const StyledForm = styled(Form)`
  width: 30%;
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

export const ChangePasswordPage = () => {
  const [password, setPassword] = React.useState("");
  const [helperMsg, setHelperMsg] = React.useState(["", ""]);
  const [cnfPassword, setCnfPassword] = React.useState("");
  const [pageStatus, setPageStatus] = React.useState("idle");
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, []);

  //TODO: Delete Later
  function delay(time) {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
  }

  //TODO: Replace with API Call
  async function test() {
    await delay(1000);
    return true;
  }

  const handleResetPassword = (values) => {
    setPageStatus("loading");
    const res = test();
    res
      .then((data) => {
        setPageStatus("idle");
        navigate("/password-success");
      })
      .catch((err) => {
        setPageStatus("rejected");
      });
  };
  const validatePassword = () => {
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$()%^&*]/.test(password)
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
          <StyledPageName>Change Password</StyledPageName>
          {pageStatus === "rejected" && (
            <Alert
              message="An exception has been occured. Please try again later"
              type="error"
              showIcon
              banner
              style={{ marginBottom: "10px" }}
            />
          )}
          <Form.Item name="oldPassword" label="Old Password">
            <Input.Password size="large" />
          </Form.Item>
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
            <Button
              block
              type="primary"
              size="large"
              htmlType="submit"
              loading={pageStatus === "loading"}
            >
              Reset Password
            </Button>
          </Form.Item>
        </StyledForm>
      </StyledWrapper>
    </PageWrapper>
  );
};
