import { Uuid } from "../../../lib/uuid";
import { DatabaseConnection } from "../../local-database/database-connection";
import { ClientEntity, sex_option } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class ClientDAO {
	private CLIENT_KEY = SqlTables.TABLE.CLIENT;
	private dbConn: DatabaseConnection;
	private uuid: Uuid;

	constructor() {
		this.dbConn = new DatabaseConnection();
		this.uuid = new Uuid();
	}

	public async getAllByCaseId(caseUuid: string): Promise<ClientEntity[]> {
		const caseClients: ClientEntity[] = [];
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].fk_case_id === caseUuid) {
				caseClients.push(clients[i]);
			}
		}
		return caseClients;
	}

	public async getByCaseId(caseUuid: string): Promise<ClientEntity | null> {
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].fk_case_id === caseUuid) {
				return clients[i];
			}
		}
		return null;
	}

	public async get(clientUuid: string): Promise<ClientEntity | null> {
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].client_id === clientUuid) {
				return clients[i];
			}
		}
		return null;
	}

	public async save(
		caseUuid: string,
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
			client_id: this.uuid.generate(),
			first_name: firstName,
			middle_name: middleName,
			last_name: lastName,
			date_of_birth: dateOfBirth,
			sex: sex,
			country_of_citizenship: countryOfCitizenship,
			primary_language: primaryLanguage,
			fk_case_id: caseUuid,
		};
		const newClientsArr = [...clients, newClient];
		const success = await this.dbConn.setArray(this.CLIENT_KEY, newClientsArr);
		if (success) {
			return newClient.client_id;
		}
		return null;
	}

	public async deleteAllByCaseId(caseUuid: string): Promise<boolean> {
		const newClientsArr: ClientEntity[] = [];
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].fk_case_id === caseUuid) {
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

	public async deleteByCaseId(caseUuid: string): Promise<boolean> {
		const newClientsArr: ClientEntity[] = [];
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].fk_case_id === caseUuid) {
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
