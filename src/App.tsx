import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewCase from "./pages/NewCase/NewCase";

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
