import React, { useContext, useState } from "react";
import authContext from "../context/auth/authContext";

const Alert = () => {
  const AuthContext = useContext(authContext);
  const { message } = AuthContext;

  let bg;
  if (message.includes("creado")) bg = "bg-blue-400";
  else if (message.includes("registrado")) bg = "bg-red-800";

  return (
    <div
      className={`${bg} py-2 px-3 w-full my-3 max-w-lg text-center text-white font-bold mx-auto rounded-lg`}
    >
      {message}
    </div>
  );
};

export default Alert;
