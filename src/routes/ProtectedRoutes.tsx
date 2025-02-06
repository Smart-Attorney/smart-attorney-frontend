import { Navigate, Outlet } from "react-router-dom";

type ProtectedRoutesProps = {
	isAuthenticated: boolean;
};

function ProtectedRoutes({ isAuthenticated }: ProtectedRoutesProps) {
	return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
}

export default ProtectedRoutes;
