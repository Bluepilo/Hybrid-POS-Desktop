import { Outlet, useNavigate } from "react-router-dom";
import { AppContainer } from "../styles/basic.styles";
import Header from "./Header";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { loadProducts } from "../redux/app/appSlice";

const AppLayout = () => {
	const { user } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		if (!user?.id) {
			navigate("/");
		}
	}, [user]);

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
