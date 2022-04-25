import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ThemeProvider from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";
import ToastProvider from "./context/ToastContext";

//removing the loading class from html which prevents the weird transistion at render
setTimeout(function () {
  document.body.className = "";
}, 500);

ReactDOM.render(
  <AuthProvider>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </AuthProvider>,
  document.getElementById("root")
);
