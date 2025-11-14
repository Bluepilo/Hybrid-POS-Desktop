import "./App.css";
import "./styles/bootstrap.min.css";
import { Provider } from "react-redux";
import Routing from "./Routing";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { initDB } from "./utils/db";
import { Toaster } from "sonner";

let persistor = persistStore(store);

const App = () => {
	useEffect(() => {
		initDB();
	}, []);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routing />
				<Toaster
					expand
					visibleToasts={9}
					toastOptions={{ closeButton: true }}
					richColors
				/>
			</PersistGate>
		</Provider>
	);
};

export default App;
