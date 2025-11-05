import { useEffect, useState } from "react";
import Paginate from "../../../components/Paginate";
import SalesFilter from "../../../components/Sales/SalesFilter";
import Stats from "../../../components/Sales/Stats";
import { PosTitleSearch } from "../../../styles/pos.styles";
import SalesSummaryView from "../../../components/Sales/SalesSummaryView";
import { fetchAllSales, getSalesProducts } from "../../../utils/db/dbFetch";
import SalesDetailsView from "../../../components/Sales/SalesDetailsView";
import appService from "../../../redux/app/appService";
import { updateSaleSyncStatus } from "../../../utils/db/dbUpdate";
import { displayError } from "../../../utils/display";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { reduceSync } from "../../../redux/app/appSlice";

const Sales = () => {
	const dispatch = useAppDispatch();

	const { user } = useAppSelector((state) => state.auth);

	const [viewType, setViewType] = useState("details");
	const [vlist, setvList] = useState<any>({});
	const [dlist, setdList] = useState<any>({});

	useEffect(() => {
		listSales();
		listVSales();
	}, []);

	useEffect(() => {
		syncAllSales();
	}, [vlist]);

	const listSales = async () => {
		try {
			let res = await getSalesProducts({});
			setdList(res);
		} catch (err) {
			console.log(err, "err");
		}
	};

	const listVSales = async () => {
		try {
			let res = await fetchAllSales({});
			setvList(res);
		} catch (err) {
			console.log(err, "err");
		}
	};

	const syncAllSales = async () => {
		if (vlist?.data?.length > 0) {
			const promises = vlist.data.map(async (sale: any) => {
				if (sale.syncStatus !== "success" && user.id == sale.userId) {
					try {
						await appService.makeSale(sale);
						await updateSaleSyncStatus(sale.id, "success");
						dispatch(reduceSync());
					} catch (err) {
						let msg = displayError(err, false);
						await updateSaleSyncStatus(sale.id, "failed", msg);
					}
				} else {
					console.log(
						"Cannot Proceed",
						sale.syncStatus !== "success"
					);
				}
			});

			await Promise.allSettled(promises);

			listSales();
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
