import styled from "styled-components";

export const PosTitleSearch = styled.div`
	.title {
		display: flex;
		align-items: center;
		color: rgba(102, 102, 102, 1);

		h1 {
			margin: 0;
			padding: 0;
			font-weight: normal;
			font-size: 1.8rem;
		}

		select {
			border: 1px solid rgba(190, 190, 190, 1);
			background: #fff;
			outline: 0;
			height: 35px;
			margin: 0 10px;
			box-shadow: none;
			font-size: 1rem;
			border-radius: 15px;
			padding-left: 10px;
			padding-right: 10px;
			color: rgba(102, 102, 102, 1);
			width: max-content;
		}

		span {
			background: rgba(215, 215, 215, 1);
			color: #000d33;
			padding: 2px 16px;
			margin-left: 10px;
			border-radius: 10px;
			font-weight: 600;
		}
	}
`;

export const ScanBtn = styled.button`
	border: 1px solid #fff;
	background: rgba(38, 50, 56, 1);
	color: #fff;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 8px 0px;
	border-radius: 10px;
	width: 100%;
	font-size: 0.85rem;

	span {
		margin-left: 10px;
	}
`;

export const SearchBtn = styled.div`
	margin-top: 20px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.input {
		width: 75%;
		position: relative;

		svg {
			position: absolute;
			top: 12px;
			left: 10px;
		}
	}
	input {
		width: 100%;
		border: 1px solid rgba(190, 190, 190, 1);
		outline: 0;
		height: 40px;
		padding-left: 40px;
		border-radius: 10px;
	}

	button {
		border: 1px solid #fff;
		background: rgba(38, 50, 56, 1);
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 8px 0px;
		border-radius: 10px;
		width: 22%;
		font-size: 0.85rem;

		span {
			margin-left: 10px;
		}
	}
`;

export const ProductStyle = styled.div`
	border: 1px solid rgba(102, 102, 102, 1);
	padding: 10px;
	margin-bottom: 20px;
	border-radius: 20px;
	/* height: 100%; */

	cursor: pointer;

	.img {
		position: relative;

		img {
			width: 100%;
			height: 120px;
			border-radius: 4px;
		}

		span {
			position: absolute;
			top: 5px;
			left: 5px;
			color: rgba(76, 175, 80, 1);
			background: #fff;
			padding: 4px 8px;
			border-radius: 5px;
			font-size: 0.8rem;
			border: 1px solid rgba(0, 0, 0, 0.2);
		}
	}

	.content {
		padding: 10px 0;

		h6,
		h5 {
			margin: 0;
			padding: 0;
		}

		.status {
			display: inline-block;
			color: rgba(76, 175, 80, 1);
			background: rgba(76, 175, 80, 0.1);
			font-size: 0.7rem;
			padding: 4px 10px;
			border-radius: 3px;
			margin-bottom: 10px;
		}
		h6 {
			color: #000;
			margin-top: 10px;
			font-size: 1rem;
		}
		h5 {
			font-size: 1rem;
			font-weight: normal;
		}
	}
`;

export const BodyScroll = styled.div`
	flex: 1; /* grow to fill remaining height */
	overflow-y: auto; /* allow vertical scrolling */
	overflow-x: hidden; /* prevent sideways scroll */
	max-height: 70dvh; /* ensure it doesn’t exceed */
	padding-right: 6px;
`;

export const DisplayType = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	.display {
		display: flex;

		button {
			color: rgba(0, 13, 51, 1);
			border: 1px solid rgba(0, 13, 51, 1);
			background: none;
			width: 80px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.9rem;
			font-weight: 600;
			padding: 6px 0;

			svg {
				margin-right: 5px;
			}

			&:first-child {
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
			}

			&:last-child {
				border-top-right-radius: 10px;
				border-bottom-right-radius: 10px;
			}

			&.active {
				background: rgba(0, 13, 51, 1);
				color: #fff;
			}
		}
	}
	.select {
		display: flex;
		align-items: center;

		span {
			font-size: 0.8rem;
			margin-right: 10px;
		}

		select {
			background: rgba(0, 13, 51, 1);
			color: #fff;
			font-size: 0.8rem;
			height: 40px;
			border-radius: 15px;
			outline: 0;
			width: 100px;
			padding-left: 5px;
		}
	}
`;

export const CartDisplay = styled.div`
	margin-top: 20px;
	height: 100%;

	.cart {
		max-height: 60vh;
		border: 1px solid rgba(190, 190, 190, 1);
		padding: 10px;
		border-radius: 20px;
		position: relative;
		display: flex;
		flex-direction: column;

		.items {
			flex: 1;
			overflow-y: auto;
			padding-bottom: 100px;
		}

		.bttm-pos {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			z-index: 991;
			background: #000;
			border-bottom-right-radius: 20px;
			border-bottom-left-radius: 20px;

			.yellow {
				background: rgba(255, 199, 39, 1);
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px;

				span,
				strong {
					font-size: 0.75rem;
				}

				span {
					margin-right: 15px;
				}

				div {
					display: flex;
					align-items: center;
				}
			}
			.dark {
				display: flex;
				align-items: center;
				padding: 10px 10px;
				justify-content: center;
				color: #fff;

				span {
					font-size: 0.75rem;
				}

				strong {
					font-size: 1.5rem;
					color: rgba(255, 199, 39, 1);
					margin-left: 20px;
				}
			}
		}
	}
