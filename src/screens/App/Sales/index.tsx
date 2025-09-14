import { PosTitleSearch } from "../../../styles/pos.styles";

const Sales = () => {
	return (
		<div className="d-flex flex-column h-100">
			<PosTitleSearch className="mt-3">
				<div className="title">
					<h1>Sales Record</h1>
					<span>3</span>
					<select>
						<option value={"walk-in"}>Detail View</option>
					</select>
				</div>
			</PosTitleSearch>
		</div>
	);
};

export default Sales;
