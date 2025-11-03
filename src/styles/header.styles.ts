import styled from "styled-components";

export const HeaderStyles = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	padding: 8px 20px;
	border-bottom: 1px solid rgba(190, 190, 190, 1);
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	z-index: 991;

	.left-nav {
		display: flex;
		align-items: center;

		img {
			height: 30px;
		}
		button {
			background: none;
			outline: 0;
			border: 0;
		}
		.tab {
			display: flex;
			margin-left: 30px;
			/* max-width: 50%; */
			/* overflow-x: hidden; */

			.select {
				border: 1px solid #000d33;
				color: #000d33;
				padding: 8px 15px;
				border-radius: 10px;
				margin-right: 10px;
				cursor: pointer;
				font-weight: 600;
				font-size: 0.85rem;
				display: flex;
				align-items: center;

				&:hover {
					.svg {
						display: inline-flex;
					}
				}
				.svg {
					height: 20px;
					width: 20px;
					background: #fff;
					border-radius: 50%;
					display: none;
					justify-content: center;
					align-items: center;
					margin-left: 5px;

					svg {
						color: #000d33;
					}
				}

				&.active {
					background: #000d33;
					color: #fff;
				}
			}

			button.plus {
				border: 1px solid #000d33;
				color: #000d33;
				padding: 5px 8px;
				border-radius: 10px;
				margin-right: 10px;
				outline: 0;
			}
		}
	}

	.right-nav {
		display: flex;
		align-items: center;

		.user {
			margin-right: 30px;
			font-size: 0.85rem;
			.name {
				display: flex;
				align-items: center;

				span.status {
					height: 10px;
					width: 10px;
					background: rgba(76, 175, 80, 1);
					border-radius: 50%;
					margin-right: 6px;
				}
			}
		}

		button.sync {
			border: 0;
			outline: 0;
			background: none;
			background: #000d33;
			margin-right: 20px;
			font-size: 0.8rem;
			color: #fff;
			padding: 5px 10px;
			border-radius: 5px;

			span {
				margin-right: 5px;
			}

			b {
				background: rgba(255, 185, 0, 1);
				color: #000d33;
				padding: 2px 5px;
				border-radius: 5px;
			}
		}

		button.hint {
			border: 0;
			outline: 0;
			background: none;
			color: rgba(255, 185, 0, 1);
			display: inline-flex;
			align-items: center;
			font-weight: 700;
			font-size: 1rem;
			cursor: pointer;

			span {
				margin-left: 10px;
			}
		}
	}
`;
