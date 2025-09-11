import { CartDisplay, VatBtn } from "../../styles/pos.styles";
import EachCart from "../List/EachCart";

const Cart = () => {
	return (
		<CartDisplay>
			<div className="cart">
				<div className="items">
					<EachCart item={{}} />
					<EachCart item={{}} />
					<EachCart item={{}} />
					<EachCart item={{}} />
					<EachCart item={{}} />
				</div>
				<div className="bttm-pos">
					<div className="yellow">
						<div>
							<span>Total Discount</span>
							<strong>₦3,000</strong>
						</div>
						<div>
							<span>Total Amount Before Discount</span>
							<strong>₦500,000</strong>
						</div>
					</div>
					<div className="dark">
						<span>Total Amount</span>
						<strong>₦500,000</strong>
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
				<button disabled={true}>Proceed to Payment</button>
			</VatBtn>
		</CartDisplay>
	);
};

export default Cart;
