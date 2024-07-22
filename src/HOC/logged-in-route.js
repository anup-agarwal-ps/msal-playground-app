import React from "react";
import { Navigate } from "react-router-dom";

export const LoggedInRoute = ({ Component, account }) => {
  return account ? <Component account={account} /> : <Navigate to="/" />;
};
