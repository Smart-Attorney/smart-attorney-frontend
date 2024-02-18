import { RegisterCredentialsDTO } from "../../../features/register/api/register";
import { nanoid } from "../../../lib/nanoid";
import { Users } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { DAO } from "./dao";

export class UserDAO extends DAO {
	static USER_STORAGE_KEY = MockSqlTables.USERS;

	static async getUserIdByCompanyEmail(companyEmail: string) {
		const userArray: Users[] = await super.getArray(this.USER_STORAGE_KEY);
		for (let i = 0; i < userArray.length; i++) {
			if (userArray[i].company_email === companyEmail) {
				return userArray[i].user_id;
			}
		}
		return null;
	}

	static async getUserIdByPassword(password: string) {
		const userArray: Users[] = await super.getArray(this.USER_STORAGE_KEY);
		for (let i = 0; i < userArray.length; i++) {
			if (userArray[i].password === password) {
				return userArray[i].user_id;
			}
		}
		return null;
	}

	static async getUserById(userId: string) {
		const userArray: Users[] = await super.getArray(this.USER_STORAGE_KEY);
		for (let i = 0; i < userArray.length; i++) {
			if (userArray[i].user_id === userId) {
				return userArray[i];
			}
		}
		return null;
	}

	static async createUser(data: RegisterCredentialsDTO) {
		const userArray: Users[] = await super.getArray(this.USER_STORAGE_KEY);
		const newUser: Users = {
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
