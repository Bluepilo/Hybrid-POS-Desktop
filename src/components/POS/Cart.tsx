import { useParams } from "react-router-dom";
import { updateCartField } from "../../redux/cart/cartSlice";
import { CartDisplay, VatBtn } from "../../styles/pos.styles";
import { formatCurrency } from "../../utils/currency";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import EachCart from "../List/EachCart";

const Cart = ({ products }: { products: any }) => {
	const params = useParams();

	const dispatch = useAppDispatch();

	const { shopInfo, user } = useAppSelector((state) => state.auth);

	const proceedHandler = () => {
		dispatch(
			updateCartField({
				cartId: params?.tabId || "",
				value: true,
				field: "proceed",
			}),
		);
	};

	const totalAmount = products.reduce((sum: any, item: any) => {
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
		<CartDisplay>
			<div className="cart">
				<div className="items">
					{products?.map((product: any) => (
						<EachCart item={product} key={product.id} />
					))}
				</div>
				<div className="bttm-pos">
					<div className="dark">
						<span>Total Amount</span>
						<strong>
							{shopInfo?.currency}
							{formatCurrency(totalAmount)}
						</strong>
					</div>
				</div>
			</div>
			<VatBtn>
				<div />
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
