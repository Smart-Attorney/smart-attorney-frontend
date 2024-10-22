// for local backend

type RequestBody = string | FormData;

export class MockRequest {
	private GET = "GET";
	private POST = "POST";
	private PATCH = "PATCH";
	private DELETE = "DELETE";

	private baseUrl = "";

	constructor() {}

	private getToken(): string {
		let token = "";
		const currentUser = sessionStorage.getItem("current_user");
		if (currentUser) {
			token = currentUser;
		}
		return token;
	}

	// get requests cannot have a body
	public get(endpoint: string): Request {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.GET,
			headers: { Authorization: this.getToken() },
		};
		return new Request(absoluteUrl, options);
	}

	public post(endpoint: string, body: RequestBody): Request {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.POST,
			headers: { Authorization: this.getToken() },
			body: body,
		};
		return new Request(absoluteUrl, options);
	}

	public patch(endpoint: string, body: RequestBody): Request {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.PATCH,
			headers: { Authorization: this.getToken() },
			body: body,
		};
		return new Request(absoluteUrl, options);
	}

	// delete requests cannot have a body
	public delete(endpoint: string): Request {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.DELETE,
			headers: { Authorization: this.getToken() },
		};
		return new Request(absoluteUrl, options);
	}
}
