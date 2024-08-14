// for local backend

// type RequestBody = string | FormData;

export class mockRequest {
	private static GET = "GET";
	private static POST = "POST";
	private static PATCH = "PATCH";
	private static DELETE = "DELETE";

	private static baseUrl = "http://localhost:8080";

	constructor() {}

	static getToken(): string {
		let token = "";
		const currentUser = sessionStorage.getItem("current_user");
		if (currentUser) {
			token = currentUser;
		}
		return token;
	}

	// get requests cannot have a body
	static get(endpoint: string): Request {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.GET,
			headers: { Authorization: this.getToken() },
		};
		return new Request(absoluteUrl, options);
	}

	static post(endpoint: string, data: unknown): Request {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.POST,
			headers: { Authorization: this.getToken() },
			body: JSON.stringify(data),
		};
		return new Request(absoluteUrl, options);
	}

	static patch(endpoint: string, data: unknown): Request {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.PATCH,
			headers: { Authorization: this.getToken() },
			body: JSON.stringify(data),
		};
		return new Request(absoluteUrl, options);
	}

	// delete requests cannot have a body
	static delete(endpoint: string): Request {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.DELETE,
			headers: { Authorization: this.getToken() },
		};
		return new Request(absoluteUrl, options);
	}
}
