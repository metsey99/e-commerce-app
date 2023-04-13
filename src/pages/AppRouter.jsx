import React from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { SignUpPage } from "./SignUpPage";
import { CheckoutPage } from "./CheckoutPage";
import { NotFoundPage } from "./NotFoundPage";
import { SuccessPage } from "./SuccessPage";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { ChangePasswordPage } from "./ChangePasswordPage";
import { LoginPage } from "./LoginPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route
        path="/password-success"
        element={<SuccessPage type="passUpdate" />}
      />
      <Route
        path="/signup-success"
        element={<SuccessPage type="signupSuccess" />}
      />
      <Route
        path="/order-success"
        element={<SuccessPage type="orderSuccess" />}
      />
      <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
