import { ProductStyle } from "../../styles/pos.styles";
import Img from "../../assets/images/product.png";

const EachProduct = ({}: { product: any }) => {
	return (
		<ProductStyle className="shadow">
			<div className="img">
				<img src={Img} className="img-fluid" />
				<span>200</span>
			</div>
			<div className="content">
				<div className="status">In Stock</div>
				<h5>Classic T-Shirt</h5>
				<h6>NGN 30,000</h6>
			</div>
		</ProductStyle>
	);
};

export default EachProduct;
