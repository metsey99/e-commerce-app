import { Button, Popover } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ProfileElement = styled(Link)`
  cursor: pointer;
  display: inline-block;
  width: 100%;
`;

const ProfileContent = (
  <div>
    <ProfileElement to="/change-password">Change Password</ProfileElement>
  </div>
);

export const Profile = () => {
  return (
    <Popover content={ProfileContent} trigger="hover" placement="bottomRight">
      <Button>Profile</Button>
    </Popover>
  );
};
