import {
  SHOW_ALERT,
  HIDE_ALERT,
  UPLOADING_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_DENIED,
  CREATE_LINK_SUCCESS,
  CREATE_LINK_DENIED,
  CLEAN_STATE,
  ADD_PASSWORD,
  ADD_DOWNLOADS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        msg: action.payload,
      };
    case HIDE_ALERT:
      return {
        ...state,
        msg: null,
      };
    case UPLOADING_FILE:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        nameOriginal: action.payload.nameFile,
        loading: false,
      };
    case UPLOAD_FILE_DENIED:
      return {
        ...state,
        msg: action.payload,
        loading: false,
      };
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        url: action.payload,
      };
    case CREATE_LINK_DENIED:
      return {
        ...state,
        url: null,
      };
    case CLEAN_STATE:
      return {
        ...state,
        msg: null,
        name: null,
        nameOriginal: null,
        loading: false,
        downloads: 1,
        password: null,
        author: null,
        url: null,
      };
    case ADD_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case ADD_DOWNLOADS:
      return {
        ...state,
        downloads: action.payload,
      };
    default:
      return state;
  }
};
