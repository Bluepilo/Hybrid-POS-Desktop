import { Link } from "react-router-dom";
import { TableArea } from "../../styles/basic.styles";
import { TableDiv } from "../../styles/table.styles";
import { numberWithCommas } from "../../utils/currency";
import { MdCheckCircle, MdError, MdPending } from "react-icons/md";
import dateFormat from "dateformat";

const SalesSummaryView = ({ list }: { list: any }) => {
	return (
		<TableArea>
			<div className="table-responsive h-100">
				<TableDiv className="table mb-0">
					<thead>
						<tr>
							<th>Date</th>
							<th>Customer</th>
							<th>Transaction ID</th>
							<th>Staff</th>
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
								<td>{li.actorName}</td>
								<td className="link">
									<Link
										to={`${li.hybridRef}`}
										state={{ detail: li }}
									>
										{li.hybridRef}
									</Link>
								</td>
								<td>{li.userName}</td>
								<td>₦{numberWithCommas(li.amountPaid)}</td>
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

export default SalesSummaryView;
