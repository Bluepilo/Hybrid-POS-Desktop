import { ProductStyle } from "../../styles/pos.styles";
import Img from "../../assets/images/image.png";
import { numberWithCommas } from "../../utils/currency";
import { useAppDispatch } from "../../utils/hooks";
import { addProductToCart } from "../../redux/cart/cartSlice";

const EachProduct = ({ product, cartId }: { product: any; cartId: any }) => {
	const dispatch = useAppDispatch();

	const cartHandler = () => {
		dispatch(
			addProductToCart({
				cartId,
				product: {
					id: product.productId,
					name: product.name,
					quantity: 1,
					price: product.price,
				},
			})
		);
	};

	return (
		<ProductStyle className="shadow" onClick={cartHandler}>
			<div className="img">
				<img src={product.image || Img} className="img-fluid" />
				<span>200</span>
			</div>
			<div className="content">
				<div className="status">In Stock</div>
				<h5>{product.name}</h5>
				<h6>NGN {numberWithCommas(product.price)}</h6>
			</div>
		</ProductStyle>
	);
};

export default EachProduct;
