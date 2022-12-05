import { LOG_IN, LOG_OUT } from "../actions/actions";

const initialState =
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

const setUser = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
        return action.payload;
      }
    case LOG_OUT:
      if (typeof window !== "undefined") {
        localStorage.setItem("user", null);
        return null;
      }

    default:
      return state;
  }
};

export default setUser;
