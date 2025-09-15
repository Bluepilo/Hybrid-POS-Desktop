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
`;

export const TableArea = styled.div`
	flex-grow: 1;
	overflow-y: auto;
	/* padding-bottom: 80px; */
	margin-top: 20px;
`;
