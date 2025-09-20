import "./App.css";
import "./styles/bootstrap.min.css";
import { Provider } from "react-redux";
import Routing from "./Routing";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routing />
			</PersistGate>
		</Provider>
	);
};

export default App;
