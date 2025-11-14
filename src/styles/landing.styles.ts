import styled from "styled-components";
import Bg from "../assets/images/bg-onboard.svg";

export const BgStyles = styled.div`
	height: 100dvh;
	overflow: hidden;
	background-image: url(${Bg});
	background-size: contain;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.log-box {
		background: rgba(223, 223, 223, 0.6);
		box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
		width: 50%;
		padding: 20px 80px;
		border-radius: 20px;
		box-sizing: border-box;

		@media (max-width: 800px) {
			width: 80%;
		}

		@media (min-width: 1200px) {
			width: 40%;
		}

		.logo {
			text-align: center;
			img {
				height: 50px;
			}
		}

		.hint {
			text-align: center;
			margin: 20px 0;

			button {
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

		.content {
			text-align: center;

			h3 {
				color: #000d33;
				font-size: 2rem;
				margin: 0;
				padding: 0;
			}

			p {
				color: #000d33;
				font-size: 0.7rem;
			}
		}

		.form {
			margin-top: 20px;
			text-align: center;
			input {
				border: 1px solid rgba(102, 102, 102, 1);
				background: #fff;
				width: 100%;
				display: block;
				height: 40px;
				padding-left: 20px;
				border-radius: 20px;
				outline: 0;
				font-size: 1rem;
				margin-bottom: 15px;

				&::placeholder {
					font-size: 0.9rem;
					color: rgba(102, 102, 102, 1);
				}

				&.right {
					text-align: center;
				}
			}

			label {
				display: block;
				text-align: left;
				color: rgba(102, 102, 102, 1);
				margin-bottom: 4px;
			}

			button {
				background: #0141ff;
				outline: 0;
				border: 0;
				color: #fff;
				padding: 10px 40px;
				border-radius: 20px;
				font-weight: bold;

				&.wide {
					width: 100%;
					padding: 15px;
					font-size: 1rem;
					margin-top: 10px;
				}

				&.button {
					padding: 0;
					margin-bottom: 4px;
					display: inline-flex;
					align-items: center;
					background: none;
					font-size: 1rem;
					color: rgba(102, 102, 102, 1);
					font-weight: normal;

					span {
						margin-left: 10px;
					}
				}
			}
		}

		.others {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20px;

			p {
				margin: 0;
				outline: 0;
				color: #000;
				font-weight: bold;
			}

			a {
				text-decoration: none;
			}

			button {
				outline: 0;
				border: 1px solid #0141ff;
				color: #0141ff;
				background: #fff;
				text-transform: uppercase;
				padding: 10px 15px;
				border-radius: 15px;
				margin-left: 15px;
				font-weight: 700;
			}
		}

		h6.title {
			color: rgba(51, 51, 51, 1);
			text-align: center;
			font-size: 1.2rem;
			margin: 0;
			padding: 0;
		}

		div.status {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 10px;
			color: rgba(76, 175, 80, 1);
			font-weight: normal;

			&.false {
				color: red;

				i {
					background: red;
				}
			}

			i {
				height: 10px;
				width: 10px;
				background: rgba(76, 175, 80, 1);
				border-radius: 50%;
				margin-right: 6px;
			}
			span {
				font-size: 0.85rem;
			}
		}
	}
`;

export const ProgressTrack = styled.div<{ width: number }>`
	width: 100%;
	height: 8px;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 9999px;
	overflow: hidden;
	margin-top: 30px;

	.fill {
		width: ${(props) => props.width}%;
		background-color: #0141ff;
		height: 100%;
		transition: width 0.4s ease;
	}
`;

export const LoadingScreen = styled.div<{ val: number }>`
	background: #fff;
	height: 100dvh;
	overflow: hidden;
	color: rgba(102, 102, 102, 1);
	position: relative;

	.load-div {
		display: flex;
		align-items: center;
		position: absolute;
		bottom: ${(props) =>
			props.val > 80
				? "90%"
				: props.val > 70
				? "80%"
				: props.val > 50
				? "60%"
				: props.val > 40
				? "40%"
				: "5%"};
		left: 10px;
		transition: width 0.4s ease;

		h1 {
			font-size: 4rem;
			margin: 0;
			padding: 0;
		}

		.load {
			background: rgba(217, 217, 217, 0.2);
			margin-left: 15px;
			padding: 25px 25px;
			border: 20px;
		}
	}

	.content-div {
		width: 20%;
		position: absolute;
		right: 20px;
		top: 40%;

		h3 {
			color: #000;
			font-size: 1.5rem;
		}
		p {
			font-size: 0.7rem;
		}
	}

	.load-image {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
