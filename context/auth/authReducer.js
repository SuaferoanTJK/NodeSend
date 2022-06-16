import {
  USER_AUTHENTICATED,
  USER_CREATED,
  USER_ALREADY_CREATED,
  HIDE_ALERT,
  USER_FAILED_LOGIN,
  USER_SUCESS_LOGIN,
  LOGOUT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case USER_CREATED:
    case USER_ALREADY_CREATED:
    case USER_FAILED_LOGIN:
      return {
        ...state,
        message: action.payload,
      };
    case HIDE_ALERT:
      return {
        ...state,
        message: null,
      };
    case USER_SUCESS_LOGIN:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        authenticated: true,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        authenticated: null,
        user: null,
      };
    default:
      return state;
  }
};
