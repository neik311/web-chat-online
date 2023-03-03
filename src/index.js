import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { AuthContextProvider } from "./context/AuthContext";
import { NotifiProvider } from "./context/notifiContext";
import { UserProvider } from "./context/userContext";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <UserProvider>
        <NotifiProvider>
          <App />
        </NotifiProvider>
      </UserProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
