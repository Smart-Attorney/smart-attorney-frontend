import { Users } from "./schemas";

export class MockUser {
	static mockUser: Users = Object.freeze({
		user_id: "12345abcdeABCDE0",
		first_name: "Jane",
		last_name: "Doe",
		firm_name: "Attorney Law Group",
		company_email: "lawyer@email.com",
		email: "lawyer@email.com",
		password: "password123",
	});

	static setMockUser = (): void => {
		const userArray: Users[] = JSON.parse(localStorage.getItem("users") as string);
		const updatedArray: Users[] = [this.mockUser, ...userArray];
		localStorage.setItem("users", JSON.stringify(updatedArray));
	};

	static filterOldMockUsers = (): void => {
		const uniqueUsersArray = [];
		const mockUserArray = [];
		const userArray = JSON.parse(localStorage.getItem("users") as string);
		for (let i = 0; i < userArray.length; i++) {
			const fNameMatch = userArray[i].first_name === this.mockUser.first_name;
			const lNameMatch = userArray[i].last_name === this.mockUser.last_name;
			const cEmailMatch = userArray[i].company_email === this.mockUser.company_email;
			const passMatch = userArray[i].password === this.mockUser.password;
			if (fNameMatch && lNameMatch && cEmailMatch && passMatch) {
				mockUserArray.push(userArray[i]);
			} else {
				uniqueUsersArray.push(userArray[i]);
			}
		}
		const updatedArray = [...uniqueUsersArray];
		localStorage.setItem("users", JSON.stringify(updatedArray));
	};

	static mockUserExists = (): boolean => {
		const userArray: Users[] = JSON.parse(localStorage.getItem("users") as string);
		for (let i = 0; i < userArray.length; i++) {
			const idMatch = userArray[i].user_id === this.mockUser.user_id;
			const fNameMatch = userArray[i].first_name === this.mockUser.first_name;
			const lNameMatch = userArray[i].last_name === this.mockUser.last_name;
			const firmMatch = userArray[i].firm_name === this.mockUser.firm_name;
			const cEmailMatch = userArray[i].company_email === this.mockUser.company_email;
			const passMatch = userArray[i].password === this.mockUser.password;
			if (idMatch && fNameMatch && lNameMatch && firmMatch && cEmailMatch && passMatch) {
				return true;
			}
		}
		return false;
	};

	static createMockUser = () => {
		if (this.mockUserExists()) {
			return;
		}
		try {
			this.filterOldMockUsers();
		} catch (error) {
			console.log(error);
		} finally {
			this.setMockUser();
		}
	};

	// removing deprecated local storage data
	static removeCurrentUserFromLocalStorage = () => {
		localStorage.removeItem("current_user");
	};
	static removeClientInfoWithBlankSpaceFromLocalStorage = () => {
		localStorage.removeItem(" client_info");
	};
}
