import { Client } from "../../../types/api";
import { sex_option } from "../../local-database/entities";
import { ClientDAO } from "./client-dao";

export class ClientService {
	private clientDao: ClientDAO;

	constructor() {
		this.clientDao = new ClientDAO();
	}

	public async getClientByCaseId(caseId: string): Promise<Client | null> {
		if (!caseId) return null;
		const client = await this.clientDao.getByCaseId(caseId);
		if (client !== null) {
			const retrievedClient: Client = {
				id: client.client_id,
				firstName: client.first_name,
				middleName: client.middle_name,
				lastName: client.last_name,
				dateOfBirth: client.date_of_birth,
				sex: client.sex,
				countryOfCitizenship: client.country_of_citizenship,
				primaryLanguage: client.primary_language,
			};
			return retrievedClient;
		}
		return null;
	}

	public async getClient(clientId: string): Promise<Client | null> {
		if (!clientId) return null;
		const client = await this.clientDao.get(clientId);
		if (client !== null) {
			const retrievedClient: Client = {
				id: client.client_id,
				firstName: client.first_name,
				middleName: client.middle_name,
				lastName: client.last_name,
				dateOfBirth: client.date_of_birth,
				sex: client.sex,
				countryOfCitizenship: client.country_of_citizenship,
				primaryLanguage: client.primary_language,
			};
			return retrievedClient;
		}
		return null;
	}

	public async addClient(
		caseId: string,
		firstName: string,
		middleName: string,
		lastName: string,
		dateOfBirth: number,
		sex: sex_option,
		countryOfCitizenship: string,
		primaryLanguage: string
	): Promise<Client | null> {
		if (!caseId) return null;
		const newClientId = await this.clientDao.save(
			caseId,
			firstName,
			middleName,
			lastName,
			dateOfBirth,
			sex,
			countryOfCitizenship,
			primaryLanguage
		);
		if (newClientId !== null) {
			return this.getClient(newClientId);
		}
		return null;
	}
}
