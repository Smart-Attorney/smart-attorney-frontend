import { SqlTables } from "./sql-tables";
import { Users } from "./table-schemas";

export class MockUser {
	private static mockUser: Users = Object.freeze({
		user_id: "12345abcdeABCDE0",
		first_name: "Jane",
		last_name: "Doe",
		firm_name: "Attorney Law Group",
		company_email: "lawyer@email.com",
		email: "personal@email.com",
		password: "password123",
	});

	private static set(): void {
		const userTable: Users[] = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER) as string);
		const updatedUserTable: Users[] = [this.mockUser, ...userTable];
		localStorage.setItem(SqlTables.TABLE.USER, JSON.stringify(updatedUserTable));
	}

	private static exists(): boolean {
		const userTable: Users[] = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER) as string);
		const mockUser = JSON.stringify(this.mockUser);
		for (let i = 0, n = userTable.length; i < n; i++) {
			const userInTable = JSON.stringify(userTable[i]);
			if (mockUser === userInTable) {
				return true;
			}
		}
		return false;
	}

	private static removeDeprecated(): void {
		const uniqueUsersArray = [];
		const mockUserArray = [];
		const userArray = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER) as string);
		for (let i = 0, n = userArray.length; i < n; i++) {
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
		const updatedArray = [...uniqueUsersArray];
		localStorage.setItem(SqlTables.TABLE.USER, JSON.stringify(updatedArray));
	}

	public static create() {
		if (this.exists()) return;
		this.removeDeprecated();
		this.set();
	}
}
