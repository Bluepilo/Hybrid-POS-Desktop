export interface Product {
	id: number;
	name: string;
	quantity: number;
	price: number;
	discount?: number;
	discountType?: string;
	vat?: string;
}

export interface CartItemType {
	cartId: string;
	cartName: string;
	status: string;
	discount: number;
	products: Product[];
	proceed?: boolean;
	customerTypeId?: string;
	isAdvanced?: boolean;
	isBiz?: boolean;
}

const cartItemType: CartItemType[] = [];

export { cartItemType };
