import { useEffect } from "react";
import { msalInstance } from "./config/msal-config";
import { EventType } from "@azure/msal-browser";

export const RefreshHandler = ({ setAccount }) => {
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
  return null;
};
