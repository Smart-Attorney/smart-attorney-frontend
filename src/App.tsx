import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CaseFolder from "./pages/CaseFolder";
import CreateCaseFolder from "./pages/CreateCaseFolder";
import Error from "./pages/Error";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dashboard/:id" element={<CaseFolder />} />
				<Route path="/create-case" element={<CreateCaseFolder />} />
				<Route path="/*" element={<Error />} />
			</Routes>
		</>
	);
}

export default App;
