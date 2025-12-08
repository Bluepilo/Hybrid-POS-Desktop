import DateFilter from "../DateFilter";
import SelectField from "../SelectField";

const SalesFilter = ({
	setEndDate,
	setStartDate,
	startDate,
	endDate,
	customerType,
	setCustomerType,
	syncStatus,
	setSyncStatus,
	dateType,
	setDateType,
	onClear,
	view,
}: {
	startDate: any;
	setStartDate: (arg: any) => void;
	endDate: any;
	setEndDate: (arg: any) => void;
	syncStatus: string;
	setSyncStatus: (arg: string) => void;
	customerType: string;
	setCustomerType: (arg: string) => void;
	dateType: string;
	setDateType: (arg: string) => void;
	onClear: () => void;
	view: string;
}) => {
	return (
		<>
			<div className="row">
				<div className="col-lg-2 col-md-3 col-4">
					<DateFilter
						startDate={startDate}
						setStartDate={setStartDate}
						endDate={endDate}
						setEndDate={setEndDate}
						dateType={dateType}
						setDateType={setDateType}
					/>
				</div>
				{view === "summary" && (
					<div className="col-lg-2 col-md-3 col-4">
						<SelectField
							value={customerType}
							setValue={setCustomerType}
							placeholder="Customer Type"
							noMargin
							label="Customer Type"
							options={[
								{ value: "", label: "Select" },
								{ value: "subdealer", label: "Subdealer" },
								{ value: "walkin", label: "Walk-In" },
							]}
						/>
					</div>
				)}
				<div className="col-lg-2 col-md-3 col-4">
					<SelectField
						value={syncStatus}
						setValue={setSyncStatus}
						placeholder="Sync Status"
						noMargin
						label="Sync Status"
						options={[
							{ value: "", label: "Select" },
							{ value: "success", label: "Successful" },
							{ value: "failed", label: "Failed" },
							{ value: "pending", label: "Pending" },
							{ value: "deleted", label: "Deleted" },
						]}
					/>
				</div>
				<div
					className="col-lg-2 col-md-3 col-4 align-self-end"
					onClick={onClear}
				>
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
		</>
	);
};

export default SalesFilter;
