import { Link } from "react-router-dom";
import { TableArea } from "../../styles/basic.styles";
import { TableDiv } from "../../styles/table.styles";
import { numberWithCommas } from "../../utils/currency";
import { MdCheckCircle, MdError, MdPending } from "react-icons/md";
import dateFormat from "dateformat";

const SalesDetailsView = ({ list }: { list: any }) => {
	return (
		<TableArea>
			<div className="table-responsive h-100">
				<TableDiv className="table mb-0">
					<thead>
						<tr>
							<th>Date</th>
							<th>Product</th>
							<th>Transaction ID</th>
							<th>Customer</th>
							<th>Sales Amount</th>
							<th>Source</th>
							<th>Sync Status</th>
						</tr>
					</thead>
					<tbody>
						{list?.data?.map((li: any) => (
							<tr key={li.id}>
								<td>
									{dateFormat(li.createdAt, "mmm dd, yyyy")}
								</td>
								<td>{li.productName}</td>
								<td className="link">
									<Link
										to={`${li.saleRef}`}
										state={{ detail: li }}
									>
										{li.saleRef}
									</Link>
								</td>
								<td>{li.actorName}</td>
								<td>
									₦{numberWithCommas(li.price * li.quantity)}
								</td>
								<td>Hybrid App</td>
								<td>
									{li.syncStatus === "success" ? (
										<MdCheckCircle
											size={20}
											color="green"
										/>
									) : li.syncStatus === "failed" ? (
										<MdError size={20} color="red" />
									) : (
										<MdPending size={20} color="orange" />
									)}
									<span
										style={{ textTransform: "capitalize" }}
									>
										{li.syncStatus}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</TableDiv>
			</div>
		</TableArea>
	);
};

export default SalesDetailsView;
