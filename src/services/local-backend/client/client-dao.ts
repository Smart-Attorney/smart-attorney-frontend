import { nanoid } from "../../../lib/nanoid";
import { ClientObj } from "../../../types/api";
import { DatabaseConnection } from "../../local-database/database-connection";
import { ClientEntity, sex_option } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";

export class ClientDAO {
	private CLIENT_KEY = SqlTables.TABLE.CLIENT;
	private dbConn: DatabaseConnection;

	constructor() {
		this.dbConn = new DatabaseConnection();
	}

	public async getByCaseId(caseId: string): Promise<ClientObj | null> {
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		for (let i = 0, n = clients.length; i < n; i++) {
			if (clients[i].fk_case_id === caseId) {
				const caseClient: ClientObj = {
					id: clients[i].client_id,
					firstName: clients[i].first_name,
					middleName: clients[i].middle_name,
					lastName: clients[i].last_name,
					dateOfBirth: clients[i].date_of_birth,
					sex: clients[i].sex,
					countryOfCitizenship: clients[i].country_of_citizenship,
					primaryLanguage: clients[i].primary_language,
				};
				return caseClient;
			}
		}
		return null;
	}

	public async save(
		firstName: string,
		middleName: string,
		lastName: string,
		DOB: number,
		sex: sex_option,
		country: string,
		language: string,
		caseId: string
	): Promise<ClientEntity | null> {
		const clients: ClientEntity[] = await this.dbConn.getArray(this.CLIENT_KEY);
		const newClient: ClientEntity = {
			client_id: nanoid(20),
			first_name: firstName,
			middle_name: middleName,
			last_name: lastName,
			date_of_birth: DOB,
			sex: sex,
			country_of_citizenship: country,
			primary_language: language,
			fk_case_id: caseId,
		};
		const newClientsArr = [...clients, newClient];
		const success = await this.dbConn.setArray(this.CLIENT_KEY, newClientsArr);
		if (success) {
			return newClient;
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
