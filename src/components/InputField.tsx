import { InputContainer } from "../styles/form.styles";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputField = ({
	inputType,
	value,
	setValue,
	label,
	onClickPassword,
	noMargin,
	required,
	addLabel,
	disabled,
	placeholder,
	options,
	removeShowBtn,
}: {
	inputType: "text" | "number" | "password" | "email" | "select" | "tel";
	value: string;
	setValue: (arg: string) => void;
	label?: string;
	addLabel?: boolean;
	onClickPassword?: () => void;
	noMargin?: boolean;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	options?: { value: string; label: string }[];
	removeShowBtn?: boolean;
}) => {
	return (
		<InputContainer style={{ marginBottom: noMargin ? "0" : "20px" }}>
			<div className="label">
				{label && (
					<label>
						{label}{" "}
						{addLabel && (
							<span style={{ color: "red", marginLeft: "5px" }}>
								*
							</span>
						)}{" "}
					</label>
				)}
				{onClickPassword && (
					<button onClick={onClickPassword} type="button">
						{inputType === "password" ? (
							<FaRegEye />
						) : (
							<FaRegEyeSlash />
						)}
						{!removeShowBtn && (
							<span>
								{inputType === "password" ? "Show" : "Hide"}{" "}
							</span>
						)}
					</button>
				)}
			</div>
			{inputType === "select" ? (
				<select>
					<option value={""}>{placeholder || ""}</option>
					{options &&
						options.map((option) => (
							<option value={option.value}>{option.label}</option>
						))}
				</select>
			) : (
				<input
					type={inputType}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					required={required}
					disabled={disabled}
					placeholder={placeholder || ""}
				/>
			)}
		</InputContainer>
	);
};

export default InputField;
