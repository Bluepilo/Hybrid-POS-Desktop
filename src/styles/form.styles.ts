import styled from "styled-components";

export const InputContainer = styled.div`
	.label {
		margin-bottom: 4px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		label {
			display: block;
			color: #666666;
			font-size: 0.8rem;
		}

		button {
			border: 0;
			outline: 0;
			background: none;
			display: flex;
			align-items: center;
			color: #666666;

			span {
				margin-left: 10px;
				font-size: 0.85rem;
			}
		}
	}

	input,
	select,
	textarea {
		width: 100%;
		border: 1px solid #66666659;
		outline: 0;
		color: #333;
		border-radius: 10px;
		padding-left: 20px;
		height: 45px;
		font-size: 0.9rem;
	}

	textarea {
		height: 80px;
	}
`;

export const ButtonClick = styled.button`
	width: 100%;
	border: 1.5px solid #fff;
	outline: 0;
	background: #000d33;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 0;
	border-radius: 25px;
	box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);

	&:disabled {
		background: rgba(0, 13, 51, 0.4) !important;
		border: 1px solid rgba(0, 13, 51, 0.4) !important;
		cursor: not-allowed;
	}

	svg {
		margin-right: 10px;
	}
`;

export const SessionDiv = styled.div`
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
`;
