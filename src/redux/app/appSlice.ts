import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsFromDB } from "../../utils/db";

const initialState = {
	products: [] as any,
};

export const loadProducts = createAsyncThunk("app/products", async (_) => {
	try {
		let res = await fetchProductsFromDB();
		return res;
	} catch (error) {}
});

export const appSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadProducts.fulfilled, (state, action) => {
			state.products = action.payload;
		});
	},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
