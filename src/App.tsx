import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateNewCase from "./pages/NewCase/CreateNewCase";
import Error from "./pages/Error/Error";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/create-new-case" element={<CreateNewCase />} />
				<Route path="/*" element={<Error />} />
			</Routes>
		</>
	);
}

export default App;
