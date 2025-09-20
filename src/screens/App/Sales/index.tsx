import EachSales from "../../../components/List/EachSales";
import Paginate from "../../../components/Paginate";
import SalesFilter from "../../../components/Sales/SalesFilter";
import Stats from "../../../components/Sales/Stats";
import { TableArea } from "../../../styles/basic.styles";
import { PosTitleSearch } from "../../../styles/pos.styles";
import { TableDiv } from "../../../styles/table.styles";

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
			<Stats />
			<SalesFilter />
			<TableArea>
				<div className="table-responsive h-100">
					<TableDiv className="table mb-0">
						<thead>
							<tr>
								<th>Date</th>
								<th>Product</th>
								<th>Transaction ID</th>
								<th>Staff</th>
								<th>Sales Amount</th>
								<th>Source</th>
								<th>Sync Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 10 }).map((_, i) => (
								<EachSales key={i} item={{}} />
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

export default Sales;
