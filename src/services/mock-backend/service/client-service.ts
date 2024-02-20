import { CreateClientDTO } from "../../../features/create-case-folder/api/create-client";
import { ClientDAO } from "../dao/client-dao";

export class ClientService {
	static async createClient(client: CreateClientDTO) {
		if (!client) {
			return null;
		}
		const { firstName, lastName, dateOfBirth, sex, countryOfCitizenship, primaryLanguage, caseFolderId } = client;
		const newClient = await ClientDAO.addNewClient(
			firstName,
			lastName,
			dateOfBirth,
			sex,
			countryOfCitizenship,
			primaryLanguage,
			caseFolderId
		);
		if (newClient !== null) {
			return newClient;
		}
		return null;
	}
}