`;

export const CartItem = styled.div`
	border: 1px solid rgba(190, 190, 190, 1);
	padding: 10px;
	border-radius: 20px;
	margin-bottom: 15px;

	.top-details,
	.btm-details {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.top-details {
		div {
			display: flex;
			align-items: center;
		}

		h6 {
			font-weight: bold;
			color: rgba(0, 13, 51, 1);
			font-size: 0.9rem;
			margin: 0;
			padding: 0;
		}
		input {
			outline: 0;
			width: 30px;
			text-align: center;
			margin: 0 5px;
			border: 0;
		}
		button {
			background: none;
			outline: 0;
			border: 0;
			margin: 0;
			padding: 0;

			&:last-child {
				margin-left: 20px;
			}
		}
	}

	.btm-details {
		margin-top: 20px;
		h6,
		p {
			margin: 0;
			padding: 0;
		}
		p {
			font-size: 0.8rem;
			color: rgba(190, 190, 190, 1);
		}
		h6 {
			font-weight: normal;
			color: rgba(0, 13, 51, 1);
			font-size: 1.2rem;
		}
	}
`;

export const VatBtn = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	select {
		border: 1px solid rgba(190, 190, 190, 1);
		background: #fff;
		outline: 0;
		height: 30px;
		border-radius: 20px;
		padding-left: 5px;
	}

	span {
		margin-right: 10px;
		font-size: 0.85rem;
	}

	button {
		background: #000d33;
		color: #fff;
		width: 60%;
		padding: 12px;
		outline: 0;
		border: 0;
		border-radius: 20px;

		&:disabled {
			background: rgba(190, 190, 190, 1);
		}
	}
`;

export const CartQty = styled.div`
	display: flex;
	align-items: center;

	input {
		outline: 0;
		width: 30px;
		text-align: center;
		margin: 0 5px;
		border: 0;
	}
	button {
		background: none;
		outline: 0;
		border: 0;
		margin: 0;
		padding: 0;
	}
`;

export const CartDiscount = styled.div`
	display: flex;
	align-items: center;

	input {
		width: 50px;
		border: 1px solid rgba(217, 219, 233, 1);
		background: rgba(245, 245, 245, 1);
		text-align: center;
		height: 28px;
		margin-left: 10px;
		border-radius: 5px;
		outline: 0;
	}

	button {
		height: 28px;
		border: 1px solid rgba(217, 219, 233, 1);
		background: rgba(245, 245, 245, 1);
		border-radius: 5px;
	}

	span.em {
		color: rgba(190, 190, 190, 1);
		margin-right: 10px;
		font-size: 0.75rem;
	}
`;

export const CartTotal = styled.div`
	position: sticky;
	bottom: 0;
	background: #fff;
	z-index: 91;
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.total {
		background: #000d33;
		color: #fff;
		width: 70%;
		padding: 20px 20px;
		border-radius: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.85rem;

		div {
			display: flex;
			align-items: center;

			span {
				margin-right: 10px;
			}

			select {
				background: transparent;
				color: #fff;
				width: 60px;
				border-radius: 15px;
				height: 40px;
				border: 1px solid #fff;
				text-align: center;
			}
		}
	}
	.button {
		display: flex;
		align-items: flex-end;

		button {
			background: #000d33;
			color: #fff;
			padding: 12px 40px;
			outline: 0;
			border: 0;
			border-radius: 20px;

			&:disabled {
				background: rgba(190, 190, 190, 1);
			}
		}
	}
`;

export const SelectedCustomerStyle = styled.div`
	h5,
	p,
	h6 {
		padding: 0;
		margin: 0;
	}

	.box1 {
		background: #000;
		border-radius: 20px;
		display: flex;
		justify-content: space-between;

		.first,
		.second {
			padding: 12px 20px;
			width: 50%;
		}

		.first {
			p {
				color: #fff;
				font-size: 1rem;
			}
			p:last-child {
				color: rgba(255, 199, 39, 1);
			}
		}

		.second {
			background: rgba(255, 199, 39, 1);
			border-radius: 20px;
			padding: 20px;
			display: flex;
			align-items: center;

			span {
				font-size: 0.85rem;
				margin-right: 20px;
			}
			h5 {
				font-weight: bold;
			}
		}
	}

	.box2 {
		background: rgba(255, 199, 39, 1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #000;
		padding: 12px 20px;
		border-radius: 20px;

		p {
			font-size: 0.7rem;
		}
	}
`;

export const ViewTotal = styled.div`
	border: 1.5px solid #000;
	padding: 20px;
	border-radius: 20px;
	display: flex;
	align-items: center;

	h5,
	h6 {
		padding: 0;
		margin: 0;
		color: #000;
	}

	h6 {
		width: 150px;
		font-size: 0.9rem;
	}

	h5 {
		font-weight: bolder;
	}

	input {
		border: 0;
		outline: 0;
		color: #000;
		font-size: 1.3rem;
	}
`;
