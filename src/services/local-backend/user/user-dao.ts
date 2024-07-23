import { nanoid } from "../../../lib/nanoid";
import { DatabaseConnection } from "../../local-database/database-connection";
import { UserEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class UserDAO {
	private USER_KEY = SqlTables.TABLE.USER;
	private dbConn: DatabaseConnection;

	constructor() {
		this.dbConn = new DatabaseConnection();
	}

	public async getIdByCompanyEmail(companyEmail: string): Promise<string | null> {
		const users: UserEntity[] = await this.dbConn.getArray(this.USER_KEY);
		for (let i = 0, n = users.length; i < n; i++) {
			if (users[i].company_email === companyEmail) {
				return users[i].user_id;
			}
		}
		return null;
	}

	public async get(userId: string): Promise<UserEntity | null> {
		const users: UserEntity[] = await this.dbConn.getArray(this.USER_KEY);
		for (let i = 0, n = users.length; i < n; i++) {
			if (users[i].user_id === userId) {
				return users[i];
			}
		}
		return null;
	}

	public async save(
		firstName: string,
		lastName: string,
		firmName: string,
		companyEmail: string
	): Promise<string | null> {
		const users: UserEntity[] = await this.dbConn.getArray(this.USER_KEY);
		const newUser: UserEntity = {
			user_id: nanoid(20),
			first_name: firstName,
			last_name: lastName,
			firm_name: firmName,
			company_email: companyEmail,
		};
		const newUsersArr = [...users, newUser];
		const success = await this.dbConn.setArray(this.USER_KEY, newUsersArr);
		if (success) {
			return newUser.user_id;
		}
		return null;
	}
}
