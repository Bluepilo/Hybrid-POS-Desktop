import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import authSlice from "./auth/authSlice";
import appSlice from "./app/appSlice";

const rootReducer = combineReducers({
	cart: cartSlice,
	auth: authSlice,
	app: appSlice,
});

export default rootReducer;
