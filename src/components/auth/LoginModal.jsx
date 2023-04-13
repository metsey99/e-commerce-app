import { Button, Modal, Form, Input, Alert } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginRequested } from "../../redux/reducer/authSlice";

export const LoginModal = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const credentials = { email: values.email, password: values.password };
    dispatch(loginRequested(credentials));
    navigate("/");
  };

  return (
    <>
      <Button onClick={handleModalOpen}>Login</Button>
      <Modal
        title="Login"
        open={isModalOpen}
        footer={null}
        onCancel={handleModalClose}
      >
        {status === "failed" && (
          <Alert
            message="An exception has been occured. Please try again later"
            type="error"
            showIcon
            banner
            style={{ marginBottom: "10px" }}
          />
        )}
        <Form onFinish={onFinish} autoComplete="off" layout="vertical">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Link to={"/forgot-password"} onClick={handleModalClose}>
              Forgot Password
            </Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
