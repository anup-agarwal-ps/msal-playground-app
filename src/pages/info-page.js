import React from "react";
import { msalInstance } from "../config/msal-config";

export const InfoPage = ({ account }) => {
  const handleLogout = async () => {
    await msalInstance.initialize();
    msalInstance.logoutRedirect();
  };

  return (
    <div>
      <h1>Your info:</h1>
      <p>{JSON.stringify(account)}</p>
      <p>Welcome, {account.username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
