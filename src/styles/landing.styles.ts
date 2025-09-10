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
				text-align: center;
				border-radius: 20px;
				outline: 0;
				font-size: 1rem;
				margin-bottom: 15px;

				&::placeholder {
					font-size: 0.9rem;
					color: rgba(102, 102, 102, 1);
				}
			}

			button {
				background: #0141ff;
				outline: 0;
				border: 0;
				color: #fff;
				padding: 10px 40px;
				border-radius: 20px;
				font-weight: bold;
			}
		}

		.others {
			display: flex;
			align-items: center;
			margin-top: 20px;

			p {
				margin: 0;
				outline: 0;
				color: #000;
				font-weight: bold;
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
