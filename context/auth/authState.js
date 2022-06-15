import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  USER_AUTHENTICATED,
  USER_CREATED,
  USER_ALREADY_CREATED,
  CLEAN_ALERT,
  USER_FAILED_LOGIN,
  USER_SUCESS_LOGIN,
  LOGOUT,
} from "../../types";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
  const initialState = {
    token: typeof window !== "undefined" && localStorage.getItem("token"),
    authenticated: null,
    user: null,
    message: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Functions
  const registerUser = async (data) => {
    try {
      const answer = await axiosClient.post("/api/usuarios", data);
      dispatch({ type: USER_CREATED, payload: answer.data.msg });
    } catch (error) {
      dispatch({
        type: USER_ALREADY_CREATED,
        payload: error.response.data.msg,
      });
    }
    setTimeout(() => {
      dispatch({ type: CLEAN_ALERT });
    }, 3000);
  };
  const login = async (data) => {
    try {
      const answer = await axiosClient.post("/api/auth", data);
      dispatch({
        type: USER_SUCESS_LOGIN,
        payload: answer.data.token,
      });
    } catch (error) {
      dispatch({
        type: USER_FAILED_LOGIN,
        payload: error.response.data.msg,
      });
    }
    setTimeout(() => {
      dispatch({ type: CLEAN_ALERT });
    }, 3000);
  };
  const userAuthenticated = async () => {
    const token = localStorage.getItem("token");
    if (token) tokenAuth(token);
    try {
      const answer = await axiosClient.get("/api/auth");
      dispatch({ type: USER_AUTHENTICATED, payload: answer.data });
    } catch (error) {
      dispatch({
        type: USER_FAILED_LOGIN,
        payload: error.response.data.msg,
      });
    }
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
        login,
        userAuthenticated,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
