import { createContext } from "react";

interface CurrentUserProviderProps {
	children: React.ReactNode;
}

interface CurrentUser {
	id: string;
	firstName: string;
	lastName: string;
}

interface CurrenUserContextType {
	getCurrentUser: () => any;
	setCurrentUser: (user: CurrentUser) => void;
}

export const CurrentUserContext = createContext<CurrenUserContextType>({
	getCurrentUser: () => {},
	setCurrentUser: () => {},
});

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
	const CURRENT_USER_KEY = "current_user";

	const getCurrentUser = () => {
		return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) as string);
	};

	const setCurrentUser = (user: CurrentUser) => {
		localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
	};

	return (
		<CurrentUserContext.Provider value={{ getCurrentUser, setCurrentUser }}>
			{children}
		</CurrentUserContext.Provider>
	);
}

/* 
  Reference/Source for useContext():
  https://stackoverflow.com/questions/73117229/how-to-use-usecontext-in-typescript
*/
