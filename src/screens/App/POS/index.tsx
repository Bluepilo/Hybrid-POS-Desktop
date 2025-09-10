import { TbTextScan2 } from "react-icons/tb";
import { PosTitleSearch } from "../../../styles/pos.styles";
import { IoIosSearch } from "react-icons/io";
import EachProduct from "../../../components/List/EachProduct";

const POS = () => {
	return (
		<div className="row mt-3">
			<div className="col-7">
				<PosTitleSearch>
					<div className="title">
						<h1>Sell to a</h1>
						<select>
							<option value={"walk-in"}>Walk-In</option>
							<option value={"subdealer"}>Subdealer</option>
						</select>
						<h1>Customer</h1>
						<span>3</span>
					</div>
					<div className="search">
						<div className="input">
							<input type="text" placeholder="Search Name" />
							<IoIosSearch size={18} color="#333" />
						</div>

						<button>
							<TbTextScan2 size={20} />
							<span>Scan Barcode</span>
						</button>
					</div>
				</PosTitleSearch>
				<div className="mt-3 row">
					{Array.from({ length: 12 }).map((_, i) => (
						<div className="col-lg-3 col-md-4 col-sm-6" key={i}>
							<EachProduct product={{}} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default POS;
