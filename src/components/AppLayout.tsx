import { Outlet } from "react-router-dom";
import { AppContainer } from "../styles/basic.styles";
import Header from "./Header";
import { useEffect } from "react";
import { useAppDispatch } from "../utils/hooks";
import { loadProducts } from "../redux/app/appSlice";

const AppLayout = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadProducts());
	}, []);

	return (
		<AppContainer>
			<Header />
			<div className="main-content">
				<Outlet />
			</div>
		</AppContainer>
	);
};

export default AppLayout;
