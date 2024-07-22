import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Login } from "./pages/login";
import { InfoPage } from "./pages/info-page";
import { LoggedOutRoute } from "./HOC/logged-out-route";
import { LoggedInRoute } from "./HOC/logged-in-route";
import { RefreshHandler } from "./refresh-handler";

export const AppRoutes = () => {
  const [account, setAccount] = useState(null);

  return (
    <Router>
      <RefreshHandler setAccount={setAccount} />
      <Routes>
        <Route
          path="/"
          element={<LoggedOutRoute Component={Login} account={account} />}
        />
        <Route
          path="/info-page"
          element={<LoggedInRoute Component={InfoPage} account={account} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
