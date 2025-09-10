import { Outlet } from "react-router-dom";
import { AppContainer } from "../styles/basic.styles";
import Header from "./Header";

const AppLayout = () => {
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
