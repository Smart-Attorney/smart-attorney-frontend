import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Calendar from "../pages/Calendar";
import CaseFolder from "../pages/CaseFolder";
import CreateCaseFolder from "../pages/CreateCaseFolder";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Root from "../pages/Root";
import Settings from "../pages/Settings";
import ProtectedRoutes from "./ProtectedRoutes";
import RemoveTrailingSlash from "./RemoveTrailingSlash";

type AppRoutesProps = {
	isAuthenticated: boolean;
	userLogin: () => void;
	userLogout: () => void;
};

function AppRoutes({ isAuthenticated, userLogin, userLogout }: AppRoutesProps) {
	return (
		<>
			<RemoveTrailingSlash />

			<Routes>
				<Route path="/" element={<Root />} />
				<Route path="/home" element={<Home />} />
				<Route path="/auth" element={<Auth userLogin={userLogin} />} />

				{/* <Route path="/signin" element={<SignIn />} /> */}
				{/* <Route path="/register" element={<Register />} /> */}

				<Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/case/:id" element={<CaseFolder />} />
					<Route path="/create-case" element={<CreateCaseFolder />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/team" element={<Error />} />
					<Route path="/notifications" element={<Error />} />
					<Route path="/settings" element={<Settings userLogout={userLogout} />} />

					{/* <Route path="/test" element={<Test />} /> */}
				</Route>

				<Route path="/*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default AppRoutes;
