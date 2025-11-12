import { ProductStyle } from "../../styles/pos.styles";
import Img from "../../assets/images/image.png";
import { numberWithCommas } from "../../utils/currency";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addProductToCart } from "../../redux/cart/cartSlice";

const EachProduct = ({ product, cartId }: { product: any; cartId: any }) => {
	const dispatch = useAppDispatch();

	const { cartItems } = useAppSelector((state) => state.cart);

	const cartInfo = cartItems.find((cart) => cart.cartId === cartId);

	const { shopInfo } = useAppSelector((state) => state.auth);

	const cartHandler = () => {
		dispatch(
			addProductToCart({
				cartId,
				product: {
					id: product.productId,
					name: product.name,
					quantity: 1,
					price: cartInfo?.isSubdealer
						? product.costPrice
						: product.price,
				},
			})
		);
	};

	return (
		<ProductStyle className="shadow" onClick={cartHandler}>
			<div className="img">
				<img src={product.image || Img} className="img-fluid" />
				<span>{product.totalStock}</span>
			</div>
			<div className="content">
				<div className="status">
					{product.totalStock > 0 || product.isService
						? "In Stock"
						: "Out of Stock"}
				</div>
				<h5>{product.name}</h5>
				<h6>
					{shopInfo?.currency}{" "}
					{numberWithCommas(
						cartInfo?.isSubdealer
							? product.costPrice
							: product.price
					)}
				</h6>
			</div>
		</ProductStyle>
	);
};

export default EachProduct;
