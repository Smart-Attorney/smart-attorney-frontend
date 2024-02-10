import { BrowserRouter } from "react-router-dom";

interface AppProviderProps {
	children: React.ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
	return <BrowserRouter>{children}</BrowserRouter>;
}

export default AppProvider;
