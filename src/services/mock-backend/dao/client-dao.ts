import { ClientObj } from "../../../utils/types";
import { Clients } from "../../mock-sql/schemas";
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
}
