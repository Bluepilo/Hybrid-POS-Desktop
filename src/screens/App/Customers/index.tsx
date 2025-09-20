import CustomerFilter from "../../../components/Customer/CustomerFilter";
import EachCustomer from "../../../components/List/EachCustomer";
import Paginate from "../../../components/Paginate";
import { TableArea } from "../../../styles/basic.styles";
import { PosTitleSearch } from "../../../styles/pos.styles";
import { TableDiv } from "../../../styles/table.styles";

const Customers = () => {
	return (
		<div className="d-flex flex-column h-100">
			<PosTitleSearch className="mt-3">
				<div className="title">
					<h1>Customers</h1>
					<span>3</span>
				</div>
			</PosTitleSearch>
			<CustomerFilter />
			<TableArea>
				<div className="table-responsive h-100">
					<TableDiv className="table mb-0">
						<thead>
							<tr>
								<th>Last Transaction</th>
								<th>Customer Name</th>
								<th>Phone Number</th>
								<th>Wallet Balance</th>
								<th>Credit Limit</th>
								<th>Customer Status</th>
								<th>Sync Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 10 }).map((_, i) => (
								<EachCustomer key={i} item={{}} />
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

export default Customers;
