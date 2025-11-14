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
import dateFormat from "dateformat";
import LoginModal from "./LoginModal";
import appService from "../redux/app/appService";
import { updateSaleSyncStatus } from "../utils/db/dbUpdate";
import { reduceSync } from "../redux/app/appSlice";
import { displayError } from "../utils/display";
import authService from "../redux/auth/authService";
import { fetchAllSales } from "../utils/db/dbFetch";
import { Spinner } from "react-bootstrap";

const Header = () => {
	const params = useParams();

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const { user } = useAppSelector((state) => state.auth);
	const { cartItems } = useAppSelector((state) => state.cart);
	const { syncCount } = useAppSelector((state) => state.app);

	const [loadButton, setLoadButton] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [openSession, setOpenSession] = useState(false);

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

	const checkConnection = async () => {
		try {
			setLoadButton(true);
			await authService.getProfile();
			let res = await fetchAllSales({});
			syncAllSales(res);
		} catch (err) {
			setLoadButton(false);
			let message = displayError(err, false);
			if (message?.includes("Session expired")) {
				setOpenSession(true);
			} else {
				displayError(err, true);
			}
		}
	};

	const syncAllSales = async (salesVals: any) => {
		if (salesVals?.data?.length > 0) {
			const promises = salesVals.data.map(async (sale: any) => {
				if (sale.syncStatus !== "success" && user.id == sale.userId) {
					try {
						await appService.makeSale({
							...sale,
							customerId: sale.actorId,
							status: "complete",
							isDeposit: false,
						});
						await updateSaleSyncStatus(sale.id, "success");
						dispatch(reduceSync());
					} catch (err) {
						let msg = displayError(err, false);
						await updateSaleSyncStatus(sale.id, "failed", msg);
					}
				}
			});

			await Promise.allSettled(promises);
			setLoadButton(false);
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
					{syncCount > 0 && (
						<button
							disabled={loadButton}
							className="sync"
							onClick={checkConnection}
						>
							<span>Sync</span>
							<b>{syncCount}</b>
							{loadButton && (
								<Spinner
									animation="border"
									color={"#FFF"}
									style={{ marginLeft: "10px" }}
									size="sm"
								/>
							)}
						</button>
					)}
					<div className="user">
						<div className="name">
							<span className="status" />
							<b>Staff:</b>
							<span>
								{user?.name
									? user.name
									: `${user?.firstName} ${user?.lastName}`}
							</span>
						</div>
						<div className="time">
							{dateFormat(Date.now(), "mmm dd, yyyy")}
						</div>
					</div>
					<button className="hint">
						<FaQuestionCircle />
						<span>Hint</span>
					</button>
				</div>
			</HeaderStyles>
			<Sidebar open={openMenu} onClose={() => setOpenMenu(false)} />
			<LoginModal open={openSession} toggleLogin={setOpenSession} />
		</>
	);
};

export default Header;
