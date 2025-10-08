export interface Product {
	id: number;
	name: string;
	quantity: number;
	price: number;
}

export interface CartItemType {
	cartId: string;
	cartName: string;
	status: string;
	discount: number;
	products: Product[];
	proceed?: boolean;
	isSubdealer?: boolean;
}

const cartItemType: CartItemType[] = [];

export { cartItemType };
