import { DisplayType, PosTitleSearch } from "../../../styles/pos.styles";
import { FaImage, FaListUl } from "react-icons/fa";
import { useState } from "react";
import ImageView from "../../../components/POS/ImageView";
import ListView from "../../../components/POS/ListView";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useParams } from "react-router-dom";
import CompleteSale from "./CompleteSale";
import { updateCartField } from "../../../redux/cart/cartSlice";

const POS = () => {
	const params = useParams();

	const dispatch = useAppDispatch();

	const [imageDisplay, setImageDisplay] = useState(true);

	const { cartItems } = useAppSelector((state) => state.cart);

	const cartInfo = cartItems.find((cart) => cart.cartId === params?.tabId);

	const selectCustomer = (value: string) => {
		dispatch(
			updateCartField({
				cartId: params?.tabId || "",
				value: value === "walk-in" ? false : true,
				field: "isSubdealer",
			})
		);
	};

	return cartInfo?.proceed ? (
		<CompleteSale cartId={params?.tabId} />
	) : (
		<div className="d-flex flex-column h-100">
			<div className="row mt-3">
				<div className="col-8">
					<PosTitleSearch>
						<div className="title">
							<h1>Sell to a</h1>
							<select
								value={
									cartInfo?.isSubdealer
										? "subdealer"
										: "walk-in"
								}
								onChange={(e) => selectCustomer(e.target.value)}
							>
								<option value={"walk-in"}>Walk-In</option>
								<option value={"subdealer"}>Subdealer</option>
							</select>
							<h1>Customer</h1>
							{cartInfo?.products?.length && (
								<span>{cartInfo?.products?.length}</span>
							)}
						</div>
					</PosTitleSearch>
				</div>
				<div className="col-4">
					<DisplayType>
						<div className="select">
							<span>Select Sales Type</span>
							<select>
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
	);
};

export default POS;
