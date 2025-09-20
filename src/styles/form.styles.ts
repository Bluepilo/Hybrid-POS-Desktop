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
	select {
		width: 100%;
		border: 1px solid #66666659;
		outline: 0;
		color: #333;
		border-radius: 10px;
		padding-left: 20px;
		height: 45px;
		font-size: 0.9rem;
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
