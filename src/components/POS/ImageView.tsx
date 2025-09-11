import { IoIosSearch } from "react-icons/io";
import { BodyScroll, SearchBtn } from "../../styles/pos.styles";
import { TbTextScan2 } from "react-icons/tb";
import EachProduct from "../List/EachProduct";
import Cart from "./Cart";

const ImageView = () => {
	return (
		<div className="row">
			<div className="col-8">
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
					{Array.from({ length: 12 }).map((_, i) => (
						<div className="col-lg-3 col-md-4 col-sm-6" key={i}>
							<EachProduct product={{}} />
						</div>
					))}
				</BodyScroll>
			</div>
			<div className="col-4">
				<Cart />
			</div>
		</div>
	);
};

export default ImageView;
