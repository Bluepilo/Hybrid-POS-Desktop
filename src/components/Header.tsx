import { HeaderStyles } from "../styles/header.styles";
import { IoMenu } from "react-icons/io5";
import Logo from "../assets/images/bluepilo.svg";
import { FiPlus } from "react-icons/fi";
import { FaQuestionCircle, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { createCart, removeFromCart } from "../redux/cart/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { generateId } from "../utils/data";

const Header = () => {
	const params = useParams();

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const { cartItems } = useAppSelector((state) => state.cart);

	const [openMenu, setOpenMenu] = useState(false);

	const addTab = () => {
		const id = generateId();
		dispatch(createCart(id));
		navigate(`/app/pos/${id}`);
	};

	const removeTab = (id: string) => {
		let find = cartItems?.find((f) => f.cartId === id);
		if (find?.products && find.products.length > 0) {
			// Alert the user to clear cart first.
		} else {
			dispatch(removeFromCart(id));
		}
	};

	return (
		<>
			<HeaderStyles>
				<div className="left-nav">
					<button className="me-2" onClick={() => setOpenMenu(true)}>
						<IoMenu size={22} color="#000" />
					</button>
					<img src={Logo} />
					<div className="tab">
						{cartItems?.map((cart, index) => (
							<div
								className={`select ${
									params?.tabId == cart.cartId ? "active" : ""
								}`}
								key={cart.cartId}
								onClick={() =>
									navigate(`/app/pos/${cart.cartId}`)
								}
							>
								<span>POS {index + 1}</span>
								<div
									className="svg"
									onClick={() => removeTab(cart.cartId)}
								>
									<FaTimes />
								</div>
							</div>
						))}
						<button className="plus" onClick={addTab}>
							<FiPlus color="rgba(0, 13, 51, 1)" size={20} />
						</button>
					</div>
				</div>
				<div className="right-nav">
					<div className="user">
						<div className="name">
							<span className="status" />
							<b>Staff:</b>
							<span>Alex Johnson</span>
						</div>
						<div className="time">Sept 10, 2025, 05:00 PM</div>
					</div>
					<button>
						<FaQuestionCircle />
						<span>Hint</span>
					</button>
				</div>
			</HeaderStyles>
			<Sidebar open={openMenu} onClose={() => setOpenMenu(false)} />
		</>
	);
};

export default Header;
