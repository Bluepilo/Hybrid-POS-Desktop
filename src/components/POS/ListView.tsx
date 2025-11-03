import { CartTotal, ScanBtn } from "../../styles/pos.styles";
import { TbTextScan2 } from "react-icons/tb";
import { TableDiv } from "../../styles/table.styles";
import EachCartList from "../List/EachCartList";
import { TableArea, ZIndex } from "../../styles/basic.styles";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { numberWithCommas } from "../../utils/currency";
import SelectField from "../SelectField";
import { useState } from "react";
import { addProductToCart, updateCartField } from "../../redux/cart/cartSlice";

const ListView = () => {
	const dispatch = useAppDispatch();

	const params = useParams();

	const { products } = useAppSelector((state) => state.app);
	const { cartItems } = useAppSelector((state) => state.cart);

	const productsInCart =
		cartItems.find((cart) => cart.cartId === params?.tabId)?.products || [];

	const [prod, setProd] = useState("");

	const cartHandler = (val: any) => {
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
						price: product.price,
					},
				})
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
			})
		);
	};

	let totalAmount = productsInCart.reduce(
		(a: any, b: any) => a + b.price * b.quantity,
		0
	);

	let totalDiscount = productsInCart.reduce(
		(a: any, b: any) =>
			a +
			(b.discountType === "currency"
				? b.discount || 0
				: ((b.discount || 0) / 100) * (b.price * b.quantity)),
		0
	);

	return (
		<div className="d-flex flex-column h-100">
			<div className="row">
				<div className="col-8">
					<div className="row align-items-center">
						<div className="col-9">
							<ZIndex>
								<SelectField
									value={prod}
									setValue={cartHandler}
									options={products?.map((p: any) => {
										return {
											...p,
											value: p.productId,
											label: p.name,
										};
									})}
									noMargin={true}
									placeholder="Search Name"
								/>
							</ZIndex>
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
							₦{numberWithCommas(totalAmount - totalDiscount)}
						</strong>
					</div>
					<div>
						<span>Total Discount</span>
						<strong>₦{numberWithCommas(totalDiscount)}</strong>
					</div>
					<div>
						<span>Add VAT</span>
						<select>
							<option value={""}>0%</option>
						</select>
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
