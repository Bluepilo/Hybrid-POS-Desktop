import { FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { CartDiscount, CartQty } from "../../styles/pos.styles";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
	removeProductCart,
	updateProductDiscount,
	updateProductDiscountType,
	updateProductQuantity,
} from "../../redux/cart/cartSlice";
import { numberWithCommas } from "../../utils/currency";

const EachCartList = ({ item, cartId }: { item: any; cartId: any }) => {
	const dispatch = useAppDispatch();

	const { shopInfo } = useAppSelector((state) => state.auth);

	const [value, setValue] = useState(`${item.quantity}`);
	const [discount, setDiscount] = useState(`${item.discount || 0}`);

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

	const deleteHandler = () => {
		dispatch(removeProductCart({ cartId, productId: item.id }));
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
		<tr>
			<td>{item.name}</td>
			<td className="qty">
				<CartQty>
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
				</CartQty>
			</td>
			<td>
				{shopInfo?.currency}
				{numberWithCommas(item.price)}
			</td>
			<td className="discount">
				<CartDiscount>
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
			</td>
			<td>
				{shopInfo?.currency}
				{numberWithCommas(item.price * item.quantity)}
			</td>
			<td className="button">
				<button onClick={deleteHandler}>
					<FaRegTrashAlt size={15} color="red" />
				</button>
			</td>
		</tr>
	);
};

export default EachCartList;
