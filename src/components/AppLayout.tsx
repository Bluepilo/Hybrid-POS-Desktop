import { Outlet, useNavigate } from "react-router-dom";
import { AppContainer } from "../styles/basic.styles";
import Header from "./Header";
import { useEffect } from "react";
import { useAppSelector } from "../utils/hooks";

const AppLayout = () => {
	const { user } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (!user?.userId) {
			navigate("/");
		}
	}, [user]);

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
