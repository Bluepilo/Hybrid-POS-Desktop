import { useEffect } from "react";
import CustomerFilter from "../../../components/Customer/CustomerFilter";
import EachCustomer from "../../../components/List/EachCustomer";
import Paginate from "../../../components/Paginate";
import { TableArea } from "../../../styles/basic.styles";
import { PosTitleSearch } from "../../../styles/pos.styles";
import { TableDiv } from "../../../styles/table.styles";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { loadCustomers } from "../../../redux/app/appSlice";

const Customers = () => {
	const dispatch = useAppDispatch();

	const { customers } = useAppSelector((state) => state.app);

	useEffect(() => {
		dispatch(loadCustomers());
	}, []);

	return (
		<div className="d-flex flex-column h-100">
			<PosTitleSearch className="mt-3">
				<div className="title">
					<h1>Customers</h1>
					<span>{customers.length}</span>
				</div>
			</PosTitleSearch>
			<CustomerFilter />
			<TableArea>
				<div className="table-responsive h-100">
					<TableDiv className="table mb-0">
						<thead>
							<tr>
								<th>Customer Name</th>
								<th>Phone Number</th>
								<th>Email</th>
								<th>Wallet Balance</th>
								<th>Credit Limit</th>
								<th>Customer Status</th>
								<th>Sync Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{customers.map((customer: any) => (
								<EachCustomer
									key={customer.id}
									item={customer}
								/>
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
