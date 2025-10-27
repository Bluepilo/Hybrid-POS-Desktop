import styled from "styled-components";

export const AppContainer = styled.div`
	background: #fff;
	height: 100dvh;

	.main-content {
		position: relative;
		padding-top: 55px;
		height: 100%;
		padding-right: 20px;
		padding-left: 20px;
	}
`;

export const FlexBetween = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Backdrop = styled.div<{ $open: boolean }>`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.3);
	opacity: ${({ $open }) => ($open ? 1 : 0)};
	pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
	transition: opacity 0.3s ease;
	z-index: 998;
`;

export const DrawerStyles = styled.div<{ $open: boolean; width?: number }>`
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: ${({ width }) => (width ? `${width}px` : "320px")};
	background: #fff;
	box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
	transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
	transition: transform 0.3s ease;
	z-index: 99999993;
	display: flex;
	flex-direction: column;
`;

export const SideStyles = styled.div<{ $open: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	background: #fff;
	height: 100dvh;
	box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
	transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
	transition: transform 0.3s ease;
	width: 200px;
	z-index: 999999911;
	padding: 15px 20px;

	.logo {
		display: flex;
		align-items: center;
		justify-content: space-between;

		img {
			height: 35px;
		}

		button {
			border: 0;
			margin: 0;
			outline: 0;
			background: none;
		}
	}
	.nav {
		margin-top: 40px;

		a {
			display: flex;
			align-items: center;
			width: 100%;
			margin-bottom: 15px;
			color: #000;
			text-decoration: none;
			font-weight: 600;
			padding: 10px;
			border-radius: 6px;

			&.active {
				background: #000;
				color: #fff;
			}

			svg {
				font-size: 1.6rem;
				margin-right: 10px;
			}

			span {
				font-size: 0.9rem;
			}
		}
	}
	.nav-btm {
		position: absolute;
		bottom: 20px;
		right: 20px;
		left: 20px;

		button {
			width: 100%;
			background: #000d33;
			border-radius: 10px;
			padding: 10px 0;
			color: #fff;
			outline: 0;
			border: 0;
		}
	}
`;

export const TableArea = styled.div`
	flex-grow: 1;
	overflow-y: auto;
	/* padding-bottom: 80px; */
	margin-top: 20px;
`;

export const ZIndex = styled.div`
	position: relative;
	z-index: 9991;
`;

export const StatsStyles = styled.div`
	background: #000;
	margin: 10px 0;
	padding: 10px 30px;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.stat-item {
		display: flex;
		align-items: center;

		.img {
			background: #fff;
			padding: 6px;
			border-radius: 10px;

			img {
				height: 20px;
			}
		}

		.text {
			display: flex;
			margin-left: 10px;
			h6 {
				margin: 0;
				padding: 0;
				color: #fff;
				font-size: 1.2rem;
				font-weight: 300;

				&:last-child {
					color: rgba(255, 199, 39, 1);
					font-weight: bold;
					margin-left: 10px;
				}
			}
		}
	}
`;

export const SalesDetailsStyles = styled.div`
	display: flex;

	.detail-list {
		width: 22%;
		height: 100%;
		border-right: 1px solid rgba(190, 190, 190, 1);

		.head {
			border-bottom: 1px solid rgba(190, 190, 190, 1);
			padding: 10px 5px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			h6 {
				margin: 0;
				padding: 0;
				color: rgba(102, 102, 102, 1);
				font-size: 1.1rem;
			}
			button {
				background: #000;
				border: 0;
				outline: 0;
				color: #fff;
				border-radius: 5px;
			}
		}

		.body-content {
			overflow-y: auto;
			height: 80vh;
			padding: 10px 5px;
		}
	}

	.detail-content {
		width: 78%;

		.detail-head {
			background: rgba(234, 234, 234, 1);
			padding: 5px 20px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.crumb {
				display: flex;
				align-items: center;
				font-size: 0.85rem;

				button {
					border: 0;
					background: none;
					outline: 0;
					margin-right: 10px;

					span {
						margin-left: 10px;
					}
				}
			}

			.button {
				button {
					background-color: rgba(0, 13, 51, 1);
					border: 0;
					outline: 0;
					display: flex;
					align-items: center;
					color: #fff;
					font-size: 0.85rem;
					padding: 5px 10px;
					border-radius: 5px;

					span {
						margin-left: 5px;
					}
				}
			}
		}
		.detail-body {
			height: 90vh;
			overflow-y: auto;
			padding: 10px 30px;
			padding-bottom: 70px;
		}
	}
`;

export const BoxList = styled.div`
	border: 1px solid rgba(102, 102, 102, 1);
	margin-bottom: 15px;
	display: flex;
	padding: 10px;
	border-radius: 10px;
	color: rgba(102, 102, 102, 1);
	cursor: pointer;

	&.active {
		background: #000;
		color: #fff;

		span.check {
			background: rgba(38, 255, 0, 1);
		}
	}

	span.check {
		border: 1px solid rgba(102, 102, 102, 1);
		height: 15px;
		width: 15px;
		border-radius: 2px;
		margin-right: 10px;
	}

	.content {
		h6 {
			font-size: 0.9rem;
		}
		.d-flex {
			font-size: 0.8rem;
		}
		.status {
			font-size: 0.75rem;
			background: rgba(255, 199, 39, 0.2);
			color: #000;
			text-transform: uppercase;
			padding: 5px 10px;
			margin-top: 10px;
			display: inline-block;
			font-weight: 700;
		}
	}
`;

export const SalesInfo = styled.div`
	border: 1px solid rgba(234, 234, 234, 1);
	background: #fff;
	display: flex;
	justify-content: space-between;
	padding: 20px;
	border-radius: 10px;
	align-items: center;

	&.shade {
		background: rgba(234, 234, 234, 1);
		border: 1px solid #000;

		.wallet {
			min-width: 300px;
		}
	}

	.first {
		display: flex;
		height: 100%;

		span {
			background: #000;
			color: #fff;
			margin-right: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 15px;
			border-radius: 3px;
		}

		h6,
		p {
			margin: 0;
			padding: 0;
		}
		h6 {
			color: #000;
			font-weight: 600;
			text-decoration: underline;
			margin-bottom: 5px;
		}
		p {
			font-size: 0.85rem;
		}
	}

	.wallet {
		background: #000;
		display: flex;
		color: #fff;
		justify-content: center;
		flex-direction: column;
		padding: 15px 20px;
		border-radius: 10px;

		.flx {
			display: flex;
			align-items: center;
		}

		.img {
			background: #fff;
			padding: 6px;
			border-radius: 10px;
			margin-right: 10px;

			img {
				height: 20px;
			}
		}

		div {
			&:first-child {
				margin-bottom: 10px;
			}

			strong {
				color: rgba(255, 199, 39, 1);
				margin-left: 10px;
			}
		}
	}
`;

export const CardBox = styled.div`
	background: #fff;
	padding: 20px;
	border-radius: 15px;
	border: 1px solid rgba(234, 234, 234, 1);
`;

export const Status = styled.span`
	background: rgba(145, 255, 255, 0.35);
	color: rgba(38, 255, 0, 1);
	padding: 5px 15px;
	border-radius: 10px;
	font-weight: 600;
	text-transform: uppercase;
`;

export const TotalBox = styled.div`
	background: rgba(234, 234, 234, 1);
	padding: 20px;
	border-radius: 15px;

	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		font-size: 0.9rem;
	}
