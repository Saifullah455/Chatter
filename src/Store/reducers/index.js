import { combineReducers } from "redux";
import auth_reducer from "./auth_reducer";

export default combineReducers({
    auth_reducer : auth_reducer
})