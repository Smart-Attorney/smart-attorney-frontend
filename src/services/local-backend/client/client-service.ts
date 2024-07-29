import { ShortUuid } from "../../../lib/short-uuid";
import { Uuid } from "../../../lib/uuid";
import { Client } from "../../../types/api";
import { sex_option } from "../../local-database/entities";
import { ClientDAO } from "./client-dao";

export class ClientService {
	private clientDao: ClientDAO;
	private shortUuid: ShortUuid;
	private uuid: Uuid;

	constructor() {
		this.clientDao = new ClientDAO();
		this.shortUuid = new ShortUuid();
		this.uuid = new Uuid();
	}

	public async getClientByCaseId(caseShortId: string): Promise<Client | null> {
		if (!caseShortId) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;

		const client = await this.clientDao.getByCaseId(caseUuid);
		if (client !== null) {
			const retrievedClient: Client = {
				id: this.shortUuid.toShort(client.client_id),
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

	public async getClient(clientShortId: string): Promise<Client | null> {
		if (!clientShortId) return null;
		const clientUuid = this.shortUuid.toUUID(clientShortId);
		if (!this.uuid.isValid(clientUuid)) return null;
		const client = await this.clientDao.get(clientUuid);
		if (client !== null) {
			const retrievedClient: Client = {
				id: this.shortUuid.toShort(client.client_id),
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
		caseShortId: string,
		firstName: string,
		middleName: string,
		lastName: string,
		dateOfBirth: number,
		sex: sex_option,
		countryOfCitizenship: string,
		primaryLanguage: string
	): Promise<Client | null> {
		if (!caseShortId) return null;
		const caseUuid = this.shortUuid.toUUID(caseShortId);
		if (!this.uuid.isValid(caseUuid)) return null;
		const newClientUuid = await this.clientDao.save(
			caseUuid,
			firstName,
			middleName,
			lastName,
			dateOfBirth,
			sex,
			countryOfCitizenship,
			primaryLanguage
		);
		if (newClientUuid !== null) {
			const newClientShortId = this.shortUuid.toShort(newClientUuid);
			return this.getClient(newClientShortId);
		}
		return null;
	}
}
