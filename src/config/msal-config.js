import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MS_TENANT_ID}`,
    redirectUri: "/",
    post_logout_redirect_uri: "/",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
