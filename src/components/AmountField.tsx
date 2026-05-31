import CurrencyInput from "react-currency-input-field";
import { useAppSelector } from "../utils/hooks";
import { InputContainer } from "../styles/form.styles";

const AmountField = ({
	value,
	setValue,
	label,
	noMargin,
	required,
	addLabel,
	disabled,
	placeholder,
	noCurrency,
}: {
	value: any;
	setValue: (arg: any) => void;
	label?: string;
	addLabel?: boolean;
	noMargin?: boolean;
	required?: boolean;
	disabled?: boolean;
	placeholder?: string;
	noCurrency?: true;
}) => {
	const { shopInfo } = useAppSelector((state) => state.auth);

	return (
		<InputContainer style={{ marginBottom: noMargin ? "0" : "20px" }}>
			{label && (
				<div className="label">
					<label>
						{label}{" "}
						{addLabel && (
							<span style={{ color: "red", marginLeft: "5px" }}>
								*
							</span>
						)}{" "}
					</label>
				</div>
			)}
			<CurrencyInput
				id="input-example"
				name="input-name"
				className={noCurrency ? `no-pad` : ""}
				decimalsLimit={2}
				onValueChange={setValue}
				prefix={`${noCurrency ? "" : shopInfo?.currency} `}
				value={value}
				disabled={disabled}
				required={required}
				placeholder={placeholder || ""}
				style={{ color: "#000" }}
			/>
		</InputContainer>
	);
};

export default AmountField;
