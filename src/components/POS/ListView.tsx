import { CartTotal, ScanBtn } from "../../styles/pos.styles";
import { TbTextScan2 } from "react-icons/tb";
import { TableDiv } from "../../styles/table.styles";
import EachCartList from "../List/EachCartList";
import { TableArea } from "../../styles/basic.styles";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { formatCurrency } from "../../utils/currency";
import SelectField from "../SelectField";
import { useState } from "react";
import { addProductToCart, updateCartField } from "../../redux/cart/cartSlice";
import { displayError } from "../../utils/display";

const ListView = () => {
	const dispatch = useAppDispatch();

	const params = useParams();

	const { products, customerTypes } = useAppSelector((state) => state.app);
	const { cartItems } = useAppSelector((state) => state.cart);
	const { shopInfo, user } = useAppSelector((state) => state.auth);

	const productsInCart =
		cartItems.find((cart) => cart.cartId === params?.tabId)?.products || [];

	const customerType = cartItems.find(
		(cart) => cart.cartId === params?.tabId,
	)?.customerTypeId;

	const [prod, setProd] = useState("");

	const getPriceType = (costPrice: number) => {
		let priceInfo = customerTypes?.find(
			(c: any) => c.typeId == customerType,
		);
		if (priceInfo?.percentage) {
			let finalAmount;

			let val = Number(costPrice) * (Number(priceInfo.percentage) / 100);

			if (priceInfo.markType === "markdown") {
				finalAmount = Number(costPrice) - val;
			} else {
				finalAmount = Number(costPrice) + val;
			}

			return finalAmount;
		} else {
			displayError("No Price Found. Select Customer Type", true);
			return 0;
		}
	};

	const cartHandler = (val: any) => {
		if (!customerType) {
			displayError(
				"Please Select who you are selling to before picking a product",
				true,
			);
			return;
		}
		setProd(val);
		let product = products.find((p: any) => p.productId == val);
		if (product) {
			dispatch(
				addProductToCart({
					cartId: params?.tabId || "",
					product: {
						id: product.productId,
						name: product.name,
						quantity: 1,
						price: product.price || getPriceType(product.costPrice),
						vat: product.vatType,
					},
				}),
			);
			setProd("");
		}
	};

	const proceedHandler = () => {
		dispatch(
			updateCartField({
				cartId: params?.tabId || "",
				value: true,
				field: "proceed",
			}),
		);
	};

	const totalAmount = productsInCart.reduce((sum, item) => {
		const subtotal = Number(item.price) * Number(item.quantity);

		const discountAmount =
			item.discountType === "currency"
				? Number(item.discount || 0)
				: subtotal * (Number(item.discount || 0) / 100);

		const afterDiscount = subtotal - discountAmount;

		const finalItemTotal =
			item.vat === "exclusive"
				? afterDiscount *
					(1 + Number(user.business?.vatRate || 0) / 100)
				: afterDiscount;

		return sum + finalItemTotal;
	}, 0);

	return (
		<div className="d-flex flex-column h-100">
			<div className="row mt-2">
				<div className="col-8">
					<div className="row align-items-center">
						<div className="col-9">
							<SelectField
								value={prod}
								setValue={cartHandler}
								options={products?.map((p: any) => {
									return {
										...p,
										value: p.productId,
										label: `${p.name} (${p.totalStock})`,
									};
								})}
								noMargin={true}
								placeholder="Search Name"
							/>
						</div>
						<div className="col-3">
							<ScanBtn>
								<TbTextScan2 size={20} />
								<span>Scan Barcode</span>
							</ScanBtn>
						</div>
					</div>
				</div>
			</div>
			<TableArea>
				<div className="table-responsive h-100">
					<TableDiv className="table mb-0">
						<thead>
							<tr>
								<th>Products</th>
								<th>Quantity</th>
								<th>Unit Price</th>
								<th>Discount</th>
								<th>VAT</th>
								<th>Total</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{productsInCart.map((product) => (
								<EachCartList
									key={product.id}
									item={product}
									cartId={params?.tabId}
								/>
							))}
						</tbody>
					</TableDiv>
				</div>
			</TableArea>
			<CartTotal>
				<div className="total">
					<div>
						<span>Total Amount</span>
						<strong style={{ color: "#FFB500", fontSize: "2rem" }}>
							{shopInfo?.currency}
							{formatCurrency(totalAmount)}
						</strong>
					</div>
				</div>
				<div className="button">
					<button
						disabled={productsInCart.length > 0 ? false : true}
						onClick={proceedHandler}
					>
						Proceed to Payment
					</button>
				</div>
			</CartTotal>
		</div>
	);
};

export default ListView;
