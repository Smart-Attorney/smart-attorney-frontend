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
}
