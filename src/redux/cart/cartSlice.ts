import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, cartItemType, Product } from "../../utils/types";
import { generateId } from "../../utils/data";

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
			console.log(payload, "Payload");
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
			const { cartId, product } = action.payload;
			const cart = state.cartItems.find((c) => c.cartId === cartId);
			if (cart) {
				if (cart) {
					const existingProduct = cart.products.find(
						(p) => p.id === product.id
					);
					if (existingProduct) {
						existingProduct.quantity += 1;
					} else {
						cart.products.push(product);
					}
				}
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
		updateProductDiscount: (
			state,
			action: PayloadAction<{
				cartId: string;
				productId: number;
				discount: number;
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
					product.discount = action.payload.discount;
				}
			}
		},
		updateProductDiscountType: (
			state,
			action: PayloadAction<{
				cartId: string;
				productId: number;
				isPercent: boolean;
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
					product.discountType = action.payload.isPercent
						? "percent"
						: "currency";
				}
			}
		},
		removeProductCart: (
			state,
			action: PayloadAction<{
				cartId: string;
				productId: number;
			}>
		) => {
			const cart = state.cartItems.find(
				(c) => c.cartId === action.payload.cartId
			);
			if (cart) {
				cart.products = cart.products.filter(
					(p) => p.id != action.payload.productId
				);
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
	updateProductDiscount,
	updateProductDiscountType,
	removeProductCart,
	removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
