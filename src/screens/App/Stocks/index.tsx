import { StatsStyles, TableArea } from "../../../styles/basic.styles";
import { PosTitleSearch } from "../../../styles/pos.styles";
import Icon from "../../../assets/images/money.svg";
import InputField from "../../../components/InputField";
import { useEffect, useState } from "react";
import { TableDiv } from "../../../styles/table.styles";
import EachStock from "../../../components/List/EachStock";
import Paginate from "../../../components/Paginate";
import { loadProducts } from "../../../redux/app/appSlice";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

const Stocks = () => {
	const dispatch = useAppDispatch();

	const [dateType, setDateType] = useState("");

	const { products } = useAppSelector((state) => state.app);

	useEffect(() => {
		dispatch(loadProducts());
	}, []);

	console.log(products, "pp");

	return (
		<div className="d-flex flex-column h-100">
			<PosTitleSearch className="mt-3">
				<div className="title">
					<h1>Stocks</h1>
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
								<h6>
									{products?.reduce(
										(a: any, b: any) =>
											a + Number(b.totalStock),
										0
									)}
								</h6>
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
							{products?.map((product: any) => (
								<EachStock key={product.id} item={product} />
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
