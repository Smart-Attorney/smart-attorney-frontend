import { Navigate, Outlet } from "react-router-dom";

type ProtectedRoutesProps = {
	isAuthenticated: boolean;
};

// https://www.geeksforgeeks.org/how-to-create-a-protected-route-with-react-router-dom/
function ProtectedRoutes({ isAuthenticated }: ProtectedRoutesProps) {
	return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
}

export default ProtectedRoutes;
