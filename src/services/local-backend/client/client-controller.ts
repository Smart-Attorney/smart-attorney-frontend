import { ClientService } from "./client-service";

export class ClientController {
	private clientService: ClientService;

	constructor() {
		this.clientService = new ClientService();
	}

	public async createClient(request: Request): Promise<Response> {
		const newClient = await request.json();
		const createdClient = await this.clientService.create(newClient);
		if (createdClient !== null) {
			const body = JSON.stringify(createdClient);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the client.");
		}
	}

	public async getClient(request: Request): Promise<Response> {
		const urlArray = request.url.split("/");
		const caseId = urlArray[urlArray.length - 1];
		const retrievedClient = await this.clientService.getByCaseId(caseId);
		if (retrievedClient !== null) {
			const body = JSON.stringify(retrievedClient);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case client information.");
		}
	}
}
