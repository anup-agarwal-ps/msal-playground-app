import React, { useEffect, useState } from "react";

import { PublicClientApplication, EventType } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MS_TENANT_ID}`,
    redirectUri: "/",
    post_logout_redirect_uri: "/",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.initialize();
      const result = await msalInstance.handleRedirectPromise();

      if (result && result.account) {
        console.log(result);
        setAccount(result.account);
      } else {
        const currentAccounts = msalInstance.getAllAccounts();
        if (currentAccounts.length === 1) {
          setAccount(currentAccounts[0]);
        }
      }
    };

    msalInstance.addEventCallback((event) => {
      if (
        event.eventType === EventType.LOGIN_SUCCESS &&
        event.payload.account
      ) {
        setAccount(event.payload.account);
      }
    });
    initializeMsal();
  }, []);

  const handleLogin = async () => {
    await msalInstance.initialize();
    msalInstance.loginRedirect({
      scopes: ["user.read", "Offline_access"],
      response_type: "code",
    });
  };

  const handleLogout = async () => {
    await msalInstance.initialize();
    msalInstance.logoutRedirect();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to MSAL React App</h1>

        {account ? (
          <div>
            <h1>Your info:</h1>
            <p>{JSON.stringify(account)}</p>
            <p>Welcome, {account.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </header>
    </div>
  );
};

export default App;
