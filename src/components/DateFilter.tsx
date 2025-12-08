import InputField from "./InputField";
import SelectField from "./SelectField";

const DateFilter = ({
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	dateType,
	setDateType,
	singleLine,
	label,
}: {
	startDate: any;
	setStartDate: (arg: any) => void;
	endDate: any;
	setEndDate: (arg: any) => void;
	dateType: any;
	setDateType: (arg: any) => void;
	singleLine?: boolean;
	label?: string;
}) => {
	const changeDateType = (val: any) => {
		setDateType(val);
		if (val === "month") {
			setStartDate(
				new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					1
				).toISOString()
			);
			setEndDate(
				new Date(
					new Date().setDate(new Date().getDate() + 1)
				).toISOString()
			);
		} else if (val === "today") {
			let start = new Date();
			start.setUTCHours(0, 0, 0, 0);

			let end = new Date();
			end.setUTCHours(23, 59, 59, 999);
			setStartDate(start.toISOString());
			setEndDate(end.toISOString());
		} else if (val === "week") {
			let curr = new Date();
			let firstday = new Date(
				curr.setDate(curr.getDate() - curr.getDay())
			);
			let lastday = new Date(
				curr.setDate(curr.getDate() - curr.getDay() + 6)
			);
			setStartDate(firstday.toISOString());
			setEndDate(lastday.toISOString());
		} else if (val === "lweek") {
			let curr = new Date();
			let firstday = new Date(
				curr.setDate(curr.getDate() - curr.getDay())
			);
			let lastday = new Date(
				curr.setDate(curr.getDate() - curr.getDay() + 6)
			);
			setStartDate(
				new Date(firstday.setDate(firstday.getDate() - 7)).toISOString()
			);
			setEndDate(
				new Date(lastday.setDate(lastday.getDate() - 7)).toISOString()
			);
		} else if (val === "lmonth") {
			const now = new Date();
			const startOfMonth = new Date(
				now.getFullYear(),
				now.getMonth() - 1,
				1
			);
			const endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
			setStartDate(startOfMonth.toISOString());
			setEndDate(endOfMonth.toISOString());
		} else if (val === "year") {
			const firstDateOfYear = new Date(new Date().getFullYear(), 0, 1);
			setStartDate(firstDateOfYear.toISOString());
			setEndDate(new Date().toISOString());
		} else if (val === "lyear") {
			const now = new Date();
			const startOfPreviousYear = new Date(now.getFullYear() - 1, 0, 1);
			const endOfPreviousYear = new Date(now.getFullYear() - 1, 11, 31);
			setStartDate(startOfPreviousYear.toISOString());
			setEndDate(endOfPreviousYear.toISOString());
		}
	};
	return (
		<>
			<div>
				<SelectField
					options={[
						{
							label: "Today",
							value: "today",
						},
						{
							label: "This Week",
							value: "week",
						},
						{
							label: "Last Week",
							value: "lweek",
						},
						{
							label: "This Month",
							value: "month",
						},
						{
							label: "Last Month",
							value: "lmonth",
						},
						{
							label: "This Year",
							value: "year",
						},
						{
							label: "Last Year",
							value: "lyear",
						},
						// {
						// 	label: "Custom Date",
						// 	value: "custom",
						// },
					]}
					value={dateType}
					setValue={changeDateType}
					label={label || "Date Type"}
					noMargin
				/>
			</div>
			{dateType === "custom" && (
				<div className="row">
					<div
						className={
							singleLine ? "mb-3" : "col-lg-2 col-md-4 col-6 mb-3"
						}
					>
						<InputField
							inputType="date"
							label="Start Date"
							value={startDate}
							setValue={setStartDate}
						/>
					</div>

					<div
						className={
							singleLine ? "mb-3" : "col-lg-2 col-md-4 col-6 mb-3"
						}
					>
						<InputField
							inputType="date"
							label="End Date"
							value={endDate}
							setValue={(arg: any) =>
								setEndDate(
									new Date(arg.setHours(23, 59, 59, 999))
								)
							}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default DateFilter;
