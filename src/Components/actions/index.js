import { LOG_IN, LOG_OUT } from "./actions";

// Action to set User modal
export const logIn = (payload) => {
  return {
    type: LOG_IN,
    payload: payload,
  };
};
// Action to remove User modal
export const logOut = (payload) => {
  return {
    type: LOG_OUT,
    payload: payload,
  };
};

export function logInAPI(payload) {
  return (dispatch) => {
    dispatch(logIn(payload));
  };
}
export function logOutAPI() {
  return (dispatch) => {
    dispatch(logOut());
  };
}
