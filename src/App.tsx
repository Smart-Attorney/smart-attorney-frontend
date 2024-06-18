import { useEffect, useState } from "react";
import AppProvider from "./providers/AppProvider";
import AppRoutes from "./routes/AppRoutes";
import { MockUser } from "./services/local-database/mock-user";
import { SqlTables } from "./services/local-database/sql-tables";

function App() {
	const [isSetup, setIsSetup] = useState(false);

	useEffect(() => {
		if (isSetup) return;
		SqlTables.create();
		MockUser.create();
		setIsSetup(true);
	});

	return (
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	);
}

export default App;
