import { FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { CartDiscount, CartItem } from "../../styles/pos.styles";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";

const EachCart = ({}: { item: any }) => {
	return (
		<CartItem>
			<div className="top-details">
				<h6>Classic T-Shirt</h6>
				<div>
					<button>
						<FaSquareMinus size={22} color="#000d33" />
					</button>
					<input value={"1"} />
					<button>
						<FaSquarePlus size={22} color="#000d33" />
					</button>
					<button>
						<FaRegTrashAlt size={15} color="red" />
					</button>
				</div>
			</div>
			<div className="btm-details">
				<div>
					<p>Total Unit Price</p>
					<h6>₦30,000</h6>
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
