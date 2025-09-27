import { combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import authSlice from "./auth/authSlice";

const rootReducer = combineReducers({
	cart: cartSlice,
	auth: authSlice,
});

export default rootReducer;
