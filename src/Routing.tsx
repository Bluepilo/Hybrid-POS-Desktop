import { HashRouter, Route, Routes } from "react-router-dom";
import Connect from "./screens/Connect";
import Loading from "./screens/Loading";
import Auth from "./screens/Auth";
import App from "./screens/App";

const Routing = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Connect />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="/load" element={<Loading />} />
				<Route path="/app" element={<App />} />
			</Routes>
		</HashRouter>
	);
};

export default Routing;
