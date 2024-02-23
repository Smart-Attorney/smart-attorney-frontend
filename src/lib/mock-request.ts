export class mockRequest {
	private static POST = "POST";
	private static GET = "GET";
	private static PUT = "PUT";
	private static DELETE = "DELETE";

	static getToken() {
		// const currentUser = localStorage.getItem("current_user");
		const currentUser = sessionStorage.getItem("current_user");
		if (currentUser) {
			const token = currentUser;
			return token;
		}
		return "";
	}

	static post(url: string, data: unknown): Request {
		const options = {
			method: this.POST,
			headers: { Authorization: this.getToken() },
			body: JSON.stringify(data),
		};
		const request = new Request(url, options);
		return request;
	}

	// get requests cannot have a body
	static get(url: string): Request {
		const options = {
			method: this.GET,
			headers: { Authorization: this.getToken() },
		};
		const request = new Request(url, options);
		return request;
	}

	static put(url: string, data: unknown): Request {
		const options = {
			method: this.PUT,
			headers: { Authorization: this.getToken() },
			body: JSON.stringify(data),
		};
		const request = new Request(url, options);
		return request;
	}

	// delete requests cannot have a body
	static delete(url: string): Request {
		const options = {
			method: this.DELETE,
			headers: { Authorization: this.getToken() },
		};
		const request = new Request(url, options);
		return request;
	}
}
