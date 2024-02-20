import AppProvider from "./providers/AppProvider";
import AppRoutes from "./routes/AppRoutes";
import { MockUser } from "./services/mock-sql/mock-user";
import { MockSqlTables } from "./services/mock-sql/tables";

function App() {
	MockSqlTables.createMockTables();
	MockUser.createMockUser();

	return (
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	);
}

export default App;
