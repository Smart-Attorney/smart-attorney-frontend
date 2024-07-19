import { CreateClientDTO } from "../../../features/create-case-folder/api/create-client";
import { ClientObj } from "../../../types/api";
import { ClientEntity } from "../../local-database/entities";
import { ClientDAO } from "./client-dao";

export class ClientService {
	private clientDao: ClientDAO;

	constructor() {
		this.clientDao = new ClientDAO();
	}

	public async getClientByCaseId(caseId: string): Promise<ClientObj | null> {
		if (!caseId) return null;
		const retrievedClient = await this.clientDao.getByCaseId(caseId);
		if (retrievedClient !== null) {
			return retrievedClient;
		}
		return null;
	}

	public async addClient(caseId: string, client: CreateClientDTO): Promise<ClientEntity | null> {
		if (!caseId || !client) return null;
		const newClient = await this.clientDao.save(
			client.firstName,
			client.middleName,
			client.lastName,
			client.dateOfBirth,
			client.sex,
			client.countryOfCitizenship,
			client.primaryLanguage,
			caseId
		);
		if (newClient !== null) {
			return newClient;
		}
		return null;
	}
}
