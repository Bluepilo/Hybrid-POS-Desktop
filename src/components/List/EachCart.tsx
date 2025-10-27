import { FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { CartDiscount, CartItem } from "../../styles/pos.styles";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { numberWithCommas } from "../../utils/currency";
import { useAppDispatch } from "../../utils/hooks";
import {
	removeProductCart,
	updateProductQuantity,
} from "../../redux/cart/cartSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

const EachCart = ({ item }: { item: any }) => {
	const params = useParams();

	const cartId = params?.tabId || "";

	const dispatch = useAppDispatch();

	const [value, setValue] = useState(`${item.quantity}`);

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
					<h6>₦{numberWithCommas(item.price * item.quantity)}</h6>
				</div>
				<CartDiscount>
					<span className="em">Discount</span>
					<button>
						<span>%</span>
						<FaCaretDown />
					</button>
					<input value={"0"} />
				</CartDiscount>
			</div>
		</CartItem>
	);
};

export default EachCart;
