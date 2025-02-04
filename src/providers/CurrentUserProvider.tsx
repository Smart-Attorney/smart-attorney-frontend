import { createContext } from "react";

export interface CurrentUser {
	id: string;
	firstName: string;
	lastName: string;
}

export interface CurrentUserContextType {
	getCurrentUser: () => CurrentUser;
	setCurrentUser: (user: CurrentUser) => void;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
	const CURRENT_USER_KEY = "current_user";

	const getCurrentUser = (): CurrentUser => {
		return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) as string);
	};

	const setCurrentUser = (user: CurrentUser): void => {
		localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
	};

	return (
		<CurrentUserContext.Provider value={{ getCurrentUser, setCurrentUser }}>{children}</CurrentUserContext.Provider>
	);
}

/* 
  Reference/Source for useContext():
  https://stackoverflow.com/questions/73117229/how-to-use-usecontext-in-typescript

  https://blog.logrocket.com/how-to-use-react-context-typescript/
*/
