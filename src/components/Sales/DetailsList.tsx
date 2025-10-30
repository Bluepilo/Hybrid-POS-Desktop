import { FiPlus } from "react-icons/fi";
import { BoxList, FlexBetween } from "../../styles/basic.styles";
import { fetchAllSales } from "../../utils/db/dbFetch";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { numberWithCommas } from "../../utils/currency";
import dateFormat from "dateformat";

const DetailsList = () => {
	const navigate = useNavigate();

	const params = useParams();

	const [list, setList] = useState<any>([]);

	useEffect(() => {
		listSales();
	}, []);

	const listSales = async () => {
		try {
			let res = await fetchAllSales({});
			if (Array.isArray(res?.data)) {
				setList(res.data);
			}
		} catch (err) {
			console.log(err, "err");
		}
	};

	return (
		<>
			<div className="head">
				<h6>All Sales Receipts</h6>
				<button>
					<FiPlus />
				</button>
			</div>
			<div className="body-content">
				{list.map((li: any) => (
					<BoxList
						key={li.id}
						className={li.hybridRef === params?.id ? "active" : ""}
						onClick={() => navigate(`/app/sales/${li.hybridRef}`)}
					>
						<span className="check" />
						<div className="content">
							<FlexBetween>
								<h6>{li.actorName}</h6>
								<h6>₦{numberWithCommas(li.amountPaid)}</h6>
							</FlexBetween>
							<div className="d-flex">
								<span>{li.hybridRef?.toUpperCase()}</span>
								<span className="ms-2">
									{dateFormat(li.createdAt, "mmm dd, yyyy")}
								</span>
							</div>
							<span className="status">Pending</span>
						</div>
					</BoxList>
				))}
			</div>
		</>
	);
};

export default DetailsList;
