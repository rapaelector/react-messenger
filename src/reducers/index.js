import { combineReducers } from "redux";
import counterReducer from './counterReducer'
import authReducer from './authReducer'
import themeReducer from './themeReducer'
import userReducer from './userReducer'
import groupReducer from "./groupReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
    counter: counterReducer,
    auth: authReducer,
    theme: themeReducer,
    user: userReducer,
    group: groupReducer,
    message: messageReducer
})