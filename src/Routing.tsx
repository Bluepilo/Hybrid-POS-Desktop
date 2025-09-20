import { HashRouter, Route, Routes } from "react-router-dom";
import Connect from "./screens/Connect";
import Loading from "./screens/Loading";
import Auth from "./screens/Auth";
import AppLayout from "./components/AppLayout";
import POS from "./screens/App/POS";
import Sales from "./screens/App/Sales";
import Customers from "./screens/App/Customers";
import Stocks from "./screens/App/Stocks";
import Settings from "./screens/App/Settings";
import SalesDetails from "./screens/App/Sales/SalesDetails";
import CustomerDetails from "./screens/App/Customers/CustomerDetails";

const Routing = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/connect" element={<Connect />} />
				<Route path="/load" element={<Loading />} />
				<Route path="/app" element={<AppLayout />}>
					<Route path="pos/:tabId" element={<POS />} />
					<Route path="sales" element={<Sales />} />
					<Route path="sales/:id" element={<SalesDetails />} />
					<Route path="customers" element={<Customers />} />
					<Route path="customers/:id" element={<CustomerDetails />} />
					<Route path="stocks" element={<Stocks />} />
					<Route path="settings" element={<Settings />} />
				</Route>
			</Routes>
		</HashRouter>
	);
};

export default Routing;
