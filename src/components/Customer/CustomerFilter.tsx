import { useState } from "react";
import InputField from "../InputField";

const CustomerFilter = ({
	customerType,
	setCustomerType,
}: {
	customerType: string;
	setCustomerType: (arg: string) => void;
}) => {
	const [dateType, setDateType] = useState("");

	return (
		<>
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
						value={customerType}
						setValue={setCustomerType}
						placeholder="Customer Type"
						noMargin
						options={[
							{ label: "Walk-In", value: "customer" },
							{ label: "Subdealer", value: "subdealer" },
						]}
					/>
				</div>
				<div className="col-lg-1 col-md-3 col-4">
					<InputField
						inputType="select"
						value={dateType}
						setValue={setDateType}
						placeholder="Sync Status"
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
				<div className="col-lg-4">
					<InputField
						value={dateType}
						setValue={setDateType}
						inputType="text"
						placeholder="Search Name"
						noMargin
					/>
				</div>
			</div>
		</>
	);
};

export default CustomerFilter;
