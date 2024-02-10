import { BrowserRouter } from "react-router-dom";
import { CurrentUserProvider } from "./CurrentUserProvider";

interface AppProviderProps {
	children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
	return (
		<CurrentUserProvider>
			<BrowserRouter>{children}</BrowserRouter>
		</CurrentUserProvider>
	);
}

export default AppProvider;
