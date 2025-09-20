import { FaArrowLeft, FaCaretRight, FaTrash } from "react-icons/fa";
import DetailsList from "../../../components/Sales/DetailsList";
import {
	BtnAttach,
	CardBox,
	FlexBetween,
	SalesDetailsStyles,
	SalesInfo,
	Status,
	SyncTable,
	TotalBox,
} from "../../../styles/basic.styles";
import { FiDownload, FiRefreshCcw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { TableDiv } from "../../../styles/table.styles";
import Button from "../../../components/Button";
import { GrDocumentOutlook } from "react-icons/gr";

const SalesDetails = () => {
	const navigate = useNavigate();

	return (
		<SalesDetailsStyles>
			<div className="detail-list">
				<DetailsList />
			</div>
			<div className="detail-content">
				<div className="detail-head">
					<div className="crumb">
						<button onClick={() => navigate(-1)}>
							<FaArrowLeft />
							<span>Back</span>
						</button>
						<span>Sales</span>
						<FaCaretRight />
						<span className="ms-2">YDHJKSIOO</span>
					</div>
					<div className="button">
						<button>
							<FiDownload />
							<span>Download (1)</span>
						</button>
					</div>
				</div>
				<div className="detail-body">
					<p
						style={{
							color: "rgba(190, 190, 190, 1)",
							fontSize: "0.8rem",
							fontWeight: "bold",
							margin: "0",
						}}
					>
						Customers
					</p>
					<SalesInfo className="shadow-sm mt-2">
						<div className="first">
							<span>SB</span>
							<div>
								<h6>Sugar Boy Jnr</h6>
								<p>08011122333</p>
								<p>email@email.com</p>
								<p>5, Kola street.</p>
							</div>
						</div>
						<div className="wallet">
							<div>
								<span>Total in Wallets:</span>
								<strong>₦30,000</strong>
							</div>
							<div>
								<span>Credit Limit:</span>
								<strong>₦30,000</strong>
							</div>
						</div>
					</SalesInfo>
					<CardBox className="shadow-sm mt-3">
						<h5>Sale SF2361755125529093</h5>
						<Status>Paid</Status>
						<div
							className="row mt-3"
							style={{ color: "#666", fontSize: "0.85rem" }}
						>
							<div className="col-lg-4">
								<div>
									<strong>Date</strong>
									<span className="ms-2">
										09 Aug, 2025 | 09:23 AM
									</span>
								</div>
								<div className="mt-1">
									<strong>Reference ID</strong>
									<span className="ms-2">C1000</span>
								</div>
								<div className="mt-1">
									<strong>Logged By</strong>
									<span className="ms-2">James Ibom</span>
								</div>
								<div className="mt-1">
									<strong>Shop</strong>
									<span className="ms-2">Shop 1</span>
								</div>
							</div>
							<div className="col-lg-3" />
							<div className="col-lg-4">
								<h6>Notes</h6>
								<p>
									Lorem ipsum dolor sit amet consectetur.
									Facilisi gravida nulla mi interdum eget
									turpis lacinia. Diam pulvinar tellus leo et
									faucibus sed magna. Consequat massa.
								</p>
							</div>
							<div className="col-lg-1" />
						</div>
						<div className="table-responsive h-100 mt-2">
							<TableDiv className="table mb-0">
								<thead>
									<tr>
										<th>Items Picked</th>
										<th>Unit</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Classic T-Shirt</td>
										<td>15</td>
										<td>₦15,000</td>
									</tr>
									<tr>
										<td>Classic T-Shirt</td>
										<td>15</td>
										<td>₦15,000</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td>Total</td>
										<td>30</td>
										<td>₦30,000</td>
									</tr>
								</tfoot>
							</TableDiv>
						</div>
						<TotalBox className="mt-3">
							<div>
								<span>Discount Amount</span>
								<strong>₦10,000</strong>
							</div>
							<div>
								<span>VAT Amount</span>
								<strong>₦100</strong>
							</div>
							<div>
								<span>Discounted Total Sales</span>
								<strong>₦200,000</strong>
							</div>
							<div>
								<span>Actual Amount Paid</span>
								<strong>₦190,000</strong>
							</div>
						</TotalBox>
						<div className="col-lg-6 mt-3">
							<FlexBetween
								style={{
									background: "#000",
									padding: "10px",
									color: "#FFF",
									fontSize: "0.9rem",
									borderRadius: "10px",
								}}
							>
								<span>SMS</span>
								<strong
									style={{ color: "rgba(255, 199, 39, 1)" }}
								>
									SMS Sent
								</strong>
							</FlexBetween>
						</div>
						<BtnAttach>
							<GrDocumentOutlook />
							<span>View Attached Document</span>
							<button>
								<FaTrash color="red" />
							</button>
						</BtnAttach>
						<div className="mt-3 mb-3 row">
							<div className="col-12 mb-3">
								<Button
									name="Generate Sale Receipt"
									onClick={() => console.log("")}
									bg="rgba(2, 65, 255, 1)"
								/>
							</div>
							<div className="col-6">
								<Button
									name="Generate Sale Receipt"
									onClick={() => console.log("")}
								/>
							</div>
							<div className="col-6">
								<Button
									name="Generate Sale Receipt"
									onClick={() => console.log("")}
								/>
							</div>
						</div>
						<p
							style={{
								color: "rgba(190, 190, 190, 1)",
								fontSize: "0.8rem",
								fontWeight: "bold",
								margin: "0",
							}}
						>
							Transaction History
						</p>
						<div className="table-responsive h-100 mt-2">
							<TableDiv className="table mb-0">
								<thead>
									<tr>
										<th>Amount</th>
										<th>Type</th>
										<th>Date Made</th>
										<th>Made By</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>₦15,000</td>
										<td>Sale</td>
										<td>Aug 13th 2025 | 11:11AM</td>
										<td>Taiwo</td>
									</tr>
								</tbody>
							</TableDiv>
						</div>
						<SyncTable>
							<div className="head failed">
								Sync Failed - Demo Section
							</div>
							<div className="bdy">
								<div>
									<span>Sync Failed</span>
									<p>
										<b>Last attempt:</b> 12/06/2023, 10:35
										AM
									</p>
								</div>
								<div>
									<b>Hybrid Transaction ID</b>28738478599832
								</div>
							</div>
							<button>
								<FiRefreshCcw />
								<span>Retry Sync</span>
							</button>
						</SyncTable>
					</CardBox>
				</div>
			</div>
		</SalesDetailsStyles>
	);
};

export default SalesDetails;
