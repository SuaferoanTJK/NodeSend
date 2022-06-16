import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import {
  SHOW_ALERT,
  HIDE_ALERT,
  UPLOADING_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_DENIED,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_DENIED,
} from "../../types";
import axiosClient from "../../config/axios";

const AppState = ({ children }) => {
  const initialState = {
    msg: null,
    name: null,
    nameOriginal: null,
    loading: false,
    downloads: 1,
    password: null,
    author: null,
    url: null,
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Functions
  const showAlert = (msg) => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg,
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 3000);
  };
  const uploadFile = async (formData, nameFile) => {
    dispatch({ type: UPLOADING_FILE });
    try {
      const answer = await axiosClient.post("/api/files", formData);
      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: { name: answer.data.file, nameFile },
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_FILE_DENIED,
        payload: error.response.data.msg,
      });
    }
  };
  const createLink = async () => {
    const data = {
      name: state.name,
      nameBase: state.nameOriginal,
      downloads: state.downloads,
      password: state.password,
      author: state.author,
    };
    try {
      const answer = await axiosClient.post("/api/links", data);
      dispatch({ type: CREATE_LINK_SUCCESS, payload: answer.data.msg });
    } catch (error) {
      dispatch({ type: CREATE_LINK_DENIED });
      // console.log(error);
    }
  };

  return (
    <appContext.Provider
      value={{
        msg: state.msg,
        name: state.name,
        nameOriginal: state.nameOriginal,
        loading: state.loading,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        showAlert,
        uploadFile,
        createLink,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
