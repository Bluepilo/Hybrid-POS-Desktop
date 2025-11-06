import { FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { CartDiscount, CartItem } from "../../styles/pos.styles";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { numberWithCommas } from "../../utils/currency";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
	removeProductCart,
	updateProductDiscount,
	updateProductDiscountType,
	updateProductQuantity,
} from "../../redux/cart/cartSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

const EachCart = ({ item }: { item: any }) => {
	const params = useParams();

	const cartId = params?.tabId || "";

	const dispatch = useAppDispatch();

	const [value, setValue] = useState(`${item.quantity}`);
	const [discount, setDiscount] = useState(`${item.discount || 0}`);

	const { shopInfo } = useAppSelector((state) => state.auth);

	const deleteHandler = () => {
		dispatch(removeProductCart({ cartId, productId: item.id }));
	};

	const updateHandler = (val: number) => {
		if (!isNaN(val)) {
			setValue(`${val}`);
			dispatch(
				updateProductQuantity({
					cartId,
					productId: item.id,
					quantity: val,
				})
			);
		}
	};

	const updateDiscount = (val: number) => {
		if (!isNaN(val)) {
			setDiscount(`${val}`);
			dispatch(
				updateProductDiscount({
					cartId,
					productId: item.id,
					discount: val,
				})
			);
		}
	};

	return (
		<CartItem>
			<div className="top-details">
				<h6>{item.name}</h6>
				<div>
					<button
						onClick={() => {
							if (item.quantity > 1) {
								updateHandler(Number(value) - 1);
							}
						}}
					>
						<FaSquareMinus size={22} color="#000d33" />
					</button>
					<input
						value={value}
						onChange={(e) => updateHandler(Number(e.target.value))}
					/>
					<button onClick={() => updateHandler(Number(value) + 1)}>
						<FaSquarePlus size={22} color="#000d33" />
					</button>
					<button onClick={deleteHandler}>
						<FaRegTrashAlt size={15} color="red" />
					</button>
				</div>
			</div>
			<div className="btm-details">
				<div>
					<p>Total Unit Price</p>
					<h6>
						{shopInfo?.currency}
						{numberWithCommas(item.price * item.quantity)}
					</h6>
				</div>
				<CartDiscount>
					<span className="em">Discount</span>
					<button
						onClick={() =>
							dispatch(
								updateProductDiscountType({
									cartId,
									productId: item.id,
									isPercent:
										item.discountType === "currency"
											? true
											: false,
								})
							)
						}
					>
						<span>
							{item.discountType === "currency" ? "₦" : "%"}
						</span>
						<FaCaretDown />
					</button>
					<input
						value={discount}
						onChange={(e) => updateDiscount(Number(e.target.value))}
					/>
				</CartDiscount>
			</div>
		</CartItem>
	);
};

export default EachCart;
