import { ButtonClick } from "../styles/form.styles";

const Button = ({
	load,
	name,
	disabled,
	bg,
	border,
	color,
	onClick,
	type,
	icon,
}: {
	load?: boolean;
	name: string;
	disabled?: boolean;
	bg?: string;
	border?: string;
	color?: string;
	onClick: () => void;
	type?: "button" | "reset" | "submit";
	icon?: any;
}) => {
	return (
		<ButtonClick
			onClick={onClick}
			disabled={disabled}
			style={{
				background: bg || "",
				border: `1px solid ${border || ""}`,
				color: color || "#FFF",
			}}
			type={type}
		>
			{icon && icon}
			{load && (
				// <Spinner
				// 	animation="border"
				// 	color={color || "#FFF"}
				// 	style={{ marginRight: "10px" }}
				// 	size="sm"
				// />
				<></>
			)}
			<span>{name}</span>
		</ButtonClick>
	);
};

export default Button;
