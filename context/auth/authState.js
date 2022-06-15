import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  USER_AUTHENTICATED,
  USER_CREATED,
  USER_ALREADY_CREATED,
  CLEAN_ALERT,
} from "../../types";
import axiosClient from "../../config/axios";

const AuthState = ({ children }) => {
  const initialState = {
    token: "",
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
  const userAuthenticated = (name) => {
    dispatch({ type: USER_AUTHENTICATED, payload: name });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
        userAuthenticated,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
