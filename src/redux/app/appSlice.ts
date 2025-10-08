import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsFromDB } from "../../utils/db";
import { fetchCustomersFromDB } from "../../utils/fetch";

const initialState = {
	products: [] as any,
	customers: [] as any,
	subdealers: [] as any,
};

export const loadProducts = createAsyncThunk("app/products", async (_) => {
	try {
		let res = await fetchProductsFromDB();
		return res;
	} catch (error) {}
});

export const loadCustomers = createAsyncThunk("app/customers", async (_) => {
	try {
		let res = await fetchCustomersFromDB();
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
		builder.addCase(loadCustomers.fulfilled, (state, action) => {
			if (Array.isArray(action.payload)) {
				state.customers = action.payload?.filter(
					(f: any) => f.isSubdealer == "false"
				);
				state.subdealers = action.payload?.filter(
					(f: any) => f.isSubdealer == "true"
				);
			}
		});
	},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
