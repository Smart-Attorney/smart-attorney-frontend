import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewCase from "./pages/NewCase/NewCase";
import Error from "./pages/Error/Error";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/new-case" element={<NewCase />} />
				<Route path="/*" element={<Error />} />
			</Routes>
		</>
	);
}

export default App;
