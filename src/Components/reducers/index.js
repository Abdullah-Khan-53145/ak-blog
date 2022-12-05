import { combineReducers } from "redux";

import setUser from "./setUserReducer";
const reducer = combineReducers({
  userState: setUser,
});

export default reducer;
