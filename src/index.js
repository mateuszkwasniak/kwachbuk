import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.scss";

import { AppContextProvider } from "./context/appctx";
import { AuthContextProvider } from "./context/authctx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
