import { HashRouter, Route, Routes } from "react-router-dom";
import Connect from "./screens/Connect";
import Loading from "./screens/Loading";
import Auth from "./screens/Auth";

const Routing = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Connect />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/load" element={<Loading />} />
			</Routes>
		</HashRouter>
	);
};

export default Routing;
