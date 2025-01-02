import { AuthProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";
import { cognitoAuthConfig } from "../config/aws-cognito";
import { CurrentUserProvider } from "./CurrentUserProvider";

interface AppProviderProps {
	children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
	return (
		<AuthProvider {...cognitoAuthConfig}>
			<CurrentUserProvider>
				<BrowserRouter>{children}</BrowserRouter>
			</CurrentUserProvider>
		</AuthProvider>
	);
}

export default AppProvider;
