import { RegisterUserDTO } from "../../../features/register/api/register";
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

	public async getById(userId: string): Promise<UserEntity | null> {
		const users: UserEntity[] = await this.dbConn.getArray(this.USER_KEY);
		for (let i = 0, n = users.length; i < n; i++) {
			if (users[i].user_id === userId) {
				return users[i];
			}
		}
		return null;
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

	public async getIdByPassword(password: string): Promise<string | null> {
		const users: UserEntity[] = await this.dbConn.getArray(this.USER_KEY);
		for (let i = 0, n = users.length; i < n; i++) {
			if (users[i].password === password) {
				return users[i].user_id;
			}
		}
		return null;
	}

	public async getByCompanyEmailAndPassword(companyEmail: string, password: string): Promise<UserEntity | null> {
		const users: UserEntity[] = await this.dbConn.getArray(this.USER_KEY);
		for (let i = 0, n = users.length; i < n; i++) {
			if (users[i].company_email === companyEmail && users[i].password === password) {
				return users[i];
			}
		}
		return null;
	}

	public async add(data: RegisterUserDTO): Promise<UserEntity | null> {
		const users: UserEntity[] = await this.dbConn.getArray(this.USER_KEY);
		const newUser: UserEntity = {
			user_id: nanoid(20),
			first_name: data.firstName,
			last_name: data.lastName,
			firm_name: data.firmName,
			company_email: data.companyEmail,
			password: data.password,
		};
		const newUsersArr = [...users, newUser];
		const success = await this.dbConn.setArray(this.USER_KEY, newUsersArr);
		if (success) {
			return newUser;
		}
		return null;
	}
}
