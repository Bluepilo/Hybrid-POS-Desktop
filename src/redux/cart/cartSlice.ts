import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, cartItemType, Product } from "../../utils/types";

const initialState = {
	cartItems: cartItemType,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		createCart: (state, action: PayloadAction<string>) => {
			let payload = {
				cartId: action.payload,
				cartName: "",
				status: "",
				discount: 0,
				products: [],
			};
			state.cartItems
				? state.cartItems.push(payload)
				: (state.cartItems = [payload]);
		},
		updateCartField: (
			state,
			action: PayloadAction<{
				cartId: string;
				field: keyof CartItemType;
				value: any;
			}>
		) => {
			const cart = state.cartItems.find(
				(c) => c.cartId === action.payload.cartId
			);
			if (cart) {
				(cart[action.payload.field] as any) = action.payload.value;
			}
		},
		addProductToCart: (
			state,
			action: PayloadAction<{ cartId: string; product: Product }>
		) => {
			const cart = state.cartItems.find(
				(c) => c.cartId === action.payload.cartId
			);
			if (cart) {
				cart.products.push(action.payload.product);
			}
		},
		updateProductQuantity: (
			state,
			action: PayloadAction<{
				cartId: string;
				productId: number;
				quantity: number;
			}>
		) => {
			const cart = state.cartItems.find(
				(c) => c.cartId === action.payload.cartId
			);
			if (cart) {
				const product = cart.products.find(
					(p) => p.id === action.payload.productId
				);
				if (product) {
					product.quantity = action.payload.quantity;
				}
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.cartItems = state.cartItems.filter(
				(cart) => cart.cartId !== action.payload
			);
		},
	},

	extraReducers: () => {},
});

export const {
	createCart,
	addProductToCart,
	updateCartField,
	updateProductQuantity,
	removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
