import { useParams } from "react-router-dom";
import { updateCartField } from "../../redux/cart/cartSlice";
import { CartDisplay, VatBtn } from "../../styles/pos.styles";
import { numberWithCommas } from "../../utils/currency";
import { useAppDispatch } from "../../utils/hooks";
import EachCart from "../List/EachCart";

const Cart = ({ products }: { products: any }) => {
	const params = useParams();

	const dispatch = useAppDispatch();

	const proceedHandler = () => {
		dispatch(
			updateCartField({
				cartId: params?.tabId || "",
				value: true,
				field: "proceed",
			})
		);
	};

	let totalAmount = products.reduce(
		(a: any, b: any) => a + b.price * b.quantity,
		0
	);

	return (
		<CartDisplay>
			<div className="cart">
				<div className="items">
					{products?.map((product: any) => (
						<EachCart item={product} key={product.id} />
					))}
				</div>
				<div className="bttm-pos">
					<div className="yellow">
						<div>
							<span>Total Discount</span>
							<strong>₦0</strong>
						</div>
						<div>
							<span>Total Amount Before Discount</span>
							<strong>₦{numberWithCommas(totalAmount)}</strong>
						</div>
					</div>
					<div className="dark">
						<span>Total Amount</span>
						<strong>₦{numberWithCommas(totalAmount)}</strong>
					</div>
				</div>
			</div>
			<VatBtn>
				<div>
					<span>Add VAT</span>
					<select>
						<option value={""}>0%</option>
					</select>
				</div>
				<button
					onClick={proceedHandler}
					disabled={products.length > 0 ? false : true}
				>
					Proceed to Payment
				</button>
			</VatBtn>
		</CartDisplay>
	);
};

export default Cart;
