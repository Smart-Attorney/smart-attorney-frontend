import { CreateClientDTO } from "../../../features/create-case-folder/api/create-client";
import { ClientService } from "./client-service";

export class ClientController {
	private clientService: ClientService;

	constructor() {
		this.clientService = new ClientService();
	}

	public async getClientByCaseIdHandler(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const retrievedClient = await this.clientService.getClientByCaseId(caseId);
		if (retrievedClient !== null) {
			const body = JSON.stringify(retrievedClient);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case client information.");
		}
	}

	public async postClientHandler(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const newClient: CreateClientDTO = await request.json();
		const createdClient = await this.clientService.addClient(caseId, newClient);
		if (createdClient !== null) {
			const body = JSON.stringify(createdClient);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the client.");
		}
	}
}
