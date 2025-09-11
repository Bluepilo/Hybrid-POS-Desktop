import React from "react";
import { Backdrop, DrawerStyles } from "../styles/basic.styles";

const Drawer = ({
	children,
	open,
	onClose,
	width,
}: {
	children: React.ReactNode;
	open: boolean;
	onClose: () => void;
	title: string;
	width?: number;
}) => {
	return (
		<>
			<Backdrop $open={open} onClick={onClose} />
			<DrawerStyles $open={open} width={width}>
				{children}
			</DrawerStyles>
		</>
	);
};

export default Drawer;
