import { Uuid } from "../../../lib/uuid";
import { DatabaseConnection } from "../../local-database/database-connection";
import { UserAuthEntity } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class UserAuthDAO {
	private USER_AUTH_KEY = SqlTables.TABLE.USER_AUTH;
	private dbConn: DatabaseConnection;
	private uuid: Uuid;

	constructor() {
		this.dbConn = new DatabaseConnection();
		this.uuid = new Uuid();
	}

	public async get(userId: string): Promise<UserAuthEntity | null> {
		const userAuths: UserAuthEntity[] = await this.dbConn.getArray(this.USER_AUTH_KEY);
		for (let i = 0, n = userAuths.length; i < n; i++) {
			if (userAuths[i].user_auth_id === userId) {
				const userAuthDetails: UserAuthEntity = {
					user_auth_id: userAuths[i].user_auth_id,
					company_email: userAuths[i].company_email,
					salt: userAuths[i].salt,
					password_hash: userAuths[i].password_hash,
				};
				return userAuthDetails;
			}
		}
		return null;
	}

	public async getSaltByCompanyEmail(companyEmail: string): Promise<string | null> {
		const userAuths: UserAuthEntity[] = await this.dbConn.getArray(this.USER_AUTH_KEY);
		for (let i = 0, n = userAuths.length; i < n; i++) {
			if (userAuths[i].company_email === companyEmail) {
				return userAuths[i].salt;
			}
		}
		return null;
	}

	public async getPasswordHashByCompanyEmail(companyEmail: string): Promise<string | null> {
		const userAuths: UserAuthEntity[] = await this.dbConn.getArray(this.USER_AUTH_KEY);
		for (let i = 0, n = userAuths.length; i < n; i++) {
			if (userAuths[i].company_email === companyEmail) {
				return userAuths[i].password_hash;
			}
		}
		return null;
	}

	public async save(companyEmail: string, salt: string, passwordHash: string): Promise<boolean> {
		const userAuths: UserAuthEntity[] = await this.dbConn.getArray(this.USER_AUTH_KEY);
		const newUserAuth: UserAuthEntity = {
			user_auth_id: this.uuid.generate(),
			company_email: companyEmail,
			salt: salt,
			password_hash: passwordHash,
		};
		const newUserAuthsArr = [...userAuths, newUserAuth];
		const success = await this.dbConn.setArray(this.USER_AUTH_KEY, newUserAuthsArr);
		if (success) {
			return true;
		}
		return false;
	}
}
