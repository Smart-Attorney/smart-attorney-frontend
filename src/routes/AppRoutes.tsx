import { Route, Routes } from "react-router-dom";
import CaseFolder from "../pages/CaseFolder";
import CreateCaseFolder from "../pages/CreateCaseFolder";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import Test from "../pages/Test";
import RemoveTrailingSlash from "./RemoveTrailingSlash";

function AppRoutes() {
	return (
		<>
			<RemoveTrailingSlash />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dashboard/:id" element={<CaseFolder />} />
				<Route path="/create-case" element={<CreateCaseFolder />} />
				<Route path="/*" element={<Error />} />
				<Route path="/test" element={<Test />} />
			</Routes>
		</>
	);
}

export default AppRoutes;
