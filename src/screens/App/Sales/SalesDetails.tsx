import { FaArrowLeft, FaCaretRight, FaTrash } from "react-icons/fa";
import DetailsList from "../../../components/Sales/DetailsList";
import {
	BtnAttach,
	CardBox,
	SalesDetailsStyles,
	SalesInfo,
	Status,
	SyncTable,
	TotalBox,
} from "../../../styles/basic.styles";
import { FiDownload, FiRefreshCcw } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { GrDocumentOutlook } from "react-icons/gr";
import { useEffect, useState } from "react";
import { formatCurrency, numberWithCommas } from "../../../utils/currency";
import { useAppSelector } from "../../../utils/hooks";
import dateFormat from "dateformat";
import { displayError } from "../../../utils/display";
import { getSaleByUniqueRef } from "../../../utils/db/dbFetch";
import UnsyncedSaleItems from "../../../components/Sales/UnsyncedSaleItems";
import SyncedSaleItems from "../../../components/Sales/SyncedSaleItems";

const SalesDetails = () => {
	const navigate = useNavigate();

	const params = useParams();

	const [details, setDetails] = useState<any>({});

	const { shopInfo } = useAppSelector((state) => state.auth);

	useEffect(() => {
		fetchDetails();
	}, [params]);

	const fetchDetails = async () => {
		try {
			if (params?.id) {
				let res = await getSaleByUniqueRef(params.id);
				if (res?.id) {
					setDetails(res);
				}
			}
		} catch (err) {
			displayError(err, true);
		}
	};

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
						<span className="ms-2">
							{params?.id?.toUpperCase()}
						</span>
					</div>
					<div className="button">
						<button>
							<FiDownload />
							<span>Download (1)</span>
						</button>
					</div>
				</div>
				{details?.id && (
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
									<h6>{details.actor?.name}</h6>
									<p>{details.actor?.phone || "--"}</p>
									<p>{details.actor?.email || "--"}</p>
								</div>
							</div>
							<div className="wallet">
								<div>
									<span>Total in Wallets:</span>
									<strong>
										{shopInfo?.currency}
										{numberWithCommas(
											details.actor.balance,
										)}
									</strong>
								</div>
								<div>
									<span>Credit Limit:</span>
									<strong>
										{shopInfo?.currency}
										{numberWithCommas(
											details.actor.creditLimit,
										)}
									</strong>
								</div>
							</div>
						</SalesInfo>
						<CardBox className="shadow-sm mt-3">
							<h5>Sale {details.uniqueRef}</h5>
							<Status>{details.status}</Status>
							<div
								className="row mt-3"
								style={{ color: "#666", fontSize: "0.85rem" }}
							>
								<div className="col-lg-4">
									<div>
										<strong>Date</strong>
										<span className="ms-2">
											{dateFormat(
												details.createdAt,
												"mmm dd, yyyy | h:MM TT",
											)}
										</span>
									</div>
									<div className="mt-1">
										<strong>Hybrid Ref</strong>
										<span className="ms-2">
											{details.hybridRef}
										</span>
									</div>
									<div className="mt-1">
										<strong>Reference ID</strong>
										<span className="ms-2">
											{details.reference || "---"}
										</span>
									</div>
									<div className="mt-1">
										<strong>Logged By</strong>
										<span className="ms-2">
											{details.userName}
										</span>
									</div>
									<div className="mt-1">
										<strong>Shop</strong>
										<span className="ms-2">
											{shopInfo?.name}
										</span>
									</div>
								</div>
								<div className="col-lg-3" />
								<div className="col-lg-4">
									<h6>Notes</h6>
									<p>
										{details.comment || "No Notes saved."}
									</p>
								</div>
								<div className="col-lg-1" />
							</div>
							<div className="table-responsive h-100 mt-2">
								{details.products[0]?.costPrice ? (
									<SyncedSaleItems data={details.products} />
								) : (
									<UnsyncedSaleItems
										data={details.products}
									/>
								)}
							</div>
							<TotalBox className="mt-3">
								{details.products[0]?.costPrice ? (
									<>
										<div>
											<span>Gross Sales Amount</span>
											<strong>
												{shopInfo?.currency}
												{formatCurrency(
													details.products?.reduce(
														(a: any, b: any) =>
															a + b.grossAmount,
														0,
													),
												)}
											</strong>
										</div>
										<div>
											<span>Account Receivables</span>
											<strong>
												{shopInfo?.currency}
												{formatCurrency(
													details.products?.reduce(
														(a: any, b: any) =>
															a +
															b.recievableAmount,
														0,
													),
												)}
											</strong>
										</div>
									</>
								) : (
									<div>
										<span>Amount Paid</span>
										<strong>
											{shopInfo?.currency}
											{formatCurrency(details.amountPaid)}
										</strong>
									</div>
								)}
							</TotalBox>

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
										name="Clone Sale List"
										onClick={() => console.log("")}
										bg="#FFF"
										color="rgba(2, 65, 255, 1)"
										border="rgba(2, 65, 255, 1)"
									/>
								</div>
								<div className="col-6">
									<Button
										name="Withdraw Sales"
										onClick={() => console.log("")}
										bg="#FFF"
										border="rgba(255, 0, 0, 1)"
										color="rgba(255, 0, 0, 1)"
									/>
								</div>
							</div>
							<SyncTable>
								<div className={`head ${details.syncStatus}`}>
									Sync {details.syncStatus} -{" "}
									{details?.syncFailed || ""}
								</div>
								<div className="bdy">
									<div>
										<span
											style={{
												textTransform: "capitalize",
											}}
										>
											Sync {details.syncStatus}
										</span>
										<p>
											<b>Last attempt:</b>{" "}
											{dateFormat(
												details.updatedAt,
												"mmm dd, yyyy | h:MM TT",
											)}
										</p>
									</div>
									<div>
										<b>Hybrid Transaction ID: {"  "}</b>
										{details.hybridRef}
									</div>
								</div>
								{details.syncStatus !== "success" && (
									<button>
										<FiRefreshCcw />
										<span>Retry Sync</span>
									</button>
								)}
							</SyncTable>
						</CardBox>
					</div>
				)}
			</div>
		</SalesDetailsStyles>
	);
};

export default SalesDetails;
