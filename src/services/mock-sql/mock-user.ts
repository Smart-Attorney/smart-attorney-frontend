import { Users } from "./models";

class MockUser {
	static mockUser: Users = {
		id: "123abcABC",
		first_name: "Jane",
		last_name: "Doe",
		firm_name: "",
		company_email: "lawyer@email.com",
		email: "lawyer@email.com",
		password: "password123",
	};

	static setMockUser = (): void => {
		const getLocalStorageUserArray = JSON.parse(localStorage.getItem("users") as string);
		const updatedArray = [this.mockUser, ...getLocalStorageUserArray];
		localStorage.setItem("users", JSON.stringify(updatedArray));
	};

	static mockUserExists = (): boolean => {
		const getLocalStorageUserArray = JSON.parse(localStorage.getItem("users") as string);
		for (let i = 0; i < getLocalStorageUserArray.length; i++) {
			if (getLocalStorageUserArray[i].id === "123abcABC") {
				return true;
			}
		}
		return false;
	};

	static createMockUser = () => {
		if (this.mockUserExists()) {
			return;
		}
		this.setMockUser();
	};
}

export default MockUser;
