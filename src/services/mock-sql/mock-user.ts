import { Users } from "./schemas";

export class MockUser {
	static mockUser: Users = {
		user_id: "12345abcdeABCDE0",
		first_name: "Jane",
		last_name: "Doe",
		firm_name: "Attorney Law Group",
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
			const idMatch = getLocalStorageUserArray[i].user_id === this.mockUser.user_id;
			const firstNameMatch = getLocalStorageUserArray[i].first_name === this.mockUser.first_name;
			const lastNameMatch = getLocalStorageUserArray[i].last_name === this.mockUser.last_name;
			const firmNameMatch = getLocalStorageUserArray[i].firm_name === this.mockUser.firm_name;
			const companyEmailMatch = getLocalStorageUserArray[i].company_email === this.mockUser.company_email;
			const passwordMatch = getLocalStorageUserArray[i].password === this.mockUser.password;
			if (idMatch && firstNameMatch && lastNameMatch && firmNameMatch && companyEmailMatch && passwordMatch) {
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
