import { ProductStyle } from "../../styles/pos.styles";
import Img from "../../assets/images/image.png";
import { numberWithCommas } from "../../utils/currency";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addProductToCart } from "../../redux/cart/cartSlice";

const EachProduct = ({ product, cartId }: { product: any; cartId: any }) => {
	const dispatch = useAppDispatch();

	const { cartItems } = useAppSelector((state) => state.cart);
	const { customerTypes } = useAppSelector((state) => state.app);

	const { shopInfo } = useAppSelector((state) => state.auth);

	const customerType = cartItems.find(
		(cart) => cart.cartId === cartId,
	)?.customerTypeId;

	const getPriceType = (costPrice: number) => {
		let priceInfo = customerTypes?.find(
			(c: any) => c.typeId == customerType,
		);
		if (priceInfo?.percentage) {
			let finalAmount;

			let val = Number(costPrice) * (Number(priceInfo.percentage) / 100);

			if (priceInfo.markType === "markdown") {
				finalAmount = Number(costPrice) - val;
			} else {
				finalAmount = Number(costPrice) + val;
			}

			return finalAmount;
		} else {
			return 0;
		}
	};

	const cartHandler = () => {
		dispatch(
			addProductToCart({
				cartId,
				product: {
					id: product.productId,
					name: product.name,
					quantity: 1,
					price: product.price || getPriceType(product.costPrice),
					vat: product.vatType,
				},
			}),
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
						product.price || getPriceType(product.costPrice),
					)}
				</h6>
			</div>
		</ProductStyle>
	);
};

export default EachProduct;
