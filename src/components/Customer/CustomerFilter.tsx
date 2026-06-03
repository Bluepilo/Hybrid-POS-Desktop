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
				<div className="col-lg-2 col-md-3 col-4">
					<InputField
						inputType="select"
						value={customerType}
						setValue={setCustomerType}
						noMargin
						options={[
							{ label: "Individual (B2C)", value: "customer" },
							{ label: "Company (B2B)", value: "business" },
						]}
					/>
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
