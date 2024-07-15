import { CreateClientDTO } from "../../../features/create-case-folder/api/create-client";
import { ClientObj } from "../../../types/api";
import { ClientEntity } from "../../local-database/entities";
import { ClientDAO } from "./client-dao";

export class ClientService {
	private clientDao: ClientDAO;

	constructor() {
		this.clientDao = new ClientDAO();
	}

	public async create(client: CreateClientDTO): Promise<ClientEntity | null> {
		if (!client) return null;
		const { firstName, middleName, lastName, dateOfBirth, sex, countryOfCitizenship, primaryLanguage, caseId } = client;
		const newClient = await this.clientDao.add(
			firstName,
			middleName,
			lastName,
			dateOfBirth,
			sex,
			countryOfCitizenship,
			primaryLanguage,
			caseId
		);
		if (newClient !== null) {
			return newClient;
		}
		return null;
	}

	public async getByCaseId(caseId: string): Promise<ClientObj | null> {
		if (!caseId) return null;
		const retrievedClient = await this.clientDao.getByCaseId(caseId);
		if (retrievedClient !== null) {
			return retrievedClient;
		}
		return null;
	}
}
