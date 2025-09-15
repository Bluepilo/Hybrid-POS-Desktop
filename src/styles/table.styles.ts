import styled from "styled-components";

export const TableDiv = styled.table`
	width: 100%;
	border-collapse: collapse;
	white-space: nowrap;
	color: #000d33;
	font-family: "Urbanist", "Jost", "Lucida Sans", sans-serif;
	font-weight: 600;

	thead th {
		position: sticky;
		top: 0;
		background: #000d33;
		color: #fff;
		z-index: 2;
		height: 3.5rem;
		vertical-align: middle;
		text-transform: uppercase;

		&:first-child {
			border-top-left-radius: 0.5rem;
		}
		&:last-child {
			border-top-right-radius: 0.5rem;
		}

		.th-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			cursor: pointer;
		}
	}

	tbody {
		td {
			height: 3rem;
			vertical-align: middle;

			&.link {
				a {
					color: #000d33;
					text-decoration: none;
					font-weight: 500;

					&:hover {
						text-decoration: underline;
					}
				}
			}
			&.app {
				span {
					color: #fff;
					font-size: 0.8rem;
					padding: 7px 12px;
					border-radius: 15px;
					position: relative;
					margin-left: -10px;

					&:first-child {
						margin-left: 0px;
					}

					&.led {
						background: #263238;
					}
					&.inv {
						background: #0047ab;
					}
					&.sms {
						background: #f9c4ff;
					}
				}
			}
			&.button {
				button {
					background: none;
					border: 0;
					outline: 0;
				}
			}
			&.drop {
				div {
					background: #b8caff;
					color: #fff;
					font-size: 0.7rem;
					width: max-content;
					padding: 3px 5px;
					border-radius: 6px;
					border: 1.5px solid #fff;
					box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
				}
			}
		}
	}
`;

export const PaginateStyles = styled.div`
	padding-top: 15px;
	padding-bottom: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.hint {
		display: flex;
		align-items: center;

		@media (max-width: 991px) {
			display: none;
		}

		button {
			background: none;
			outline: 0;
			font-size: 0.8rem;
			padding: 5px 15px;
			border-radius: 15px;
			display: flex;
			align-items: center;

			img {
				height: 20px;
			}

			span {
				margin-left: 4px;
			}
		}

		.count {
			margin-left: 5px;
			background: #d7d7d7;
			margin-left: 10px;
			color: #000d33;
			border-radius: 40%;
			font-weight: 700;
			font-size: 0.8rem;
			padding: 8px 10px;
		}
	}

	.pages {
		display: flex;
		align-items: center;

		.select {
			select {
				border: 1px solid #666666;
				outline: 0;
				height: 38px;
				border-radius: 4px;
				padding-left: 5px;
				margin-right: 5px;
				color: #666;
			}
			span {
				color: #666;
				font-size: 0.9rem;
			}
		}
		.clicks {
			display: flex;
			align-items: center;
			margin-left: 20px;

			button {
				background: none;
				outline: 0;
				border: 0;
				display: inline-flex;
				align-items: center;
				margin-left: 6px;

				&.active {
					background: #91ffff59;
				}
			}

			&.keys {
				@media (max-width: 991px) {
					display: none;
				}
			}
		}
	}
`;
