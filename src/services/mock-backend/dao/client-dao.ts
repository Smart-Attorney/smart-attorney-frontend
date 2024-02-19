import { nanoid } from "../../../lib/nanoid";
import { ClientObj } from "../../../utils/types";
import { Clients, sex_options } from "../../mock-sql/schemas";
import { MockSqlTables } from "../../mock-sql/tables";
import { DAO } from "./dao";

export class ClientDAO extends DAO {
	static CLIENT_STORAGE_KEY = MockSqlTables.CLIENTS;

	static async getAllClientsByCaseFolderId(caseFolderId: string) {
		const clientArray: Clients[] = await super.getArray(this.CLIENT_STORAGE_KEY);
		for (let i = 0; i < clientArray.length; i++) {
			if (clientArray[i].case_folder_id_fk === caseFolderId) {
				const caseFolderClient: ClientObj = {
					id: clientArray[i].client_id,
					firstName: clientArray[i].first_name,
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
		fName: string,
		lName: string,
		DOB: number,
		sex: sex_options,
		country: string,
		language: string,
		caseFolderId: string
	) {
		const clientArray: Clients[] = await super.getArray(this.CLIENT_STORAGE_KEY);
		const newClient: Clients = {
			client_id: nanoid(8),
			first_name: fName,
			last_name: lName,
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
}