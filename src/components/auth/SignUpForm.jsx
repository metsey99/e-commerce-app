import React from "react";
import { Alert, Button, DatePicker, Form, Input } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { checkEmailAvailability, register } from "../../service/auth";
import dayjs from "dayjs";

const StyledSignUpForm = styled(Form)`
  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 10%;
  }
  width: 60%;
  border: 1px solid black;
  padding: 3%;
  border-radius: 12px;
  background-color: white;
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

export const SignUpForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cnfPassword, setCnfPassword] = React.useState("");
  const [helperMsg, setHelperMsg] = React.useState(["", ""]);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [pageStatus, setPageStatus] = React.useState("idle");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignUp = (values) => {
    if (isEmailValid && helperMsg[0] === "" && helperMsg[1] === "") {
      setPageStatus("loading");
      const user = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        dob: dayjs(values.dob).format().toString(),
        mobile: values.phoneNumber,
      };
      const res = register(user);
      res
        .then((data) => {
          setPageStatus("idle");
          navigate("/signup-status");
        })
        .catch((err) => {
          setPageStatus("failed");
        });
    }
  };

  const checkPassword = (password) => {
    return (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&()*]/.test(password)
    );
  };

  const detectIfIncludes = (password) => {
    const { name, surname, email } = form.getFieldsValue([
      "name",
      "email",
      "surname",
    ]);
    return (
      password.includes(name) ||
      password.includes(surname) ||
      password.includes(email.split("@")[0])
    );
  };

  const validatePassword = () => {
    if (checkPassword(password) && detectIfIncludes(password)) {
      setHelperMsg([
        <span style={{ color: "#ff4d4f" }}>
          Password should contain at least{" "}
          <b>8 characters, 1 capital letter, 1 number</b>, and one special
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

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmail(email);
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email)) {
      let res = checkEmailAvailability(email);
      res
        .then((data) => {
          setIsEmailValid(false);
        })
        .catch((err) => {
          setIsEmailValid(true);
        });
    }
  };

  return (
    <StyledWrapper>
      <StyledSignUpForm layout="vertical" onFinish={handleSignUp} form={form}>
        <StyledPageName>Sign Up</StyledPageName>
        {pageStatus === "failed" && (
          <Alert
            message="An exception has been occured. Please try again later"
            type="error"
            showIcon
            banner
            style={{ marginBottom: "10px" }}
          />
        )}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter your name!", min: 3 },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Surname"
          name="surname"
          rules={[
            {
              required: true,
              message: "Please enter your surname!",
              min: 2,
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter a valid email!",
              pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$",
            },
          ]}
          help={
            !isEmailValid ? (
              <span style={{ color: "#ff4d4f" }}>Email already in use</span>
            ) : (
              ""
            )
          }
        >
          <Input size="large" value={email} onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please enter your phone number!",
            },
          ]}
        >
          <Input
            type="text"
            size="large"
            addonBefore="+90"
            placeholder="(5XX) XXX XXXX"
            maxLength={10}
            pattern="[0-9]*"
          />
        </Form.Item>
        <Form.Item
          label="Date of Birth"
          name="dob"
          rules={[
            {
              required: true,
              message: "Please enter your date of birth!",
            },
          ]}
        >
          <DatePicker
            size="large"
            disabledDate={(current) => {
              return current && current.valueOf() > Date.now();
            }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
          help={helperMsg[0]}
        >
          <Input.Password
            size="large"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="cnfpassword"
          rules={[
            {
              required: true,
              message: "Please re-enter your password!",
            },
          ]}
          help={helperMsg[1]}
        >
          <Input.Password
            size="large"
            onChange={(e) => setCnfPassword(e.target.value)}
            onBlur={validateCnfPassword}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            loading={pageStatus === "loading"}
          >
            Sign Up
          </Button>
        </Form.Item>
      </StyledSignUpForm>
    </StyledWrapper>
  );
};
