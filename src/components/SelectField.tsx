import Select from "react-select";

const SelectField = ({
	noMargin,
	options,
	value,
	setValue,
	label,
	addLabel,
	placeholder,
}: {
	noMargin?: boolean;
	options: {
		value: string | number;
		label: string;
		isActive?: boolean;
		id?: number;
	}[];
	value: string;
	setValue: (arg: any) => void;
	label?: string;
	addLabel?: boolean;
	placeholder?: string;
}) => {
	const customStyles = {
		control: (base: any, state: any) => ({
			...base,
			background: "#FFF",
			border: "1px solid #66666659",
			height: "45px",
			width: "100%",
			fontSize: "0.9rem",
			borderRadius: "10px",
			boxShadow: state.isFocused ? 0 : 0,
		}),
		placeholder: (base: any) => ({
			...base,
			color: "#333",
			fontSize: "0.9rem",
		}),
		menu: (base: any) => ({
			...base,
			color: "#333",
			fontSize: "0.9rem",
		}),
		singleValue: (base: any) => ({
			...base,
			color: "#666",
			fontSize: "0.9rem",
		}),
	};

	const selectedOption = options.find((opt) => opt.value === value) || null;

	return (
		<div style={{ marginBottom: noMargin ? "0" : "20px" }}>
			<div className="label" style={{ marginBottom: "4px" }}>
				{label && (
					<label style={{ color: "#666", fontSize: "0.8rem" }}>
						{label}{" "}
						{addLabel && (
							<span style={{ color: "red", marginLeft: "5px" }}>
								*
							</span>
						)}{" "}
					</label>
				)}
			</div>
			<Select
				options={options}
				styles={customStyles}
				placeholder={placeholder || `Select`}
				onChange={(option: any) => {
					setValue(option ? option.value : null);
				}}
				value={selectedOption}
			/>
		</div>
	);
};

export default SelectField;
