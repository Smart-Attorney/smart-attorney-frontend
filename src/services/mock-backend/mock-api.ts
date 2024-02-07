import RouteHandler from "./route-handler";

class MockAPI {
	static request: RouteHandler = new RouteHandler();

	constructor() {}

	public static post(url: string, data: unknown) {
		this.request.handlePost(url, data);
	}

	public static get(url: string) {
		this.request.handleGet(url);
	}

	public static put(url: string, data: unknown) {
		this.request.handlePut(url, data);
	}

	public static delete(url: string) {
		this.request.handleDelete(url);
	}
}

export default MockAPI;
