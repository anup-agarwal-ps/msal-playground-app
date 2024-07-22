import React from "react";
import { AppRoutes } from "./routes";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to MSAL React App</h1>
        <AppRoutes />
      </header>
    </div>
  );
};

export default App;
