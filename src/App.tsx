import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import NewCase from "./NewCase";

function App() {
	return (
		<>
			<Routes>
				<Route index element={<Dashboard />} />
				<Route path="new-case" element={<NewCase />} />
			</Routes>
		</>
	);
}

export default App;
