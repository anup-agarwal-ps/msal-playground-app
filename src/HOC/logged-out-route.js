import React from "react";
import { Navigate } from "react-router-dom";

export const LoggedOutRoute = ({ Component, account }) => {
  return account ? <Navigate to="/info-page" /> : <Component />;
};
