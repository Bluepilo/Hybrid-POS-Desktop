import { StatsStyles, TableArea } from "../../../styles/basic.styles";
import { PosTitleSearch } from "../../../styles/pos.styles";
import Icon from "../../../assets/images/money.svg";
import InputField from "../../../components/InputField";
import { useState } from "react";
import { TableDiv } from "../../../styles/table.styles";
import EachStock from "../../../components/List/EachStock";
import Paginate from "../../../components/Paginate";

const Stocks = () => {
	const [dateType, setDateType] = useState("");

	return (
		<div className="d-flex flex-column h-100">
			<PosTitleSearch className="mt-3">
				<div className="title">
					<h1>Stocks</h1>
					<span>3</span>
				</div>
			</PosTitleSearch>
			<div className="row">
				<div className="col-lg-4 col-8">
					<StatsStyles>
						<div className="stat-item">
							<div className="img">
								<img src={Icon} />
							</div>
							<div className="text">
								<h6>Products in Stock</h6>
								<h6>5000</h6>
							</div>
						</div>
					</StatsStyles>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-1 col-md-3 col-4">
					<InputField
						inputType="select"
						value={dateType}
						setValue={setDateType}
						placeholder="Category"
						noMargin
					/>
				</div>
				<div className="col-lg-1 col-md-3 col-4">
					<InputField
						inputType="select"
						value={dateType}
						setValue={setDateType}
						placeholder="Brand"
						noMargin
					/>
				</div>
				<div className="col-lg-2 col-md-3 col-4 align-self-end">
					<button
						style={{
							border: 0,
							outline: 0,
							background: "none",
							color: "rgba(0, 128, 128, 1)",
							textDecoration: "underline",
						}}
					>
						Clear Filters
					</button>
				</div>
				<div className="col-lg-4">
					<InputField
						value={dateType}
						setValue={setDateType}
						inputType="text"
						placeholder="Search Name"
						noMargin
					/>
				</div>
			</div>
			<TableArea>
				<div className="table-responsive h-100">
					<TableDiv className="table mb-0">
						<thead>
							<tr>
								<th>Product</th>
								<th>Measurement</th>
								<th>Unit</th>
								<th>Barcode</th>
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 10 }).map((_, i) => (
								<EachStock key={i} item={{}} />
							))}
						</tbody>
					</TableDiv>
				</div>
			</TableArea>
			<Paginate
				changeLimit={(l) => console.log(l)}
				limit={20}
				count={50}
				pageNumber={1}
				onSelect={(l) => console.log(l)}
			/>
		</div>
	);
};

export default Stocks;
