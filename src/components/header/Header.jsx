import React from "react";
import { Row, Col, Button, Spin } from "antd";
import styled from "styled-components";
import { Cart } from "./Cart";
import { Profile } from "./Profile";
import { LoginModal } from "../auth/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducer/authSlice";

const HeaderStyle = styled(Row)`
  padding: 10px 0;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const StyledLogo = styled(Link)`
  margin-bottom: 0;
  font-size: 32px;
  color: #6485c1;

  & > img {
    width: 67.5%;
    height: 10%;
  }
`;

const RightContainer = styled.div`
  & > button {
    margin: auto 5px;
  }
`;

export const Header = () => {
  const { auth, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <HeaderStyle align="middle">
      <Col sm={{ span: 8 }} xs={{ span: 12 }}>
        <StyledLogo to="/">
          <img src={Logo} alt="Logo" />
        </StyledLogo>
      </Col>
      <Col sm={{ span: 8, offset: 8 }} xs={{ span: 12 }}>
        {!!auth ? (
          <RightContainer>
            <Profile />
            <Cart />
            <Button onClick={handleLogout}>Logout</Button>
          </RightContainer>
        ) : status === "loading" ? (
          <Spin size="large" />
        ) : (
          <RightContainer>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </RightContainer>
        )}
      </Col>
    </HeaderStyle>
  );
};
