type RequestBody = string | FormData;

export class FetchWrapper {
	private static POST = "POST";
	private static GET = "GET";
	private static PUT = "PUT";
	private static PATCH = "PATCH";
	private static DELETE = "DELETE";

  private static baseUrl = process.env.LOCAL_HOST_PORT;

	static getToken() {
		let token = "";
		const currentUser = sessionStorage.getItem("current_user");
		if (currentUser) {
			token = currentUser;
		}
		return token;
	}

	static get(endpoint: string) {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.GET,
			headers: { Authorization: this.getToken() },
		};
		return fetch(absoluteUrl, options);
	}

	static post(endpoint: string, body: RequestBody) {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.POST,
			headers: { "Content-Type": "application/json", Authorization: this.getToken() },
			body: body,
		};
		return fetch(absoluteUrl, options);
	}

	static put(endpoint: string, body: RequestBody) {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.PUT,
			headers: { "Content-Type": "application/json", Authorization: this.getToken() },
			body: body,
		};
		return fetch(absoluteUrl, options);
	}

	static patch(endpoint: string, body: RequestBody) {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.PATCH,
			headers: { "Content-Type": "application/json", Authorization: this.getToken() },
			body: body,
		};
		return fetch(absoluteUrl, options);
	}

	static delete(endpoint: string) {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.DELETE,
			headers: { Authorization: this.getToken() },
		};
		return fetch(absoluteUrl, options);
	}
}
