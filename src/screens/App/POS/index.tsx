import { DisplayType, PosTitleSearch } from "../../../styles/pos.styles";
import { FaImage, FaListUl } from "react-icons/fa";
import { useEffect, useState } from "react";
import ImageView from "../../../components/POS/ImageView";
import ListView from "../../../components/POS/ListView";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useNavigate, useParams } from "react-router-dom";
import CompleteSale from "./CompleteSale";
import { createCart, updateCartField } from "../../../redux/cart/cartSlice";
import { loadProducts } from "../../../redux/app/appSlice";
import Button from "../../../components/Button";
import { generateId } from "../../../utils/data";
import { FiRefreshCcw } from "react-icons/fi";
import { ButtonNormal } from "../../../styles/form.styles";
import { syncDBShop } from "../../../utils/db/dbUpdate";
import { Spinner } from "react-bootstrap";
import { displayError } from "../../../utils/display";

const POS = () => {
	const params = useParams();

	const navigate = useNavigate();

	const dispatch = useAppDispatch();

	const [imageDisplay, setImageDisplay] = useState(true);
	const [loadSync, setLoadSync] = useState(false);

	const { cartItems } = useAppSelector((state) => state.cart);
	const { shopInfo } = useAppSelector((state) => state.auth);

	const cartInfo = cartItems.find((cart) => cart.cartId === params?.tabId);

	useEffect(() => {
		dispatch(loadProducts());
	}, []);

	const syncHandler = async () => {
		try {
			setLoadSync(true);
			await syncDBShop(shopInfo.id);
			setLoadSync(false);
		} catch (err) {
			setLoadSync(false);
		}
	};

	const selectCustomer = (value: string) => {
		if (cartInfo?.products?.length === 0) {
			dispatch(
				updateCartField({
					cartId: params?.tabId || "",
					value: value === "walk-in" ? false : true,
					field: "isSubdealer",
				})
			);
		} else {
			displayError(
				`Please clear cart before switching customer type`,
				true
			);
		}
	};

	const selectAdvance = (value: string) => {
		dispatch(
			updateCartField({
				cartId: params?.tabId || "",
				value: value === "normal" ? false : true,
				field: "isAdvanced",
			})
		);
	};

	const createCartHandler = () => {
		const id = generateId();
		dispatch(createCart(id));
		navigate(`/app/pos/${id}`);
	};

	return cartItems.length > 0 ? (
		cartInfo?.proceed ? (
			<CompleteSale cartId={params?.tabId} />
		) : (
			<div className="d-flex flex-column h-100">
				<div className="row mt-3">
					<div className="col-8">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<PosTitleSearch>
								<div className="title">
									<h1>Sell to a</h1>
									<select
										value={
											cartInfo?.isSubdealer
												? "subdealer"
												: "walk-in"
										}
										onChange={(e) =>
											selectCustomer(e.target.value)
										}
									>
										<option value={"walk-in"}>
											Walk-In
										</option>
										<option value={"subdealer"}>
											Subdealer
										</option>
									</select>
									<h1>Customer</h1>
									{Array.isArray(cartInfo?.products) &&
										cartInfo.products.length > 0 && (
											<span>
												{cartInfo?.products?.length}
											</span>
										)}
								</div>
							</PosTitleSearch>
							<ButtonNormal
								onClick={syncHandler}
								disabled={loadSync}
							>
								{loadSync ? (
									<Spinner size="sm" />
								) : (
									<FiRefreshCcw />
								)}
							</ButtonNormal>
						</div>
					</div>
					<div className="col-4">
						<DisplayType>
							<div className="select">
								<span>Select Sales Type</span>
								<select
									value={
										cartInfo?.isAdvanced
											? "advance"
											: "normal"
									}
									onChange={(e) =>
										selectAdvance(e.target.value)
									}
								>
									<option value={"normal"}>Normal</option>
									<option value={"advance"}>Advance</option>
								</select>
							</div>
							<div className="display">
								<button
									className={imageDisplay ? "active" : ""}
									onClick={() => setImageDisplay(true)}
								>
									<FaImage size={15} />
									<span>Gallery</span>
								</button>
								<button
									className={!imageDisplay ? "active" : ""}
									onClick={() => setImageDisplay(false)}
								>
									<FaListUl size={15} />
									<span>List</span>
								</button>
							</div>
						</DisplayType>
					</div>
				</div>
				{imageDisplay ? <ImageView /> : <ListView />}
			</div>
		)
	) : (
		<div
			style={{
				justifyContent: "center",
				alignItems: "center",
				display: "flex",
				height: "100%",
				width: "100%",
			}}
		>
			<div style={{ width: "400px" }}>
				<Button name="Record New Sale" onClick={createCartHandler} />
			</div>
		</div>
	);
};

export default POS;
