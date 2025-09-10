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
		}

		span {
			background: rgba(215, 215, 215, 1);
			color: #000d33;
			padding: 2px 16px;
			margin-left: 20px;
			border-radius: 10px;
		}
	}

	.search {
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
	}
`;

export const ProductStyle = styled.div`
	border: 1px solid rgba(102, 102, 102, 1);
	padding: 10px;
	margin-bottom: 20px;
	border-radius: 20px;

	.img {
		position: relative;

		span {
			position: absolute;
			top: 10px;
			left: 10px;
			color: rgba(76, 175, 80, 1);
			background: #fff;
			padding: 4px 8px;
			border-radius: 5px;
			font-size: 0.8rem;
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
		}
		h5 {
			font-size: 1rem;
			font-weight: normal;
		}
	}
`;
