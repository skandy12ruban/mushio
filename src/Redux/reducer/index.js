import { combineReducers } from "redux";
import User from './User';
import Location from './Location';
import userType from "./userType";

export default combineReducers({
   User,
   Location,
   userType
})