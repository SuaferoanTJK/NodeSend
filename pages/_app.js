import React from "react";
import AuthState from "../context/auth/authState";
import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <Component {...pageProps} />
    </AuthState>
  );
};

export default MyApp;
