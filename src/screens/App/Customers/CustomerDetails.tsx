import { FaArrowLeft, FaCaretRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { SalesInfo, TableArea, TitleCrumb } from "../../../styles/basic.styles";
import { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import Icon from "../../../assets/images/money.svg";
import Button from "../../../components/Button";
import { IoWalletOutline } from "react-icons/io5";
import { TbDevicesDown } from "react-icons/tb";
import { TableDiv } from "../../../styles/table.styles";
import EachTransactionReport from "../../../components/List/EachTransactionReport";
import Paginate from "../../../components/Paginate";
import { getInitials } from "../../../utils/data";
import { useAppSelector } from "../../../utils/hooks";
import { formatCurrency } from "../../../utils/currency";
const CustomerDetails = () => {
	const navigate = useNavigate();

	const stateInfo = useLocation()?.state;

	const { shopInfo } = useAppSelector((state) => state.auth);

	const [dateType, setDateType] = useState("");
	const [details, setDetails] = useState<any>(null);

	useEffect(() => {
		if (stateInfo?.id) {
			setDetails(stateInfo);
		}
	}, [stateInfo]);

	return details?.id ? (
		<div className="d-flex flex-column h-100">
			<TitleCrumb>
				<h3>Walk-In Customer Wallet</h3>
				<div className="crumb">
					<button onClick={() => navigate(-1)}>
						<FaArrowLeft />
						<span>Back</span>
					</button>
					<b>Walk-In Customer</b>
					<FaCaretRight />
					<span className="ms-2">{details.name}</span>
				</div>
			</TitleCrumb>
			<div className="row mt-3">
				<div className="col-lg-1 col-md-3 col-4">
					<InputField
						inputType="select"
						value={dateType}
						setValue={setDateType}
						placeholder="Date Type"
						noMargin
					/>
				</div>
				<div className="col-lg-1 col-md-3 col-4">
					<InputField
						inputType="select"
						value={dateType}
						setValue={setDateType}
						placeholder="Customer Type"
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
			</div>
			<div className="row mt-3 align-items-center">
				<div className="col-lg-7">
					<SalesInfo className="shadow-sm mt-2 shade">
						<div className="first">
							<span>{getInitials(details.name)}</span>
							<div>
								<h6>{details.name}</h6>
								<p>{details.phone}</p>
								<p>{details.email}</p>
								<p>{details.address}</p>
							</div>
						</div>
						<div className="wallet">
							<div className="flx">
								<div className="img">
									<img src={Icon} />
								</div>
								<span>Total in Wallets:</span>
								<strong>
									{shopInfo?.currency}
									{formatCurrency(details.balance)}
								</strong>
							</div>
							<div className="flx">
								<div className="img">
									<img src={Icon} />
								</div>
								<span>Credit Limit:</span>
								<strong>
									{shopInfo?.currency}
									{formatCurrency(details.creditLimit)}
								</strong>
							</div>
						</div>
					</SalesInfo>
				</div>
				<div className="col-lg-3">
					<Button
						name="Make Payment"
						onClick={() => console.log("")}
						icon={<IoWalletOutline size={18} />}
						bg="#FFF"
						border="#000"
						color="#000"
					/>
					<div className="mt-3">
						<Button
							name="Withdraw Money"
							onClick={() => console.log("")}
							icon={<TbDevicesDown size={18} />}
							bg="#FFF"
							border="red"
							color="red"
						/>
					</div>
				</div>
			</div>
			<TableArea>
				<div className="table-responsive h-100">
					<TableDiv className="table mb-0">
						<thead>
							<tr>
								<th>Date</th>
								<th>Staff</th>
								<th>Transaction Type</th>
								<th>Credit</th>
								<th>Debit</th>
								<th>Running Balance</th>
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 0 }).map((_, i) => (
								<EachTransactionReport key={i} item={{}} />
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
	) : (
		<></>
	);
};

export default CustomerDetails;
