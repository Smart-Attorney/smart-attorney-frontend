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
		const userArray: Users[] = JSON.parse(localStorage.getItem("users") as string);
		const updatedArray: Users[] = [this.mockUser, ...userArray];
		localStorage.setItem("users", JSON.stringify(updatedArray));
	};

	static removeOldMockUser = (): void => {
		const uniqueUsersArray = [];
		const mockUserArray = [];
		const trueJaneDoe = [];
		const userArray = JSON.parse(localStorage.getItem("users") as string);
		for (let i = 0; i < userArray.length; i++) {
			const firstNameMatch = userArray[i].first_name === this.mockUser.first_name;
			const lastNameMatch = userArray[i].last_name === this.mockUser.last_name;
			const companyEmailMatch = userArray[i].company_email === this.mockUser.company_email;
			const passwordMatch = userArray[i].password === this.mockUser.password;
			if (firstNameMatch && lastNameMatch && companyEmailMatch && passwordMatch) {
				mockUserArray.push(userArray[i]);
			} else {
				uniqueUsersArray.push(userArray[i]);
			}
		}
		for (let i = 0; i < mockUserArray.length; i++) {
			const idMatch = userArray[i].user_id === this.mockUser.user_id;
			if (idMatch) {
				trueJaneDoe.push(mockUserArray[i]);
			}
		}
		const updatedArray = [...trueJaneDoe, ...uniqueUsersArray];
		localStorage.setItem("users", JSON.stringify(updatedArray));
	};

	static mockUserExists = (): boolean => {
		const userArray: Users[] = JSON.parse(localStorage.getItem("users") as string);
		for (let i = 0; i < userArray.length; i++) {
			const idMatch = userArray[i].user_id === this.mockUser.user_id;
			const firstNameMatch = userArray[i].first_name === this.mockUser.first_name;
			const lastNameMatch = userArray[i].last_name === this.mockUser.last_name;
			const firmNameMatch = userArray[i].firm_name === this.mockUser.firm_name;
			const companyEmailMatch = userArray[i].company_email === this.mockUser.company_email;
			const passwordMatch = userArray[i].password === this.mockUser.password;
			if (idMatch && firstNameMatch && lastNameMatch && firmNameMatch && companyEmailMatch && passwordMatch) {
				return true;
			}
		}
		return false;
	};

	static createMockUser = () => {
		if (this.mockUserExists()) {
			this.removeOldMockUser();
			return;
		}
		this.setMockUser();
	};
}
