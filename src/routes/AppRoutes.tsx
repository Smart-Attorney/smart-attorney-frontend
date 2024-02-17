import { Route, Routes } from "react-router-dom";
import CaseFolder from "../pages/CaseFolder";
import CreateCaseFolder from "../pages/CreateCaseFolder";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
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
				<Route path="/dashboard/:id" element={<Dashboard />} />
				<Route path="/case/:id" element={<CaseFolder />} />
				<Route path="/create-case" element={<CreateCaseFolder />} />
				<Route path="/calendar" element={<Error />} />
				<Route path="/notifications" element={<Error />} />
				<Route path="/settings" element={<Error />} />
				<Route path="/team" element={<Error />} />
				<Route path="/*" element={<NotFound />} />
				<Route path="/test" element={<Test />} />
			</Routes>
		</>
	);
}

export default AppRoutes;
