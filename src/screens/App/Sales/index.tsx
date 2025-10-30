import { useEffect, useState } from "react";
import Paginate from "../../../components/Paginate";
import SalesFilter from "../../../components/Sales/SalesFilter";
import Stats from "../../../components/Sales/Stats";
import { PosTitleSearch } from "../../../styles/pos.styles";
import SalesSummaryView from "../../../components/Sales/SalesSummaryView";
import { fetchAllSales, getSalesProducts } from "../../../utils/db/dbFetch";
import SalesDetailsView from "../../../components/Sales/SalesDetailsView";

const Sales = () => {
	const [viewType, setViewType] = useState("details");
	const [vlist, setvList] = useState<any>({});
	const [dlist, setdList] = useState<any>({});

	useEffect(() => {
		listSales();
	}, [viewType]);

	const listSales = async () => {
		try {
			if (viewType === "details") {
				let res = await getSalesProducts({});
				setdList(res);
			} else {
				let res = await fetchAllSales({});
				setvList(res);
			}
		} catch (err) {
			console.log(err, "err");
		}
	};

	return (
		<div className="d-flex flex-column h-100">
			<PosTitleSearch className="mt-3">
				<div className="title">
					<h1>Sales Record</h1>
					<span>
						{viewType === "details" ? dlist?.total : vlist?.total}
					</span>
					<select
						value={viewType}
						onChange={(e) => setViewType(e.target.value)}
					>
						<option value={"details"}>Detail View</option>
						<option value={"summary"}>Summary View</option>
					</select>
				</div>
			</PosTitleSearch>
			<Stats />
			<SalesFilter />
			{viewType === "details" ? (
				<SalesDetailsView list={dlist} />
			) : (
				<SalesSummaryView list={vlist} />
			)}
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
