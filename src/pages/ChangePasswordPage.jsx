import React from "react";
import { PageWrapper } from "./PageWrapper";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Alert, Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginSucceeded } from "../redux/reducer/authSlice";
import { changePassword, retrieveUserInfo } from "../service/auth";

const StyledForm = styled(Form)`
  width: 50%;
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
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [helperMsg, setHelperMsg] = React.useState(["", ""]);
  const [cnfPassword, setCnfPassword] = React.useState("");
  const [pageStatus, setPageStatus] = React.useState("idle");
  const [errorMsg, setErrorMsg] = React.useState("");
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
      const token = JSON.parse(auth).token;
      const res = retrieveUserInfo(token);
      res
        .then((data) => {
          setEmail(data.data.email);
        })
        .catch((err) => {
          console.log(err);
          pageStatus("failed");
        });
    }
  }, []);

  const handleResetPassword = (values) => {
    setPageStatus("loading");
    const token = JSON.parse(auth).token;
    const res = changePassword({
      email: email,
      password: password,
      token: token,
    });
    res
      .then((data) => {
        dispatch(loginSucceeded({ token: data.data.token }));
        navigate("/password-status");
      })
      .catch((err) => {
        console.log(err);
        pageStatus("failed");
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
          {pageStatus === "failed" && (
            <Alert
              message={
                errorMsg
                  ? errorMsg
                  : "An exception has been occured. Please try again later"
              }
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
