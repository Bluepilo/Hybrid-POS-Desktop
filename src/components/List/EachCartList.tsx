import { FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import { CartDiscount, CartQty } from "../../styles/pos.styles";

const EachCartList = ({}: { item: any }) => {
	return (
		<tr>
			<td>Classic T-Shirt</td>
			<td className="qty">
				<CartQty>
					<button>
						<FaSquareMinus size={22} color="#000d33" />
					</button>
					<input value={"1"} />
					<button>
						<FaSquarePlus size={22} color="#000d33" />
					</button>
				</CartQty>
			</td>
			<td>₦30,000</td>
			<td className="discount">
				<CartDiscount>
					<button>
						<span>%</span>
						<FaCaretDown />
					</button>
					<input value={"0"} />
				</CartDiscount>
			</td>
			<td>₦30,000</td>
			<td className="button">
				<button>
					<FaRegTrashAlt size={15} color="red" />
				</button>
			</td>
		</tr>
	);
};

export default EachCartList;
