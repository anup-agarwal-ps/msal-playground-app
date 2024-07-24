import { useEffect } from "react";
import { msalInstance } from "./config/msal-config";
import { EventType } from "@azure/msal-browser";

export const RefreshHandler = ({ setAccount }) => {
  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        const result = await msalInstance.handleRedirectPromise();
        if (result && result.account) {
          setAccount(result.account);
        } else {
          const currentAccounts = msalInstance.getAllAccounts();
          if (currentAccounts.length === 1) {
            setAccount(currentAccounts[0]);
          }
        }
      } catch (error) {
        setAccount(null);
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
  return null;
};
