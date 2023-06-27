import { combineReducers } from "redux";
import mainListReducer from "./mainList/mainListReducer";
const rootReducer = combineReducers({
  mainList: mainListReducer,
});

export default rootReducer;
