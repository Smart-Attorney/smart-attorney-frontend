import { CreateClientDTO } from "../../../features/create-case-folder/api/create-client";
import { ClientService } from "./client-service";

export class ClientController {
	private clientService: ClientService;

	constructor() {
		this.clientService = new ClientService();
	}

	public async getClientByCaseIdHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const retrievedClient = await this.clientService.getClientByCaseId(caseId);
		if (retrievedClient !== null) {
			const body = JSON.stringify({ data: retrievedClient });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case client information.");
		}
	}

	public async postClientHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const body: CreateClientDTO = await request.json();
		const { firstName, middleName, lastName, dateOfBirth, sex, countryOfCitizenship, primaryLanguage } = body;
		const createdClient = await this.clientService.addClient(
			caseId,
			firstName,
			middleName,
			lastName,
			dateOfBirth,
			sex,
			countryOfCitizenship,
			primaryLanguage
		);
		if (createdClient !== null) {
			const body = JSON.stringify({ data: createdClient });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the client.");
		}
	}

	public async deleteAllClientsByCaseIdHandler(request: Request): Promise<Response> {
		const authHeader = request.headers.get("Authorization");
		if (!authHeader) {
			throw new Error("User is not authorized/signed in.");
		}
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 2];
		const deletedClients = await this.clientService.deleteAllClientsByCaseId(caseId);
		if (deletedClients !== null) {
			const body = JSON.stringify({ data: deletedClients });
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with deleting the case clients.");
		}
	}
}
