import { Route, Routes, useNavigate } from "react-router-dom";
import { refreshJsonWebTokens } from "../features/auth/api/refresh-json-web-tokens";
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
import { ResponseBody } from "../types/api";
import ProtectedRoutes from "./ProtectedRoutes";
import RemoveTrailingSlash from "./RemoveTrailingSlash";

type AppRoutesProps = {
	isAuthenticated: boolean;
	userLogin: () => void;
	userLogout: () => void;
};

function AppRoutes({ isAuthenticated, userLogin, userLogout }: AppRoutesProps) {
	const navigate = useNavigate();

	/************************************************************/
	/**
	 * Refresh access and id tokens with refresh token.
	 * If refresh token is expired, logs the user out.
	 */
	const refreshTokens = async () => {
		const response = await refreshJsonWebTokens();

		if (!response.ok) {
			const resBody: ResponseBody<{}> = await response.json();
			alert(resBody.message);
			userLogout();
			stopTokensRefresh();
			navigate("/home");
		}
	};

	let intervalId: NodeJS.Timeout | null;

	const startTokensRefresh = () => {
		const interval = 3.3e6; // 55 minutes in milliseconds
		if (!intervalId) {
			intervalId = setInterval(refreshTokens, interval);
		}
	};

	const stopTokensRefresh = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
		intervalId = null;
	};

	/************************************************************/

	return (
		<>
			<RemoveTrailingSlash />

			<Routes>
				<Route path="/" element={<Root />} />
				<Route path="/home" element={<Home />} />
				<Route path="/auth" element={<Auth userLogin={userLogin} startTokensRefresh={startTokensRefresh} />} />

				{/* <Route path="/signin" element={<SignIn />} /> */}
				{/* <Route path="/register" element={<Register />} /> */}

				<Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/case/:id" element={<CaseFolder />} />
					<Route path="/create-case" element={<CreateCaseFolder />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/team" element={<Error />} />
					<Route path="/notifications" element={<Error />} />
					<Route
						path="/settings"
						element={<Settings userLogout={userLogout} stopTokensRefresh={stopTokensRefresh} />}
					/>

					{/* <Route path="/test" element={<Test />} /> */}
				</Route>

				<Route path="/*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default AppRoutes;
