type RequestBody = string | FormData;

export class FetchWrapper {
	private GET = "GET";
	private POST = "POST";
	private PUT = "PUT";
	private PATCH = "PATCH";
	private DELETE = "DELETE";

	private baseUrl = process.env.LOCAL_SERVER_HOST;

	constructor() {}

	private getToken(): string {
		let token = "";
		const currentUser = sessionStorage.getItem("current_user");
		if (currentUser) {
			token = currentUser;
		}
		return token;
	}

	public get(endpoint: string): Promise<Response> {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.GET,
			headers: { Authorization: this.getToken() },
		};
		return fetch(absoluteUrl, options);
	}

	public post(endpoint: string, body: RequestBody): Promise<Response> {
		const absoluteUrl = this.baseUrl + endpoint;
		const myHeaders = new Headers();
		// Sending formData using "fetch" from frontend with a "Content-Type" header set yourself
		// results in request being parsed incorrectly in the backend.
		// Sources:
		// https://stackoverflow.com/questions/67996124/unable-to-load-file-due-to-multipart-boundary-not-found
		// https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post
		const isFormData = body instanceof FormData;
		!isFormData && myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", this.getToken());
		const options = {
			method: this.POST,
			headers: myHeaders,
			body: body,
		};
		return fetch(absoluteUrl, options);
	}

	public put(endpoint: string, body: RequestBody): Promise<Response> {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.PUT,
			headers: { "Content-Type": "application/json", Authorization: this.getToken() },
			body: body,
		};
		return fetch(absoluteUrl, options);
	}

	public patch(endpoint: string, body: RequestBody): Promise<Response> {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.PATCH,
			headers: { "Content-Type": "application/json", Authorization: this.getToken() },
			body: body,
		};
		return fetch(absoluteUrl, options);
	}

	public delete(endpoint: string): Promise<Response> {
		const absoluteUrl = this.baseUrl + endpoint;
		const options = {
			method: this.DELETE,
			headers: { Authorization: this.getToken() },
		};
		return fetch(absoluteUrl, options);
	}
}
