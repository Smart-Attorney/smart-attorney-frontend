import { RegisterCredentialsDTO } from "../../../features/register/api/register";
import { nanoid } from "../../../lib/nanoid";
import { UserEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";
import { DatabaseConnection } from "../../local-database/database-connection";

export class UserDAO extends DatabaseConnection {
	private static USER_STORAGE_KEY = SqlTables.TABLE.USER;

	static async getUserIdByCompanyEmail(companyEmail: string) {
		const userArray: UserEntity[] = await super.getArray(this.USER_STORAGE_KEY);
		for (let i = 0, n = userArray.length; i < n; i++) {
			if (userArray[i].company_email === companyEmail) {
				return userArray[i].user_id;
			}
		}
		return null;
	}

	static async getUserIdByPassword(password: string) {
		const userArray: UserEntity[] = await super.getArray(this.USER_STORAGE_KEY);
		for (let i = 0, n = userArray.length; i < n; i++) {
			if (userArray[i].password === password) {
				return userArray[i].user_id;
			}
		}
		return null;
	}

	static async getUserById(userId: string) {
		const userArray: UserEntity[] = await super.getArray(this.USER_STORAGE_KEY);
		for (let i = 0, n = userArray.length; i < n; i++) {
			if (userArray[i].user_id === userId) {
				return userArray[i];
			}
		}
		return null;
	}

	static async createUser(data: RegisterCredentialsDTO) {
		const userArray: UserEntity[] = await super.getArray(this.USER_STORAGE_KEY);
		const newUser: UserEntity = {
			user_id: nanoid(16),
			first_name: data.firstName,
			last_name: data.lastName,
			firm_name: data.firmName,
			company_email: data.companyEmail,
			email: "",
			password: data.password,
		};
		const updatedArray = [...userArray, newUser];
		super.setArray(this.USER_STORAGE_KEY, updatedArray);
		return newUser;
	}
}
