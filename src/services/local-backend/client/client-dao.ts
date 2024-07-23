import { nanoid } from "../../../lib/nanoid";
import { DatabaseConnection } from "../../local-database/database-connection";
import { ClientEntity, sex_option } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class ClientDAO {
	private CLIENT_KEY = SqlTables.TABLE.CLIENT;
	private dbConn: DatabaseConnection;

	constructor() {
		this.dbConn = new DatabaseConnection();
	}

	public async getByCaseId(caseId: string): Promise<ClientEntity | null> {
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].fk_case_id === caseId) {
				return clients[i];
			}
		}
		return null;
	}

	public async get(clientId: string): Promise<ClientEntity | null> {
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].client_id === clientId) {
				return clients[i];
			}
		}
		return null;
	}

	public async save(
		caseId: string,
		firstName: string,
		middleName: string,
		lastName: string,
		dateOfBirth: number,
		sex: sex_option,
		countryOfCitizenship: string,
		primaryLanguage: string
	): Promise<string | null> {
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		const newClient: ClientEntity = {
			client_id: nanoid(20),
			first_name: firstName,
			middle_name: middleName,
			last_name: lastName,
			date_of_birth: dateOfBirth,
			sex: sex,
			country_of_citizenship: countryOfCitizenship,
			primary_language: primaryLanguage,
			fk_case_id: caseId,
		};
		const newClientsArr = [...clients, newClient];
		const success = await this.dbConn.setArray(this.CLIENT_KEY, newClientsArr);
		if (success) {
			return newClient.client_id;
		}
		return null;
	}

	public async deleteByCaseId(caseId: string): Promise<boolean> {
		const newClientsArr: ClientEntity[] = [];
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].fk_case_id === caseId) {
				continue;
			}
			newClientsArr.push(clients[i]);
		}
		const success = await this.dbConn.setArray(this.CLIENT_KEY, newClientsArr);
		if (success) {
			return true;
		}
		return false;
	}
}
