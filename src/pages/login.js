import React from "react";
import { msalInstance } from "../config/msal-config";

export const Login = () => {
  const handleLogin = async () => {
    await msalInstance.initialize();
    msalInstance.loginRedirect({
      scopes: ["user.read", "Offline_access"],
      response_type: "code",
    });
  };
  return <button onClick={handleLogin}>Login</button>;
};
