import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MockUser from "./services/mock-sql/mock-user";
import MockSqlTables from "./services/mock-sql/tables";

function App() {
	MockSqlTables.createMockTables();
	MockUser.createMockUser();

	return (
		<>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</>
	);
}

export default App;
