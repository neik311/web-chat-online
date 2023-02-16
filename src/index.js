import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { AuthContextProvider } from "./context/AuthContext";
import { NotifiProvider } from "./context/notifiContext";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <NotifiProvider>
        <App />
      </NotifiProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
