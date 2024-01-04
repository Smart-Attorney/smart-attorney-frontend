import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Case from "./pages/Case/Case";
import CreateCaseFolder from "./pages/Create/CreateCaseFolder";
import Error from "./pages/Error/Error";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dashboard/:id" element={<Case />} />
				<Route path="/create-case" element={<CreateCaseFolder />} />
				<Route path="/*" element={<Error />} />
			</Routes>
		</>
	);
}

export default App;
