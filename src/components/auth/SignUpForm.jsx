import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const StyledSignUpForm = styled(Form)`
  width: 40%;
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
  const navigate = useNavigate();

  const handleSignUp = (values) => {
    if (isEmailValid && helperMsg[0] === "" && helperMsg[1] === "") {
      values.dob = dayjs(values.dob).format().toString();
      console.log(values);
      navigate("/signup-success");
    }
  };

  const validatePassword = () => {
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&()*]/.test(password)
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

  //TODO: Delete Later
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  //TODO: Replace with API Call
  async function test() {
    await delay(1000);
    return true;
  }

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmail(email);
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(email)) {
      let res = test();
      res.then((data) => {
        console.log(data);
        setIsEmailValid(data);
      });
    }
  };

  return (
    <StyledWrapper>
      <StyledSignUpForm layout="vertical" onFinish={handleSignUp}>
        <StyledPageName>Sign Up</StyledPageName>
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
          name="phone-number"
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
          <Button type="primary" size="large" block htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </StyledSignUpForm>
    </StyledWrapper>
  );
};
