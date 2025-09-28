import { IoIosSearch } from "react-icons/io";
import { BodyScroll, SearchBtn } from "../../styles/pos.styles";
import { TbTextScan2 } from "react-icons/tb";
import EachProduct from "../List/EachProduct";
import Cart from "./Cart";
import { useAppSelector } from "../../utils/hooks";
import { useParams } from "react-router-dom";

const ImageView = () => {
	const params = useParams();

	const { products } = useAppSelector((state) => state.app);

	const { cartItems } = useAppSelector((state) => state.cart);

	const productsInCart =
		cartItems.find((cart) => cart.cartId === params?.tabId)?.products || [];

	return (
		<div className="row">
			<div className={`col-${productsInCart.length > 0 ? "8" : "12"}`}>
				<SearchBtn>
					<div className="input">
						<input type="text" placeholder="Search Name" />
						<IoIosSearch size={18} color="#333" />
					</div>
					<button>
						<TbTextScan2 size={20} />
						<span>Scan Barcode</span>
					</button>
				</SearchBtn>
				<BodyScroll className="mt-3 row">
					{Array.isArray(products) &&
						products.length > 0 &&
						products.map((product) => (
							<div
								className={`col-lg-${
									productsInCart.length > 0 ? "3" : "2"
								} col-md-4 col-sm-6`}
								key={product.productId}
							>
								<EachProduct
									product={product}
									cartId={params?.tabId}
								/>
							</div>
						))}
				</BodyScroll>
			</div>
			{productsInCart.length > 0 && (
				<div className="col-4">
					<Cart products={productsInCart} />
				</div>
			)}
		</div>
	);
};

export default ImageView;
