import {
  USER_AUTHENTICATED,
  USER_CREATED,
  USER_ALREADY_CREATED,
  CLEAN_ALERT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case USER_CREATED:
    case USER_ALREADY_CREATED:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAN_ALERT:
      return {
        ...state,
        message: null,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
