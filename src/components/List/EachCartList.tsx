import { FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { CartDiscount, CartQty } from "../../styles/pos.styles";
import { useState } from "react";
import { useAppDispatch } from "../../utils/hooks";
import {
	removeProductCart,
	updateProductQuantity,
} from "../../redux/cart/cartSlice";
import { numberWithCommas } from "../../utils/currency";

const EachCartList = ({ item, cartId }: { item: any; cartId: any }) => {
	const dispatch = useAppDispatch();

	const [value, setValue] = useState(`${item.quantity}`);
	const [discount, setDiscount] = useState("");

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
			<td>₦{numberWithCommas(item.price)}</td>
			<td className="discount">
				<CartDiscount>
					<button>
						<span>%</span>
						<FaCaretDown />
					</button>
					<input
						value={discount}
						onChange={(e) => setDiscount(e.target.value)}
					/>
				</CartDiscount>
			</td>
			<td>₦{numberWithCommas(item.price * item.quantity)}</td>
			<td className="button">
				<button onClick={deleteHandler}>
					<FaRegTrashAlt size={15} color="red" />
				</button>
			</td>
		</tr>
	);
};

export default EachCartList;
