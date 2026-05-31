import { FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { CartDiscount, CartQty } from "../../styles/pos.styles";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
	removeProductCart,
	updateProductDiscount,
	updateProductDiscountType,
	updateProductPrice,
	updateProductQuantity,
} from "../../redux/cart/cartSlice";
import { formatCurrency } from "../../utils/currency";
import AmountField from "../AmountField";

const EachCartList = ({ item, cartId }: { item: any; cartId: any }) => {
	const dispatch = useAppDispatch();

	const { shopInfo, user } = useAppSelector((state) => state.auth);

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
				}),
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
				}),
			);
		}
	};

	const getTotal = (p: any) => {
		let subTotal = p.price * p.quantity;

		let discountAmount;
		if (p.discountType === "currency") {
			discountAmount = p.discount || 0;
		} else {
			discountAmount = subTotal * ((p.discount || 0) / 100);
		}

		let discountedTotal = subTotal - discountAmount;

		let total;
		if (p.vat === "exclusive") {
			total =
				discountedTotal *
				(1 + Number(user?.business?.vatRate || 0) / 100);
		} else {
			total = discountedTotal;
		}
		return formatCurrency(total);
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
				<CartDiscount wide="true">
					<AmountField
						value={item.price}
						noMargin={true}
						setValue={(arg) => {
							dispatch(
								updateProductPrice({
									cartId,
									productId: item.id,
									price: arg,
								}),
							);
						}}
					/>
				</CartDiscount>
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
								}),
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
			<td className={`vat ${item.vat}`}>
				<span>Vat {item.vat}</span>
			</td>
			<td>
				{shopInfo?.currency}
				{getTotal(item)}
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