`;

export const BtnAttach = styled.div`
	display: inline-flex;
	border: 1px solid #000;
	margin-top: 20px;
	align-items: center;
	border-radius: 20px;
	padding: 5px 10px;
	font-size: 0.9rem;

	span {
		margin-right: 30px;
		margin-left: 3px;
	}

	button {
		border: 0;
		outline: 0;
		background: none;
	}
`;

export const SyncTable = styled.div`
	.head {
		background: rgba(76, 175, 80, 1);
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
		margin-top: 20px;
		padding: 5px 30px;
		color: #fff;
		font-size: 0.9rem;

		&.failed {
			background: red;
		}
	}
	.bdy {
		margin-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.85rem;
		padding: 5px 15px;
	}
	button {
		background: #000;
		color: #fff;
		border: 0;
		outline: 0;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		padding: 5px 15px;
		border-radius: 5px;

		span {
			margin-left: 5px;
		}
	}
`;

export const TitleCrumb = styled.div`
	margin-top: 15px;

	h3 {
		color: rgba(102, 102, 102, 1);
		font-weight: normal;
	}
	.crumb {
		display: flex;
		align-items: center;
		font-size: 0.85rem;

		button {
			border: 0;
			background: none;
			outline: 0;
			margin-right: 10px;

			span {
				margin-left: 10px;
			}
		}
	}
`;

export const InfoBox = styled.div`
	background: #fff;
	border-radius: 15px;
	border: 1px solid rgba(234, 234, 234, 1);
	margin-bottom: 20px;
	font-size: 0.9rem;

	.head {
		background-color: rgba(0, 13, 51, 1);
		color: #fff;
		font-weight: normal;
		border-radius: 10px;
		padding: 15px;
	}

	.bdy {
		padding: 10px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-bottom: 0;

		span {
			min-width: 150px;
			margin-bottom: 15px;
			color: #666;
		}
	}
`;

export const SyncBox = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px;
	border-radius: 15px;

	button {
		border: 0;
		color: #fff !important;
		outline: 0;
		border-radius: 5px;
	}

	p {
		margin: 0;
		outline: 0;
		font-size: 0.7rem;
		font-weight: 600;
	}

	.prog {
		width: 100px;
		height: 10px;
		background-color: rgba(217, 217, 217, 1);
		border-radius: 5px;

		.line {
			height: 100%;
			width: 40%;
			border-radius: 5px;
		}
	}

	&.green {
		border: 2px solid rgba(76, 175, 80, 1);
		svg {
			color: rgba(76, 175, 80, 1);
		}
		.line,
		button {
			background: rgba(76, 175, 80, 1);
		}
	}
	&.blue {
		border: 2px solid rgba(80, 91, 218, 1);
		svg {
			color: rgba(80, 91, 218, 1);
		}
		.line,
		button {
			background: rgba(80, 91, 218, 1);
		}
	}
`;

export const UploadContainer = styled.label`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 10px 16px;
	background: rgba(255, 199, 39, 1);
	color: rgba(38, 50, 56, 1);
	font-size: 0.9rem;
	font-weight: 500;
	border-radius: 10px;
	cursor: pointer;
	transition: background 0.3s ease;
`;

export const CoverScroll = styled.div`
	height: 100dvh;
	overflow-y: auto;
	overflow-x: hidden;
	padding-bottom: 50px;
`;
