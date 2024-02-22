import { ClientService } from "../service/client-service";

export class ClientController {
	static async createClient(request: Request) {
		const newClient = await request.json();
		const createdClient = await ClientService.createClient(newClient);
		if (createdClient !== null) {
			const body = JSON.stringify(createdClient);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with creating the client.");
		}
	}

	static async getClient(request: Request) {
		const urlArray = request.url.split("/");
		const folderId = urlArray[urlArray.length - 1];
		const retrievedClient = await ClientService.getClient(folderId);
		if (retrievedClient !== null) {
			const body = JSON.stringify(retrievedClient);
			const options = { status: 200 };
			return new Response(body, options);
		} else {
			throw new Error("There was an issue with retrieving the case client information.");
		}
	}
}
