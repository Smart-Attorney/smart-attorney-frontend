import { UserAuthEntity, UserEntity } from "./entities";
import { SqlTables } from "./sql-tables";

export class MockUser {
	private static mockUser: UserEntity = {
		user_id: "12345abcdeABCDE0000",
		first_name: "Jane",
		last_name: "Doe",
		firm_name: "Attorney Law Group",
		company_email: "lawyer@email.com",
		// password: "password123",
	};

	private static mockUserAuth: UserAuthEntity = {
		user_auth_id: "12345abcdeABCDE1111",
		company_email: "lawyer@email.com",
		salt: "$2a$15$1SbYDpXwQ6r904RSwsgQsO",
		password_hash: "$2a$15$1SbYDpXwQ6r904RSwsgQsOXojpQfc/xDY12nEc9/FvzWAXDx3CM9W",
	};

	private static setMockUser(): void {
		const userTable: UserEntity[] = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER) as string);
		const updatedUserTable: UserEntity[] = [this.mockUser, ...userTable];
		localStorage.setItem(SqlTables.TABLE.USER, JSON.stringify(updatedUserTable));
	}

	private static doesMockUserExist(): boolean {
		const userTable: UserEntity[] = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER) as string);
		const mockUser = JSON.stringify(this.mockUser);
		for (let i = 0, n = userTable.length; i < n; i++) {
			const userInTable = JSON.stringify(userTable[i]);
			if (mockUser === userInTable) {
				return true;
			}
		}
		return false;
	}

	private static removeMockUsers(): void {
		const uniqueUsersArray: UserEntity[] = [];
		const mockUserArray: UserEntity[] = [];
		const userArray: UserEntity[] = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER) as string);
		for (let i = 0, n = userArray.length; i < n; i++) {
			const firstNameMatch = userArray[i].first_name === this.mockUser.first_name;
			const lastNameMatch = userArray[i].last_name === this.mockUser.last_name;
			const companyEmailMatch = userArray[i].company_email === this.mockUser.company_email;
			if (firstNameMatch && lastNameMatch && companyEmailMatch) {
				mockUserArray.push(userArray[i]);
			} else {
				uniqueUsersArray.push(userArray[i]);
			}
		}
		const updatedArray = [...uniqueUsersArray];
		localStorage.setItem(SqlTables.TABLE.USER, JSON.stringify(updatedArray));
	}

	private static setMockUserAuth(): void {
		const userAuthTable: UserAuthEntity[] = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER_AUTH) as string);
		const updatedUserAuthTable: UserAuthEntity[] = [this.mockUserAuth, ...userAuthTable];
		localStorage.setItem(SqlTables.TABLE.USER_AUTH, JSON.stringify(updatedUserAuthTable));
	}

	private static doesMockUserAuthExist(): boolean {
		const userAuthTable: UserAuthEntity[] = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER_AUTH) as string);
		const mockUserAuth = JSON.stringify(this.mockUserAuth);
		for (let i = 0, n = userAuthTable.length; i < n; i++) {
			const userAuthInTable = JSON.stringify(userAuthTable[i]);
			if (mockUserAuth === userAuthInTable) {
				return true;
			}
		}
		return false;
	}

	private static removeMockUserAuths(): void {
		const uniqueUserAuthsArray: UserAuthEntity[] = [];
		const mockUserAuthArray: UserAuthEntity[] = [];
		const userAuthArray: UserAuthEntity[] = JSON.parse(localStorage.getItem(SqlTables.TABLE.USER_AUTH) as string);
		for (let i = 0, n = userAuthArray.length; i < n; i++) {
			const companyEmailMatch = userAuthArray[i].company_email === this.mockUserAuth.company_email;
			const saltMatch = userAuthArray[i].salt === this.mockUserAuth.salt;
			const passwordHashMatch = userAuthArray[i].password_hash === this.mockUserAuth.password_hash;
			if (companyEmailMatch && saltMatch && passwordHashMatch) {
				mockUserAuthArray.push(userAuthArray[i]);
			} else {
				uniqueUserAuthsArray.push(userAuthArray[i]);
			}
		}
		const updatedArray = [...uniqueUserAuthsArray];
		localStorage.setItem(SqlTables.TABLE.USER_AUTH, JSON.stringify(updatedArray));
	}

	public static create() {
		if (!this.doesMockUserExist()) {
			this.removeMockUsers();
			this.setMockUser();
		}
		if (!this.doesMockUserAuthExist()) {
			this.removeMockUserAuths();
			this.setMockUserAuth();
		}
	}
}
