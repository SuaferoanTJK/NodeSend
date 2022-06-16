import React, { useState, useContext } from "react";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

const Alert = () => {
  const AuthContext = useContext(authContext);
  const { message } = AuthContext;

  const AppContext = useContext(appContext);
  const { msg } = AppContext;

  let bg;
  if (message) {
    if (message.includes("creado")) bg = "bg-blue-400";
    else bg = "bg-red-800";
  } else {
    bg = "bg-red-800";
  }

  return (
    <div
      className={`${bg} py-2 px-3 w-full my-3 max-w-lg text-center text-white font-bold mx-auto rounded-lg`}
    >
      {message || msg}
    </div>
  );
};

export default Alert;
