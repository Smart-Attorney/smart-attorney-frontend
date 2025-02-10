import { useState } from "react";
import AppProvider from "./providers/AppProvider";
import AppRoutes from "./routes/AppRoutes";
import { LS } from "./utils/local-storage";

function App() {
	const getIsAuthenticatedFromLocalStorage = () => {
		const isAuthenticated = LS.getIsAuthenticated();
		if (isAuthenticated == null) {
			LS.setIsAuthenticated(false);
			return false;
		}
		return isAuthenticated;
	};

	const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthenticatedFromLocalStorage);

	const userLogin = () => {
		LS.setIsAuthenticated(true);
		setIsAuthenticated(true);
	};

	const userLogout = () => {
		LS.setIsAuthenticated(false);
		setIsAuthenticated(false);
	};

	/* Deprecated: used in local backend */
	// const [isSetup, setIsSetup] = useState(false);
	// useEffect(() => {
	// 	if (isSetup) return;
	// 	SqlTables.create();
	// 	MockUser.create();
	// 	setIsSetup(true);
	// });

	return (
		<AppProvider>
			<AppRoutes isAuthenticated={isAuthenticated} userLogin={userLogin} userLogout={userLogout} />
		</AppProvider>
	);
}

export default App;
