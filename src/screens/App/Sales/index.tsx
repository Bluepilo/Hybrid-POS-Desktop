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
	const [limit, setLimit] = useState(100);
	const [page, setPage] = useState(1);

	// Filters
	const [dateType, setDateType] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [syncStatus, setSyncStatus] = useState("");
	const [customerType, setCustomerType] = useState("");

	useEffect(() => {
		listSales();
		listVSales(true);
	}, [limit, page, startDate, endDate, customerType, syncStatus]);

	const listSales = async () => {
		try {
			let res = await getSalesProducts({
				limit,
				page,
				startDate,
				endDate,
				syncStatus,
			});
			setdList(res);
		} catch (err) {}
	};

	const listVSales = async (load?: boolean) => {
		try {
			let res = await fetchAllSales({
				limit,
				page,
				startDate,
				endDate,
				isSubdealer: customerType,
				syncStatus,
			});
			setvList(res);
			if (load) {
				syncAllSales(res);
			}
		} catch (err) {}
	};

	const syncAllSales = async (salesVals: any) => {
		if (salesVals?.data?.length > 0) {
			const promises = salesVals.data.map(async (sale: any) => {
				if (sale.syncStatus !== "success" && user.id == sale.userId) {
					try {
						let payload = {
							shopId: sale.shopId,
							status: sale.status || "complete",
							subdealerId: sale.isSubdealer ? sale.actorId : "",
							customerId: !sale.isSubdealer ? sale.actorId : "",
							paymentMethodId: sale.paymentMethodId,
							amountPaid: sale.amountPaid,
							transactionAt: sale.createdAt,
							fileUrl: sale.fileUrl,
							products: sale.products.map((p: any) => {
								return {
									id: p.productId,
									name: p.name,
									quantity: p.quantity,
									price: Number(p.price),
									discount:
										p.discountType === "currency"
											? p.discount
											: (Number(p.discount || 0) / 100) *
												(p.price * p.quantity),
								};
							}),
							comment: sale.comment,
							reference: sale.reference,
							hybridAppLoggedAt: sale.createdAt,
						};
						await appService.makeSale(payload);
						await updateSaleSyncStatus(sale.id, "success");
						dispatch(reduceSync());
					} catch (err) {
						let msg = displayError(err, false);
						await updateSaleSyncStatus(sale.id, "failed", msg);
					}
				}
			});

			await Promise.allSettled(promises);

			// listVSales(false);
			// listSales();
		}
	};

	const clearFilter = () => {
		setStartDate("");
		setEndDate("");
		setDateType("");
		setCustomerType("");
		setSyncStatus("");
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
			<Stats list={vlist} />
			<SalesFilter
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
				syncStatus={syncStatus}
				setSyncStatus={setSyncStatus}
				customerType={customerType}
				setCustomerType={setCustomerType}
				dateType={dateType}
				setDateType={setDateType}
				onClear={clearFilter}
				view={viewType}
			/>
			{viewType === "details" ? (
				<SalesDetailsView list={dlist} />
			) : (
				<SalesSummaryView list={vlist} />
			)}
			<Paginate
				changeLimit={(l) => setLimit(l)}
				limit={limit}
				count={
					viewType === "details"
						? dlist?.total || 50
						: vlist?.total || 50
				}
				pageNumber={page}
				onSelect={(l) => setPage(l)}
			/>
		</div>
	);
};

export default Sales;
