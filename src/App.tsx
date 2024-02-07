import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MockSqlTables from "./services/mock-sql/tables";

function App() {
	MockSqlTables.createMockTables();

	return (
		<>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</>
	);
}

export default App;
