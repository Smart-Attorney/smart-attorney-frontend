import { nanoid } from "../../../lib/nanoid";
import { ClientObj } from "../../../utils/types";
import { ClientEntity, sex_options } from "../../local-database/entities";
import { SqlTables } from "../../local-database/sql-tables";
import { DatabaseConnection } from "../../local-database/database-connection";

export class ClientDAO extends DatabaseConnection {
	private static CLIENT_STORAGE_KEY = SqlTables.TABLE.CLIENT;

	static async getClientByCaseFolderId(caseFolderId: string) {
		const clientArray: ClientEntity[] = await super.getArray(this.CLIENT_STORAGE_KEY);
		for (let i = 0, n = clientArray.length; i < n; i++) {
			if (clientArray[i].case_folder_id_fk === caseFolderId) {
				const caseFolderClient: ClientObj = {
					id: clientArray[i].client_id,
					firstName: clientArray[i].first_name,
					middleName: clientArray[i].middle_name,
					lastName: clientArray[i].last_name,
					dateOfBirth: clientArray[i].date_of_birth,
					sex: clientArray[i].sex,
					countryOfCitizenship: clientArray[i].country_of_citizenship,
					primaryLanguage: clientArray[i].primary_language,
				};
				return caseFolderClient;
			}
		}
		return null;
	}

	static async addNewClient(
		firstName: string,
		middleName: string,
		lastName: string,
		DOB: number,
		sex: sex_options,
		country: string,
		language: string,
		caseFolderId: string
	) {
		const clientArray: ClientEntity[] = await super.getArray(this.CLIENT_STORAGE_KEY);
		const newClient: ClientEntity = {
			client_id: nanoid(8),
			first_name: firstName,
			middle_name: middleName,
			last_name: lastName,
			date_of_birth: DOB,
			sex: sex,
			country_of_citizenship: country,
			primary_language: language,
			case_folder_id_fk: caseFolderId,
		};
		const updatedArray = [...clientArray, newClient];
		const success = await super.setArray(this.CLIENT_STORAGE_KEY, updatedArray);
		if (success) {
			return newClient;
		}
		return null;
	}

	static async deleteClientByFolderId(folderId: string) {
		const updatedArray: ClientEntity[] = [];
		const clientArray: ClientEntity[] = await super.getArray(this.CLIENT_STORAGE_KEY);
		for (let i = 0, n = clientArray.length; i < n; i++) {
			if (clientArray[i].case_folder_id_fk === folderId) {
				continue;
			}
			updatedArray.push(clientArray[i]);
		}
		const success = await super.setArray(this.CLIENT_STORAGE_KEY, updatedArray);
		if (success) {
			return true;
		}
		return false;
	}
}
