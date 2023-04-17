import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { SignUpPage } from "./SignUpPage";
import { CheckoutPage } from "./CheckoutPage";
import { NotFoundPage } from "./NotFoundPage";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { ChangePasswordPage } from "./ChangePasswordPage";
import { LoginPage } from "./LoginPage";
import { PassChangeStatus } from "./status/PassChangeStatus";
import { SignUpStatus } from "./status/SignUpStatus";
import { CheckoutStatus } from "./status/CheckoutStatus";
import { CheckMailPage } from "./status/CheckMailPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/password-status" element={<PassChangeStatus />} />
      <Route path="/check-mail" element={<CheckMailPage />} />
      <Route path="/signup-status/:token" element={<SignUpStatus />} />
      <Route path="/order-status/:status" element={<CheckoutStatus />} />
      <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
